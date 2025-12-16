import { useLocalSearchParams } from "expo-router";
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
import { useEffect, useState } from "react";

import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown, { type Ingredient } from "@/components/zutatenDropDown";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
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
  const [macros, setMacros] = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | undefined>(undefined);
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
            nutrition = JSON.parse(
              recipeRow.nutrition_json
            ) as Record<string, number>;
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
          calories={calories}
          macros={macros}
          isOptimized={isOptimized}
          isPicture={false}
          recipeId={params.id ? Number(params.id) : undefined}
        />
        <View style={styles.innerContainer}>
          <HinzuRezAmountInput />
          <HinzufügenButton />
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown ingredients={ingredients} />
            <ZubereitungDropDown isExpanded={false} />
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
