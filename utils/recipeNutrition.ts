import {
  naehrstoffprofilRows,
  type NaehrstoffRowConfig,
} from "@/assets/datasetConfig";
import { parseAmount } from "@/utils/parseAmount";
import { supabase } from "@/utils/supabase";

export interface RecipeIngredient {
  id: string;
  title: string;
  portion: string;
  calories?: string;
}

export interface RecipeNutrition {
  [column: string]: number;
}

/**
 * Calculates total nutrition for a recipe by summing nutrition from all ingredients.
 * Each ingredient's nutrition is scaled by its portion size.
 */
export async function calculateRecipeNutrition(
  ingredients: RecipeIngredient[]
): Promise<RecipeNutrition> {
  // Collect all unique column names we need
  const columns = Array.from(
    new Set(
      naehrstoffprofilRows
        .flatMap(row =>
          row.values.flatMap(value => {
            if (!value.column) return [];
            return Array.isArray(value.column) ? value.column : [value.column];
          })
        )
        .filter((col): col is string => !!col)
    )
  );

  if (columns.length === 0) {
    return {};
  }

  // Initialize aggregated nutrition object
  const aggregatedNutrition: RecipeNutrition = {};
  columns.forEach(col => {
    aggregatedNutrition[col] = 0;
  });

  // Process each ingredient
  for (const ingredient of ingredients) {
    if (!ingredient.id) continue;

    // Parse portion to get grams
    const parsedPortion = parseAmount(ingredient.portion);
    if (!parsedPortion) continue;

    // Convert to grams
    const portionInGrams =
      parsedPortion.unit === "kg"
        ? parsedPortion.amount * 1000
        : parsedPortion.amount;

    // Calculate scaling factor (nutrition is per 100g in database)
    const factor = portionInGrams / 100;

    // Fetch nutrition data for this ingredient
    try {
      const { data, error } = await supabase
        .from("opennutrition_foods")
        .select(columns.join(","))
        .eq("id", ingredient.id)
        .single();

      if (error || !data) {
        console.warn(
          `Failed to load nutrition for ingredient ${ingredient.id}`,
          error
        );
        continue;
      }

      // Scale and add to aggregated values
      columns.forEach(column => {
        const raw = (data as unknown as Record<string, unknown>)[column];
        const numeric =
          typeof raw === "number"
            ? raw
            : typeof raw === "string"
            ? Number(raw) || 0
            : 0;

        aggregatedNutrition[column] += numeric * factor;
      });
    } catch (error) {
      console.error(
        `Error fetching nutrition for ingredient ${ingredient.id}`,
        error
      );
    }
  }

  return aggregatedNutrition;
}

/**
 * Converts recipe nutrition object to NaehrstoffRowConfig format
 * for use in DetailsNaehrstoffprofilComponent
 */
export function nutritionToRows(
  nutrition: RecipeNutrition
): NaehrstoffRowConfig[] {
  return naehrstoffprofilRows.map(row => ({
    ...row,
    values: row.values.map(value => {
      let current = 0;

      if (Array.isArray(value.column)) {
        // Sum all contributing columns (e.g. "Methionin + Cystin")
        current = value.column.reduce((sum, col) => {
          const val = nutrition[col];
          return sum + (typeof val === "number" ? val : 0);
        }, 0);
      } else if (typeof value.column === "string") {
        current = nutrition[value.column] || 0;
      }

      return {
        ...value,
        current,
      };
    }),
  }));
}

/**
 * Gets key macros (protein, carbs, fat) from nutrition object
 */
export function getKeyMacros(nutrition: RecipeNutrition): {
  protein: number;
  carbs: number;
  fat: number;
} {
  return {
    protein: nutrition.protein || 0,
    carbs: nutrition.carbohydrates || 0,
    fat: nutrition.total_fat || 0,
  };
}

/** Short labels for amino acid chart (order matches Aminosäuren row in datasetConfig) */
const AMINO_CHART_LABELS: Record<string, string> = {
  Histidin: "His",
  Isoleucin: "Ile",
  Leucin: "Leu",
  Lysin: "Lys",
  "Methionin + Cystin": "Met+\nCys",
  "Phenylalanin + Tyrosin": "Phe+\nTyr",
  Threonin: "Thr",
  Tryptophan: "Trp",
  Valin: "Val",
};

export type AminoChartData = {
  limitingAS: number;
  data: Array<{ name: string; usable: number; unusable: number }>;
};

/**
 * Converts recipe nutrition to amino acid chart data (chemical score per amino,
 * limiting AS = min score; usable = limiting amount, unusable = excess).
 */
export function nutritionToAminoChartData(
  nutrition: RecipeNutrition
): AminoChartData | null {
  const rows = nutritionToRows(nutrition);
  const proteinRow = rows.find(row => row.title === "Überblick");
  const proteinPer100g = proteinRow?.values.find(
    v => v.label === "Eiweiß"
  )?.current;

  if (
    typeof proteinPer100g !== "number" ||
    proteinPer100g <= 0
  ) {
    return null;
  }

  const proteinFactor = 100 / proteinPer100g;
  const aminoRow = rows.find(row => row.title === "Aminosäuren");
  if (!aminoRow) return null;

  // Use same rounding as DetailsNaehstoffprofilComponent: round each amino's CS first,
  // then take min. That way the chart's limiting % matches the profile's percentage for that amino.
  const scores = aminoRow.values
    .map(value => {
      const { label, current, reference } = value;
      if (!reference || reference <= 0) return null;
      const currentPer100gProtein = current * proteinFactor;
      const cs = (currentPer100gProtein / reference) * 100;
      if (!Number.isFinite(cs)) return null;
      const csRounded = Math.round(cs);
      return { label, cs, csRounded };
    })
    .filter(
      (item): item is { label: string; cs: number; csRounded: number } =>
        item !== null
    );

  if (scores.length === 0) return null;

  const limitingAS = Math.min(...scores.map(s => s.csRounded));

  const data = scores.map(({ label, csRounded }) => ({
    name: AMINO_CHART_LABELS[label] ?? label,
    usable: limitingAS,
    unusable: Math.max(0, csRounded - limitingAS),
  }));

  return { limitingAS, data };
}

