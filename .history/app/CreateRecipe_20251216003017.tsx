import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CloseXIcon, TrashIcon } from "@/assets/icons/icons";
import ErstZubereitungComponent from "@/components/erstellenComponents/erstZubereitungComponent";
import ErstZutatenComponent from "@/components/erstellenComponents/erstZutatenComponent";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useDeleteRecipePopup } from "@/hooks/useDeleteRecipePopup";
import { useRecipeDraft, useRecipeDraftActions } from "@/hooks/useRecipeDraft";
import { addRecentRecipe } from "@/utils/recentItems";
import {
  calculateRecipeNutrition,
  getKeyMacros,
  type RecipeIngredient,
} from "@/utils/recipeNutrition";
import {
  deleteRecipe,
  getRecipeById,
  initDatabase,
  insertRecipe,
  updateRecipe,
} from "@/utils/sqlite";

export default function CreateRecipeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!params.id;
  const recipeId = params.id ? parseInt(params.id, 10) : null;
  
  const [titleFocused, setTitleFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const { title, instructions, ingredients } = useRecipeDraft();
  const {
    setTitle,
    setInstructions,
    removeIngredient,
    reset,
    addIngredient,
  } = useRecipeDraftActions();
  const { showDeletePopup, DeletePopupComponent } = useDeleteRecipePopup(
    async () => {
      if (!recipeId || isNaN(recipeId)) return;

      try {
        await initDatabase();
        await deleteRecipe(recipeId);
        reset();
        router.back();
      } catch (error) {
        console.error("Error deleting recipe", error);
      }
    }
  );
  const titleInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleZubereitungFocus = () => {
    // Scroll to show the TextInput above the keyboard
    // Use a small delay to allow keyboard animation to start
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  // Load recipe data in edit mode
  useEffect(() => {
    const loadRecipe = async () => {
      if (!isEditMode || !recipeId || isNaN(recipeId)) {
        setIsLoading(false);
        return;
      }

      try {
        await initDatabase();
        const loadedRecipe = await getRecipeById(recipeId);
        if (!loadedRecipe) {
          setIsLoading(false);
          return;
        }

        // Reset first to clear any existing draft data
        reset();

        // Populate title and instructions
        setTitle(loadedRecipe.title || "");
        setInstructions(loadedRecipe.instructions || "");

        // Parse and populate ingredients
        try {
          const parsedIngredients = JSON.parse(
            loadedRecipe.ingredients_json
          ) as Array<{
            id: string;
            title: string;
            portion: string;
            calories?: string;
          }>;

          // Add all loaded ingredients
          parsedIngredients.forEach(ingredient => {
            addIngredient({
              id: ingredient.id,
              title: ingredient.title,
              portion: ingredient.portion,
              calories: ingredient.calories,
            });
          });
        } catch (error) {
          console.error("Error parsing ingredients", error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading recipe", error);
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [isEditMode, recipeId, setTitle, setInstructions, addIngredient, reset]);

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage("Bitte gib einen Rezeptnamen an.");
      return;
    }
    setErrorMessage(null);
    setIsSaving(true);

    try {
      await initDatabase();

      // Prepare ingredients
      const recipeIngredients: RecipeIngredient[] = ingredients.map(
        ingredient => ({
          id: ingredient.id,
          title: ingredient.title,
          portion: ingredient.portion,
          calories: ingredient.calories,
        })
      );

      // Calculate nutrition before saving
      const nutrition = await calculateRecipeNutrition(recipeIngredients);

      if (isEditMode && recipeId && !isNaN(recipeId)) {
        // Update existing recipe
        await updateRecipe(
          recipeId,
          {
            title: title.trim(),
            instructions: instructions.trim(),
            ingredients: recipeIngredients,
          },
          nutrition
        );
      } else {
        // Create new recipe
        const keyMacros = getKeyMacros(nutrition);

        // Calculate total calories
        let totalCalories = 0;
        ingredients.forEach(ing => {
          if (ing.calories) {
            const caloriesStr = ing.calories.trim();
            const match = caloriesStr.match(/^(\d+(?:\.\d+)?)/);
            if (match) {
              const caloriesValue = parseFloat(match[1]);
              if (!isNaN(caloriesValue)) {
                totalCalories += caloriesValue;
              }
            }
          }
        });

        const insertedId = await insertRecipe(
          {
            title: title.trim(),
            instructions: instructions.trim(),
            ingredients: recipeIngredients,
          },
          nutrition
        );

        // Track as recently created recipe (fire-and-forget)
        const ingredientsSummary = ingredients
          .map(ingredient => ingredient.title)
          .join(", ");
        addRecentRecipe({
          id: insertedId,
          title: title.trim(),
          ingredients: ingredientsSummary,
          calories: `${Math.round(totalCalories)} kcal`,
          isOptimized: false,
        }).catch(error =>
          console.error("Error adding recent recipe item", error)
        );
        reset();
      }

      router.back();
    } catch (error) {
      console.error("Fehler beim Speichern des Rezepts", error);
      setErrorMessage(
        "Speichern fehlgeschlagen. Bitte später erneut versuchen."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <NavBar title="Rezept erstellen" backIcon={<CloseXIcon size={28} />} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <View style={styles.topContainer}>
              <View style={styles.picturePlaceHolderContainer}>
                <PicturePlaceHolder />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.labelText}>Name des Rezepts</Text>
                <TextInput
                  ref={titleInputRef}
                  style={[
                    styles.titleInput,
                    titleFocused && styles.titleInputFocused,
                  ]}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Name des Rezepts ..."
                  placeholderTextColor={Color.neutralTextOrTabGrey}
                  onFocus={() => setTitleFocused(true)}
                  onBlur={() => setTitleFocused(false)}
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <ErstZutatenComponent
                ingredients={ingredients.map(ingredient => ({
                  id: ingredient.id,
                  name: ingredient.title,
                  amount: ingredient.portion,
                  calories: ingredient.calories,
                }))}
                onAddPress={() => router.push("/HinzuOverview")}
                onRemoveIngredient={removeIngredient}
              />
              <ErstZubereitungComponent
                value={instructions}
                onChangeText={setInstructions}
                onFocus={handleZubereitungFocus}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <NextButton
        text="Speichern"
        onPress={handleSave}
        disabled={isSaving || !title.trim() || ingredients.length === 0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 106,
    gap: 16,
  },
  topContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 8,
  },
  picturePlaceHolderContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    gap: 8,
  },
  labelText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  titleInput: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
  },
  titleInputFocused: {
    borderColor: Color.neutralWhite,
  },
  bottomContainer: {},
});
