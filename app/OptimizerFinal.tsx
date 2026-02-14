import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import type { NaehrstoffRowConfig } from "@/assets/datasetConfig";
import ButtonRow from "@/components/buttonRow";
import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import VerbesserungenComponent from "@/components/optimizerComponents/verbesserungenComponent";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { Ingredient } from "@/components/zutatenDropDown";
import { Color } from "@/constants/GlobalStyles";
import { addRecentRecipe } from "@/utils/recentItems";
import {
  getKeyMacros,
  nutritionToRows,
  type RecipeNutrition,
} from "@/utils/recipeNutrition";
import { initDatabase, insertRecipe } from "@/utils/sqlite";
import { supabase } from "@/utils/supabase";

type Variant = {
  variant: string;
  id: string;
  recipe: {
    title: string;
    ingredients: Array<{
      name: string;
      grams: number;
      calories: number;
    }>;
  };
};

type OptimizerDraftData = {
  recipeId: number;
  title: string;
  instructions: string;
  ingredients: Array<{
    id: string;
    title: string;
    portion: string;
    calories?: string;
  }>;
  nutrition: RecipeNutrition;
  imageUri: string | null;
  variant?: Variant;
};

export default function OptimizerFinalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ id?: string }>();
  const [draftData, setDraftData] = useState<OptimizerDraftData | null>(null);
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  const loadDraftData = useCallback(async () => {
    if (!params.id) return;

    const recipeId = parseInt(params.id, 10);
    if (isNaN(recipeId)) return;

    try {
      const optimizerDraftKey = `optimizer_draft_${recipeId}`;
      const draftJson = await AsyncStorage.getItem(optimizerDraftKey);
      if (!draftJson) {
        console.error("No draft data found");
        router.back();
        return;
      }

      const draft: OptimizerDraftData = JSON.parse(draftJson);
      setDraftData(draft);

      // Use variant's recipe ingredients if variant exists, otherwise use draft.ingredients
      let ingredientsToUse: Ingredient[] = [];
      let caloriesToUse = 0;

      if (draft.variant?.recipe.ingredients) {
        // Create a map of draft ingredients by name for ID lookup
        const ingredientMap = new Map<string, (typeof draft.ingredients)[0]>();
        draft.ingredients.forEach(ing => {
          ingredientMap.set(ing.title.toLowerCase(), ing);
        });

        // Process each variant ingredient and fetch calories from database
        const processedIngredients: Ingredient[] = [];

        for (const variantIngredient of draft.variant.recipe.ingredients) {
          const ingredientNameLower = variantIngredient.name.toLowerCase();
          const variantNameLower = draft.variant.variant.toLowerCase();
          const isNewIngredient = ingredientNameLower === variantNameLower;

          // Determine ingredient ID
          const ingredientId = isNewIngredient
            ? draft.variant.id
            : ingredientMap.get(ingredientNameLower)?.id;

          // Fetch calories from database based on ingredient ID (like Optimizer.tsx does)
          let calculatedCalories: number | undefined;
          if (ingredientId) {
            try {
              const { data } = await supabase
                .from("opennutrition_foods")
                .select("calories")
                .eq("id", ingredientId)
                .single();

              if (data && typeof data.calories === "number") {
                // Calculate calories based on grams: calories per 100g * (grams / 100)
                const caloriesPer100g = data.calories;
                calculatedCalories =
                  (caloriesPer100g * variantIngredient.grams) / 100;
              }
            } catch (error) {
              console.warn(
                `Failed to fetch calories for ingredient: ${variantIngredient.name}`,
                error
              );
            }
          }

          // Use calculated calories or fall back to variant calories
          const finalCalories =
            calculatedCalories ?? variantIngredient.calories;
          if (finalCalories) {
            caloriesToUse += finalCalories;
          }

          processedIngredients.push({
            id: ingredientId || "",
            name: variantIngredient.name,
            amount: `${Math.round(variantIngredient.grams)} g`,
            calories: finalCalories
              ? `${Math.round(finalCalories)} kcal`
              : "0 kcal",
          });
        }

        ingredientsToUse = processedIngredients;
      } else {
        // Map draft ingredients for display
        ingredientsToUse = draft.ingredients.map(ing => ({
          id: ing.id,
          name: ing.title,
          amount: ing.portion,
          calories: ing.calories || "0 kcal",
        }));
        // Calculate total calories from draft ingredients
        draft.ingredients.forEach(ing => {
          if (ing.calories) {
            const caloriesStr = ing.calories.trim();
            const match = caloriesStr.match(/^(\d+(?:\.\d+)?)/);
            if (match) {
              const caloriesValue = parseFloat(match[1]);
              if (!isNaN(caloriesValue)) {
                caloriesToUse += caloriesValue;
              }
            }
          }
        });
      }

      setIngredients(ingredientsToUse);
      setTotalCalories(Math.round(caloriesToUse));

      // Convert nutrition to rows
      const rows = nutritionToRows(draft.nutrition);
      setNutritionRows(rows);

      // Set macros for top component
      const keyMacros = getKeyMacros(draft.nutrition);
      setMacros(keyMacros);
    } catch (error) {
      console.error("Error loading draft data", error);
      router.back();
    }
  }, [params.id, router]);

  // Load draft data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadDraftData();
    }, [loadDraftData])
  );

  const handleSaveRecipe = async () => {
    if (!draftData || isSaving) return;

    setIsSaving(true);
    try {
      await initDatabase();

      // Create a new recipe with draftData (set isOptimized to true)
      const insertedId = await insertRecipe(
        {
          title: draftData?.variant?.recipe.title || draftData?.title || "",
          instructions: draftData.instructions,
          ingredients: draftData.ingredients,
          imageUri: draftData.imageUri,
        },
        draftData.nutrition,
        true
      );

      // Add recipe to recent items (letzte) as the first item
      const ingredientsSummary = draftData.ingredients
        .map(ingredient => ingredient.title)
        .join(", ");
      await addRecentRecipe({
        id: insertedId,
        title: draftData.title,
        ingredients: ingredientsSummary,
        calories: `${totalCalories} kcal`,
        isOptimized: true,
      });

      // Clean up draft data
      const optimizerDraftKey = `optimizer_draft_${draftData.recipeId}`;
      await AsyncStorage.removeItem(optimizerDraftKey);

      // Navigate back to the index page with a single back animation
      // Try to pop 2 screens at once (OptimizerFinal -> Optimizer -> Index)
      // This should create a single back animation
      const state = navigation.getState();
      const currentIndex = state?.index ?? 0;
      const screensToPop = currentIndex; // Pop all screens back to index (which is at index 0)

      if (
        screensToPop > 0 &&
        "pop" in navigation &&
        typeof navigation.pop === "function"
      ) {
        (navigation as any).pop(screensToPop);
      } else {
        // Fallback: use CommonActions to navigate to index
        // Note: This may not create a back animation, but will navigate to index
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "index" }],
          })
        );
      }
    } catch (error) {
      console.error("Error saving recipe", error);
      setIsSaving(false);
    }
  };

  const handleDiscardRecipe = async () => {
    if (!draftData) return;

    try {
      // Clean up draft data from AsyncStorage
      const optimizerDraftKey = `optimizer_draft_${draftData.recipeId}`;
      await AsyncStorage.removeItem(optimizerDraftKey);

      // Navigate back to the index page with a single back animation
      // Try to pop 2 screens at once (OptimizerFinal -> Optimizer -> Index)
      // This should create a single back animation
      const state = navigation.getState();
      const currentIndex = state?.index ?? 0;
      const screensToPop = currentIndex; // Pop all screens back to index (which is at index 0)

      if (
        screensToPop > 0 &&
        "pop" in navigation &&
        typeof navigation.pop === "function"
      ) {
        (navigation as any).pop(screensToPop);
      } else {
        // Fallback: use CommonActions to navigate to index
        // Note: This may not create a back animation, but will navigate to index
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "index" }],
          })
        );
      }
    } catch (error) {
      console.error("Error discarding recipe", error);
      // Still navigate back even if cleanup fails
      router.back();
    }
  };

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
          navbarTitle="Fertig!"
          title={draftData?.variant?.recipe.title || draftData?.title || ""}
          calories={totalCalories}
          macros={macros || undefined}
          isOptimized={true}
          isPicture={!!draftData?.imageUri}
          isBackButton={false}
          imageUri={draftData?.imageUri || undefined}
          recipeId={draftData?.recipeId}
        />
        <View style={styles.innerContainer}>
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown ingredients={ingredients} />
            <ZubereitungDropDown
              value={draftData?.instructions || undefined}
              // TODO: when zubereitung angepasst wird, dann per default true
              isExpanded={false}
            />
            <VerbesserungenComponent
              description="Durch Lysinreiche Sojaflocken hast du die Proteinqualität
                    deutlich verbessert (Amino Acid Score von 125% auf 134%)."
            />
            <View style={styles.buttonRowContainer}>
              <ButtonRow
                leftButtonText="Verwerfen"
                rightButtonText="Speichern"
                rightButtonColor={Color.neutralWhite}
                rightButtonTextColor={Color.neutralBlackText}
                onLeftButtonPress={handleDiscardRecipe}
                onRightButtonPress={handleSaveRecipe}
              />
            </View>
            <DetailsNaehstoffprofilComponent
              type="rez"
              recipeNutritionRows={nutritionRows}
            />
            <View
              style={[
                styles.spacer,
                {
                  paddingBottom: insets.bottom + (Platform.OS === "android" ? 20 : 0),
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
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
  spacer: {
    paddingTop: 16,
  },
  buttonRowContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
