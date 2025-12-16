import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { type Ingredient } from "@/components/zutatenDropDown";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
import { parseAmount } from "@/utils/parseAmount";
import {
  calculateRecipeNutrition,
  getKeyMacros,
  nutritionToRows,
  type RecipeIngredient,
} from "@/utils/recipeNutrition";
import { getRecipeById, initDatabase } from "@/utils/sqlite";

export default function HinzuRezDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const insets = useSafeAreaInsets();
  const { showDeletePopup, DeletePopupComponent } = useDeleteRecipePopup(() => {
    // TODO: Implement delete functionality
  });

  const [title, setTitle] = useState<string>("");
  const [calories, setCalories] = useState<number | undefined>(undefined);
  const [macros, setMacros] = useState<
    | {
        protein: number;
        carbs: number;
        fat: number;
      }
    | undefined
  >(undefined);
  const [portion, setPortion] = useState<number>(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [nutritionRows, setNutritionRows] = useState<
    ReturnType<typeof nutritionToRows> | undefined
  >(undefined);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      const id = params.id ? parseInt(params.id, 10) : NaN;
      if (!id || Number.isNaN(id)) return;

      try {
        await initDatabase();
        const recipeRow = await getRecipeById(id);
        if (!recipeRow) return;

        setTitle(recipeRow.title);
        setIsOptimized(recipeRow.is_optimized === 1);

        let parsedIngredients: RecipeIngredient[] = [];
        try {
          parsedIngredients = JSON.parse(
            recipeRow.ingredients_json
          ) as RecipeIngredient[];
        } catch (error) {
          console.error("Failed to parse recipe ingredients", error);
        }

        // Map for Zutaten dropdown
        setIngredients(
          parsedIngredients.map(ing => ({
            id: ing.id,
            name: ing.title || "",
            amount: ing.portion || "",
            calories: ing.calories || "0 kcal",
          }))
        );

        // Nutrition handling
        let nutrition: Record<string, number> | null = null;
        if (recipeRow.nutrition_json) {
          try {
            nutrition = JSON.parse(recipeRow.nutrition_json) as Record<
              string,
              number
            >;
          } catch (error) {
            console.error("Failed to parse stored nutrition", error);
          }
        }

        if (!nutrition) {
          nutrition = await calculateRecipeNutrition(parsedIngredients);
        }

        const keyMacros = getKeyMacros(nutrition);
        setMacros(keyMacros);
        setCalories(
          typeof nutrition.calories === "number"
            ? Math.round(nutrition.calories)
            : undefined
        );
        setNutritionRows(nutritionToRows(nutrition));
      } catch (error) {
        console.error("Error loading recipe for HinzuRezDetail", error);
      }
    };

    loadRecipe();
  }, [params.id]);

  const portionFactor = useMemo(
    () => (Number.isFinite(portion) ? portion : 1),
    [portion]
  );

  const formatAmount = (amount: number, unit: "g" | "kg") => {
    const precision = unit === "kg" ? 2 : 1;
    const rounded = Math.round(amount * 10 ** precision) / 10 ** precision;
    const formatted = Number.isInteger(rounded)
      ? rounded.toString()
      : rounded.toFixed(precision);
    return `${formatted} ${unit}`;
  };

  const scaledIngredients = useMemo(
    () =>
      ingredients.map(ingredient => {
        const parsed = parseAmount(ingredient.amount);

        const amountText = parsed
          ? formatAmount(parsed.amount * portionFactor, parsed.unit)
          : ingredient.amount;

        const calorieMatch = ingredient.calories?.match(/^(\d+(?:\.\d+)?)/);
        const baseCalories = calorieMatch ? Number(calorieMatch[1]) : null;
        const caloriesText =
          baseCalories != null && !Number.isNaN(baseCalories)
            ? `${Math.round(baseCalories * portionFactor)} kcal`
            : ingredient.calories;

        return {
          ...ingredient,
          amount: amountText,
          calories: caloriesText,
        };
      }),
    [ingredients, portionFactor]
  );

  const scaledMacros = useMemo(
    () =>
      macros
        ? {
            protein: macros.protein * portionFactor,
            carbs: macros.carbs * portionFactor,
            fat: macros.fat * portionFactor,
          }
        : undefined,
    [macros, portionFactor]
  );

  const scaledCalories = useMemo(
    () =>
      typeof calories === "number"
        ? Math.round(calories * portionFactor)
        : undefined,
    [calories, portionFactor]
  );

  const scaledNutritionRows = useMemo(
    () =>
      nutritionRows?.map(row => ({
        ...row,
        values: row.values.map(value => ({
          ...value,
          current: (value.current || 0) * portionFactor,
        })),
      })),
    [nutritionRows, portionFactor]
  );

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <RecipeDetailTopComponent
          navbarTitle="Hinzufügen"
          title={title}
          calories={scaledCalories}
          macros={scaledMacros}
          isOptimized={isOptimized}
          isPicture={false}
          recipeId={params.id ? Number(params.id) : undefined}
        />
        <View style={styles.innerContainer}>
          <HinzuRezAmountInput
            initialValue={portion}
            onChange={setPortion}
            min={0}
          />
          <HinzufügenButton />
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown ingredients={scaledIngredients} />
            <ZubereitungDropDown isExpanded={false} />
            <DetailsNaehstoffprofilComponent
              type="rez"
              recipeNutritionRows={scaledNutritionRows}
            />
            <View style={styles.rezLoeschenOuterContainer}>
              <Pressable
                style={[
                  styles.rezLoeschenInnerContainer,
                  {
                    paddingBottom:
                      insets.bottom + (Platform.OS === "android" ? 20 : 0),
                  },
                ]}
                onPress={showDeletePopup}
              >
                <Text style={styles.rezLoeschenLabel}>Rezept löschen?</Text>
                <Text style={styles.rezLoeschenText}>löschen</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      {DeletePopupComponent}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  innerContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  dropDownsContainer: {
    paddingTop: 8,
  },
  rezLoeschenOuterContainer: {
    paddingTop: 16,
    alignItems: "center",
  },
  rezLoeschenInnerContainer: {
    flexWrap: "wrap",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  rezLoeschenLabel: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  rezLoeschenText: {
    ...Typography.subheadlineRegular,
    color: Color.destructive50,
  },
});
