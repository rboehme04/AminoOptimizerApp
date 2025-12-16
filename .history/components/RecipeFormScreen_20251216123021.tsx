import { StackActions, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
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

interface RecipeFormScreenProps {
  recipeId?: number;
}

export default function RecipeFormScreen({ recipeId }: RecipeFormScreenProps) {
  const router = useRouter();
  const navigation = useNavigation();
  const isEditMode = recipeId !== undefined;
  const [titleFocused, setTitleFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isOpeningImagePicker, setIsOpeningImagePicker] = useState(false);
  const [originalRecipe, setOriginalRecipe] = useState<{
    title: string;
    instructions: string;
    ingredients: Array<{
      id: string;
      title: string;
      portion: string;
      calories?: string;
    }>;
    imageUri: string | null;
  } | null>(null);
  const { title, instructions, ingredients, imageUri } = useRecipeDraft();
  const {
    setTitle,
    setInstructions,
    setImageUri,
    removeIngredient,
    reset,
    addIngredient,
  } = useRecipeDraftActions();
  const { showDeletePopup, DeletePopupComponent } = useDeleteRecipePopup(
    async () => {
      if (!recipeId) return;

      try {
        await initDatabase();
        await deleteRecipe(recipeId);
        reset();
        // Navigate back to root (index) with back animation
        navigation.dispatch(StackActions.popToTop());
      } catch (error) {
        console.error("Error deleting recipe", error);
      }
    }
  );
  const titleInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  // Request media library permissions early so the first tap on the picture
  // placeholder feels faster.
  useEffect(() => {
    (async () => {
      try {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      } catch (error) {
        console.error("Error pre-requesting media library permissions", error);
      }
    })();
  }, []);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!isEditMode || !recipeId) {
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

        // Parse ingredients
        let parsedIngredients: Array<{
          id: string;
          title: string;
          portion: string;
          calories?: string;
        }> = [];
        try {
          parsedIngredients = JSON.parse(
            loadedRecipe.ingredients_json
          ) as Array<{
            id: string;
            title: string;
            portion: string;
            calories?: string;
          }>;
        } catch (error) {
          console.error("Error parsing ingredients", error);
        }

        // Store original recipe data for change detection
        setOriginalRecipe({
          title: loadedRecipe.title || "",
          instructions: loadedRecipe.instructions || "",
          ingredients: parsedIngredients,
          imageUri: loadedRecipe.image_uri ?? null,
        });

        // Populate title, instructions and image
        setTitle(loadedRecipe.title || "");
        setInstructions(loadedRecipe.instructions || "");
        setImageUri(loadedRecipe.image_uri ?? null);

        // Add all loaded ingredients
        parsedIngredients.forEach(ingredient => {
          addIngredient({
            id: ingredient.id,
            title: ingredient.title,
            portion: ingredient.portion,
            calories: ingredient.calories,
          });
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading recipe", error);
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId, isEditMode, setTitle, setInstructions, addIngredient, reset]);

  const handleZubereitungFocus = () => {
    // Scroll to show the TextInput above the keyboard
    // Use a small delay to allow keyboard animation to start
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const handleSelectImage = async () => {
    try {
      setIsOpeningImagePicker(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Berechtigung benötigt",
          "Bitte erlaube den Zugriff auf deine Fotos, um ein Bild hinzuzufügen."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        // NOTE: MediaTypeOptions is marked deprecated in logs, but MediaType is
        // not available in the current expo-image-picker version being used.
        // Using MediaTypeOptions.Images here keeps the picker working.
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets && result.assets[0];
      if (asset?.uri) {
        setImageUri(asset.uri);
      }
    } catch (error) {
      console.error("Error selecting image", error);
      Alert.alert(
        "Fehler",
        "Beim Auswählen des Bildes ist ein Fehler aufgetreten."
      );
    } finally {
      setIsOpeningImagePicker(false);
    }
  };

  const hasChanges = (): boolean => {
    if (!originalRecipe) return true; // If no original recipe, consider it changed

    // Compare title
    if (title.trim() !== originalRecipe.title.trim()) {
      return true;
    }

    // Compare instructions
    if (instructions.trim() !== originalRecipe.instructions.trim()) {
      return true;
    }

    // Compare imageUri
    if (imageUri !== originalRecipe.imageUri) {
      return true;
    }

    // Compare ingredients
    if (ingredients.length !== originalRecipe.ingredients.length) {
      return true;
    }

    // Deep compare ingredients
    for (let i = 0; i < ingredients.length; i++) {
      const current = ingredients[i];
      const original = originalRecipe.ingredients[i];
      if (
        current.id !== original.id ||
        current.title.trim() !== original.title.trim() ||
        current.portion.trim() !== original.portion.trim() ||
        (current.calories || "").trim() !== (original.calories || "").trim()
      ) {
        return true;
      }
    }

    return false;
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage("Bitte gib einen Rezeptnamen an.");
      return;
    }

    // Check if there are changes in edit mode
    if (isEditMode && !hasChanges()) {
      // No changes, just go back
      reset();
      setOriginalRecipe(null);
      router.back();
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

      if (isEditMode && recipeId) {
        // Update existing recipe
        await updateRecipe(
          recipeId,
          {
            title: title.trim(),
            instructions: instructions.trim(),
            ingredients: recipeIngredients,
            imageUri,
          },
          nutrition
        );
        reset();
        setOriginalRecipe(null);
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
            imageUri,
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

  const handleBackPress = () => {
    // Clear form when closing (both create and edit mode)
    reset();
    router.back();
  };

  const navBarTitle = isEditMode ? "Rezept bearbeiten" : "Rezept erstellen";
  const navBarRightActions = isEditMode
    ? [
        {
          icon: <TrashIcon size={20} color={Color.neutralWhite} />,
          onPress: showDeletePopup,
        },
      ]
    : undefined;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <NavBar
        title={navBarTitle}
        backIcon={<CloseXIcon size={28} />}
        rightActions={navBarRightActions}
        onBackPress={handleBackPress}
      />
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
                <PicturePlaceHolder
                  onPress={handleSelectImage}
                  imageUri={imageUri ?? undefined}
                />
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
                  editable={!isLoading}
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
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <NextButton
        text="Speichern"
        onPress={handleSave}
        disabled={
          isSaving || isLoading || !title.trim() || ingredients.length === 0
        }
      />
      {isEditMode && DeletePopupComponent}
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
  errorContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  errorText: {
    ...Typography.caption1Regular,
    color: Color.destructive50,
    textAlign: "center",
  },
});
