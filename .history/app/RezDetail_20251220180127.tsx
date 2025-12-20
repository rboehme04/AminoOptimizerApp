import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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

import type { NaehrstoffRowConfig } from "@/assets/datasetConfig";
import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import NextButton from "@/components/nextButton";
import VerbesserungenComponent from "@/components/optimizerComponents/verbesserungenComponent";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { Ingredient } from "@/components/zutatenDropDown";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
import {
  calculateRecipeNutrition,
  getKeyMacros,
  nutritionToRows,
  type RecipeIngredient,
} from "@/utils/recipeNutrition";
import {
  deleteRecipe,
  getRecipeById,
  initDatabase,
  RecipeRow,
} from "@/utils/sqlite";

export default function RezDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
  const { showDeletePopup, DeletePopupComponent } = useDeleteRecipePopup(
    async () => {
      if (!recipe?.id) return;

      try {
        await initDatabase();
        await deleteRecipe(recipe.id);
        router.back();
      } catch (error) {
        console.error("Error deleting recipe", error);
      }
    }
  );

  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  const loadRecipe = useCallback(async () => {
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

        const mappedIngredients: Ingredient[] = parsedIngredients.map(ing => ({
          id: ing.id,
          name: ing.title,
          amount: ing.portion,
          calories: ing.calories || "0 kcal",
        }));
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

        // Load nutrition from database or calculate if missing
        let nutrition: Record<string, number>;
        if (loadedRecipe.nutrition_json) {
          try {
            nutrition = JSON.parse(loadedRecipe.nutrition_json);
          } catch (error) {
            console.error("Error parsing stored nutrition", error);
            // Fallback to calculation
            const recipeIngredients: RecipeIngredient[] = parsedIngredients;
            nutrition = await calculateRecipeNutrition(recipeIngredients);
            // Update database with calculated nutrition
            const { updateRecipeNutrition } = await import("@/utils/sqlite");
            updateRecipeNutrition(loadedRecipe.id, nutrition).catch(
              console.error
            );
          }
        } else {
          // Calculate and store nutrition if missing
          const recipeIngredients: RecipeIngredient[] = parsedIngredients;
          nutrition = await calculateRecipeNutrition(recipeIngredients);
          const { updateRecipeNutrition } = await import("@/utils/sqlite");
          updateRecipeNutrition(loadedRecipe.id, nutrition).catch(
            console.error
          );
        }

        const rows = nutritionToRows(nutrition);
        setNutritionRows(rows);

        // Set macros for top component
        const keyMacros = getKeyMacros(nutrition);
        setMacros(keyMacros);
      } catch (error) {
        console.error("Error parsing ingredients", error);
      }
    } catch (error) {
      console.error("Error loading recipe", error);
    }
  }, [params.id]);

  // Reload recipe data when screen comes into focus (e.g., after editing)
  useFocusEffect(
    useCallback(() => {
      loadRecipe();
    }, [loadRecipe])
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
          title={recipe?.title || ""}
          calories={totalCalories}
          macros={macros || undefined}
          isOptimized={!!recipe?.is_optimized}
          isPicture={!!recipe?.image_uri}
          imageUri={recipe?.image_uri}
          recipeId={recipe?.id}
        />
        <View style={styles.innerContainer}>
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown ingredients={ingredients} />
            <ZubereitungDropDown
              value={recipe?.instructions || undefined}
              isExpanded={false}
            />
            {recipe?.is_optimized ? (
              <VerbesserungenComponent description="Durch Lysinreiche Sojaflocken hast du die Proteinqualität deutlich verbessert (Amino Acid Score von 125% auf 134%). ." />
            ) : null}
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
      <NextButton
        text="Optimieren"
        onPress={() => {
          if (recipe?.id) {
            router.push({
              pathname: "/Optimizer",
              params: { id: recipe.id.toString() },
            });
          }
        }}
      />
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
    gap: 16,
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
