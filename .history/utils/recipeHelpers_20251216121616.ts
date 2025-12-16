import type { RecipeRow } from "./sqlite";

export type RecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
  isOptimized: boolean;
  imageUri?: string | null;
};

/**
 * Maps a RecipeRow from SQLite to a RecipeItem for display
 */
export const mapRecipeRowToItem = (row: RecipeRow): RecipeItem => {
  let ingredientsSummary = "";
  let totalCalories = 0;

  try {
    const parsed = JSON.parse(row.ingredients_json) as Array<{
      title?: string;
      calories?: string;
    }>;
    if (Array.isArray(parsed)) {
      // Extract ingredient titles for summary
      ingredientsSummary = parsed
        .map(ingredient => ingredient.title)
        .filter(Boolean)
        .join(", ");

      // Calculate total calories from all ingredients
      parsed.forEach(ingredient => {
        if (ingredient.calories) {
          // Parse calories string like "100 kcal" or "100"
          const caloriesStr = ingredient.calories.trim();
          // Extract numeric value (remove "kcal" if present)
          const match = caloriesStr.match(/^(\d+(?:\.\d+)?)/);
          if (match) {
            const caloriesValue = parseFloat(match[1]);
            if (!isNaN(caloriesValue)) {
              totalCalories += caloriesValue;
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error parsing ingredients_json for recipe", error);
  }

  // Try to get calories from stored nutrition if available
  if (row.nutrition_json) {
    try {
      const nutrition = JSON.parse(row.nutrition_json) as Record<
        string,
        number
      >;
      if (nutrition.calories !== undefined) {
        totalCalories = nutrition.calories;
      }
    } catch (error) {
      // Fallback to calculated calories
    }
  }

  // Format calories as "X kcal" (round to nearest integer)
  const caloriesDisplay = `${Math.round(totalCalories)} kcal`;

  return {
    id: row.id,
    title: row.title,
    ingredients: ingredientsSummary,
    calories: caloriesDisplay,
    isOptimized: row.is_optimized === 1,
    imageUri: row.image_uri,
  };
};

