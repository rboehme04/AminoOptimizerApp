import { useRouter } from "expo-router";
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

import { CloseXIcon } from "@/assets/icons/icons";
import ErstZubereitungComponent from "@/components/erstellenComponents/erstZubereitungComponent";
import ErstZutatenComponent from "@/components/erstellenComponents/erstZutatenComponent";
import PicturePlaceHolder from "@/components/erstellenComponents/picturePlaceHolder";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRecipeDraft, useRecipeDraftActions } from "@/hooks/useRecipeDraft";
import { initDatabase, insertRecipe } from "@/utils/sqlite";

export default function CreateRecipeScreen() {
  const router = useRouter();
  const [titleFocused, setTitleFocused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { title, instructions, ingredients } = useRecipeDraft();
  const { setTitle, setInstructions, removeIngredient, reset } =
    useRecipeDraftActions();
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

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage("Bitte gib einen Rezeptnamen an.");
      return;
    }
    setErrorMessage(null);
    setIsSaving(true);

    try {
      await initDatabase();
      await insertRecipe({
        title: title.trim(),
        instructions: instructions.trim(),
        ingredients: ingredients.map(ingredient => ({
          id: ingredient.id,
          title: ingredient.title,
          portion: ingredient.portion,
          calories: ingredient.calories,
        })),
      });
      reset();
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
      <View style={styles.footer}>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <NextButton
          text="Speichern"
          onPress={handleSave}
          disabled={isSaving || !title.trim() || ingredients.length === 0}
        />
      </View>
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
  footer: {
    paddingBottom: 12,
    alignItems: "center",
  },
  errorText: {
    ...Typography.caption1Regular,
    color: Color.destructive50,
    marginBottom: 4,
  },
});
