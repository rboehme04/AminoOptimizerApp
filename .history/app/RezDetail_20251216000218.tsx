import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import NextButton from "@/components/nextButton";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { Ingredient } from "@/components/zutatenDropDown";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
import { getRecipeById, initDatabase, RecipeRow } from "@/utils/sqlite";
import {
  calculateRecipeNutrition,
  nutritionToRows,
  type RecipeIngredient,
} from "@/utils/recipeNutrition";
import type { NaehrstoffRowConfig } from "@/assets/datasetConfig";

export default function RezDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const [recipe, setRecipe] = useState<RecipeRow | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [macros, setMacros] = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);
  const [nutritionRows, setNutritionRows] = useState<
    NaehrstoffRowConfig[] | undefined
  >(undefined);
  const { showDeletePopup, DeletePopupComponent } = useDeleteRecipePopup(() => {
    // TODO: Implement delete functionality
  });

  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!params.id) return;

      const recipeId = parseInt(params.id, 10);
      if (isNaN(recipeId)) return;

      try {
        await initDatabase();
        const loadedRecipe = await getRecipeById(recipeId);
        if (!loadedRecipe) return;

        setRecipe(loadedRecipe);

        // Parse ingredients
        try {
          const parsedIngredients = JSON.parse(
            loadedRecipe.ingredients_json
          ) as Array<{
            id: string;
            title: string;
            portion: string;
            calories?: string;
          }>;

          const mappedIngredients: Ingredient[] = parsedIngredients.map(
            ing => ({
              id: ing.id,
              name: ing.title,
              amount: ing.portion,
              calories: ing.calories || "0 kcal",
            })
          );
          setIngredients(mappedIngredients);

          // Calculate total calories
          let calories = 0;
          parsedIngredients.forEach(ing => {
            if (ing.calories) {
              const caloriesStr = ing.calories.trim();
              const match = caloriesStr.match(/^(\d+(?:\.\d+)?)/);
              if (match) {
                const caloriesValue = parseFloat(match[1]);
                if (!isNaN(caloriesValue)) {
                  calories += caloriesValue;
                }
              }
            }
          });
          setTotalCalories(Math.round(calories));

          // Calculate full nutrition profile
          const recipeIngredients: RecipeIngredient[] = parsedIngredients;
          const nutrition = await calculateRecipeNutrition(recipeIngredients);
          const rows = nutritionToRows(nutrition);
          setNutritionRows(rows);

          // Set macros for top component
          const { getKeyMacros } = await import("@/utils/recipeNutrition");
          const keyMacros = getKeyMacros(nutrition);
          setMacros(keyMacros);
        } catch (error) {
          console.error("Error parsing ingredients", error);
        }
      } catch (error) {
        console.error("Error loading recipe", error);
      }
    };

    loadRecipe();
  }, [params.id]);

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
          title={recipe?.title || ""}
          calories={totalCalories}
          isOptimized={false}
        />
        <View style={styles.innerContainer}>
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown ingredients={ingredients} />
            <ZubereitungDropDown
              value={recipe?.instructions || undefined}
              isExpanded={false}
            />
            <DetailsNaehstoffprofilComponent
              type="rez"
              recipeNutritionRows={nutritionRows}
            />
            <View style={styles.rezLoeschenOuterContainer}>
              <Pressable
                style={[
                  styles.rezLoeschenInnerContainer,
                  {
                    paddingBottom:
                      Padding.padding_next_button +
                      insets.bottom +
                      (Platform.OS === "android" ? 20 : 0),
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
      <NextButton text="Optimieren" />
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
  dropDownsContainer: {},
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
