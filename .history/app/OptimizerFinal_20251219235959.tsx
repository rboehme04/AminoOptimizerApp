import AsyncStorage from "@react-native-async-storage/async-storage";
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
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { Ingredient } from "@/components/zutatenDropDown";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
import {
  getKeyMacros,
  nutritionToRows,
  type RecipeIngredient,
  type RecipeNutrition,
} from "@/utils/recipeNutrition";
import {
  deleteRecipe,
  getRecipeById,
  initDatabase,
  RecipeRow,
  updateRecipe,
} from "@/utils/sqlite";

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
};

export default function OptimizerFinalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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

      // Map ingredients for display
      const mappedIngredients: Ingredient[] = draft.ingredients.map(ing => ({
        id: ing.id,
        name: ing.title,
        amount: ing.portion,
        calories: ing.calories || "0 kcal",
      }));
      setIngredients(mappedIngredients);

      // Calculate total calories
      let calories = 0;
      draft.ingredients.forEach(ing => {
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
      await updateRecipe(
        draftData.recipeId,
        {
          title: draftData.title,
          instructions: draftData.instructions,
          ingredients: draftData.ingredients,
          imageUri: draftData.imageUri,
        },
        draftData.nutrition
      );

      // Clean up draft data
      const optimizerDraftKey = `optimizer_draft_${draftData.recipeId}`;
      await AsyncStorage.removeItem(optimizerDraftKey);

      // Navigate back to recipe detail
      router.push({
        pathname: "/RezDetail",
        params: { id: draftData.recipeId.toString() },
      });
    } catch (error) {
      console.error("Error saving recipe", error);
      setIsSaving(false);
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
          title={recipe?.title || ""}
          calories={totalCalories}
          macros={macros || undefined}
          isOptimized={false}
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
