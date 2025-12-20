import {
  HelpCircleIcon,
  OptimizerFinishedIcon,
  OptimizerNotStartedIcon,
  OptimizerStartedIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import AltLebSelectRow from "@/components/optimizerComponents/altLebSelectRow";
import OptimizerPopUp from "@/components/optimizerPopUp";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import { calculateRecipeNutrition } from "@/utils/recipeNutrition";
import { getRecipeById, initDatabase, type RecipeRow } from "@/utils/sqlite";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OptimizerStatus = "not-started" | "running" | "finished";

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

type OptimizerStatusIconProps = {
  size?: number;
  isFinished: boolean;
};

const OptimizerStatusIcon = ({
  size = 48,
  isFinished,
}: OptimizerStatusIconProps) => {
  const [status, setStatus] = useState<OptimizerStatus>("not-started");
  const [visibleStatus, setVisibleStatus] =
    useState<OptimizerStatus>("not-started");
  const rotation = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const fadeScale = useRef(new Animated.Value(1)).current;

  // Control which icon is shown based on isFinished
  useEffect(() => {
    if (isFinished) {
      setStatus("finished");
    } else if (status === "not-started") {
      // Briefly show "not started", then move into "running"
      const timeoutId = setTimeout(() => {
        setStatus("running");
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isFinished, status]);

  // Smoothly transition between statuses (fade + slight scale)
  useEffect(() => {
    if (status === visibleStatus) return;

    Animated.timing(fadeScale, {
      toValue: 0,
      duration: 120,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setVisibleStatus(status);
      Animated.timing(fadeScale, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  }, [status, visibleStatus, fadeScale]);

  // Start / stop rotation while in "running" state
  useEffect(() => {
    if (status === "running" && !isFinished) {
      rotation.setValue(0);
      spinAnimation.current = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000, // one full rotation in 2 seconds
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.current.start();

      return () => {
        spinAnimation.current && spinAnimation.current.stop();
      };
    }

    // Stop any running animation when leaving "running" or when finished
    if (spinAnimation.current) {
      spinAnimation.current.stop();
      spinAnimation.current = null;
    }
  }, [status, isFinished, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  let icon: React.ReactNode;

  if (visibleStatus === "finished") {
    icon = <OptimizerFinishedIcon size={size} />;
  } else if (visibleStatus === "running") {
    icon = (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <OptimizerStartedIcon size={size} />
      </Animated.View>
    );
  } else {
    // "not-started"
    icon = <OptimizerNotStartedIcon size={size} />;
  }

  const scale = fadeScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  return (
    <Animated.View
      style={{
        opacity: fadeScale,
        transform: [{ scale }],
      }}
    >
      {icon}
    </Animated.View>
  );
};

export default function OptimizerDummyScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const [isFinished, setIsFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [recipeData, setRecipeData] = useState<RecipeRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create 4 dummy variants
  const dummyVariants: Variant[] = [
    {
      variant: "Sojaflocken",
      id: "new_soy_flakes_100g",
      recipe: {
        title: "Frühstücks Bowl (1)",
        ingredients: [
          { name: "Sojajoghurt natur", grams: 120, calories: 32 },
          { name: "Banane", grams: 90, calories: 102 },
          { name: "Haferdrink", grams: 180, calories: 92 },
          { name: "Haferflocken", grams: 30, calories: 106 },
          { name: "Heidelbeere, frisch", grams: 40, calories: 21 },
          { name: "Sojaflocken", grams: 50, calories: 200 },
        ],
      },
    },
    {
      variant: "Linsen",
      id: "dummy-2",
      recipe: {
        title: "Dummy Recipe 2",
        ingredients: [{ name: "Linsen", grams: 100, calories: 350 }],
      },
    },
    {
      variant: "Kichererbsen",
      id: "dummy-3",
      recipe: {
        title: "Dummy Recipe 3",
        ingredients: [{ name: "Kichererbsen", grams: 150, calories: 250 }],
      },
    },
    {
      variant: "Quinoa",
      id: "dummy-4",
      recipe: {
        title: "Dummy Recipe 4",
        ingredients: [{ name: "Quinoa", grams: 80, calories: 300 }],
      },
    },
  ];

  // Load recipe data
  useEffect(() => {
    const loadRecipeData = async () => {
      if (!params.id) {
        setError("Kein Rezept gefunden.");
        return;
      }

      const recipeId = parseInt(params.id, 10);
      if (Number.isNaN(recipeId)) {
        setError("Ungültige Rezept-ID.");
        return;
      }

      try {
        await initDatabase();
        const recipe = await getRecipeById(recipeId);
        if (!recipe) {
          setError("Rezept nicht gefunden.");
          return;
        }
        setRecipeData(recipe);
      } catch (e) {
        console.error("Fehler beim Laden des Rezepts", e);
        setError("Fehler beim Laden der Rezeptdaten.");
      }
    };

    loadRecipeData();
  }, [params.id]);

  // Spin for 2 rounds (2 * 2000ms = 4000ms)
  useEffect(() => {
    const SPIN_DURATION_MS = 4000; // 2 rounds * 2000ms per round

    const timer = setTimeout(() => {
      setIsFinished(true);
    }, SPIN_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  // Show popup 300ms after isFinished becomes true
  useEffect(() => {
    if (isFinished) {
      const timeoutId = setTimeout(() => {
        setShowPopup(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isFinished]);

  const handleClosePopup = () => {
    setShowPopup(false);
    router.back();
  };

  const handleApplyVariant = async () => {
    // Check if a variant is selected
    if (
      selectedVariantIndex === null ||
      !recipeData ||
      !dummyVariants[selectedVariantIndex]
    ) {
      return;
    }

    const selectedVariant = dummyVariants[selectedVariantIndex];

    try {
      // Parse current recipe ingredients
      const currentIngredients = JSON.parse(
        recipeData.ingredients_json
      ) as Array<{
        id: string;
        title: string;
        portion: string;
        calories?: string;
      }>;

      // Create a map of existing ingredients by title for quick lookup
      const ingredientMap = new Map<string, (typeof currentIngredients)[0]>();
      currentIngredients.forEach(ing => {
        ingredientMap.set(ing.title.toLowerCase(), ing);
      });

      // Build updated ingredients array
      const updatedIngredients: Array<{
        id: string;
        title: string;
        portion: string;
        calories?: string;
      }> = [];

      // Track if we've added the new ingredient
      let newIngredientAdded = false;

      // Process each ingredient from the variant recipe
      for (const variantIngredient of selectedVariant.recipe.ingredients) {
        const ingredientNameLower = variantIngredient.name.toLowerCase();
        const variantNameLower = selectedVariant.variant.toLowerCase();
        const isNewIngredient = ingredientNameLower === variantNameLower;

        // Fetch calories from database based on ingredient ID
        let calculatedCalories: number | undefined;
        try {
          const ingredientId = isNewIngredient
            ? selectedVariant.id
            : ingredientMap.get(ingredientNameLower)?.id;

          if (ingredientId) {
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
          }
        } catch (error) {
          console.warn(
            `Failed to fetch calories for ingredient: ${variantIngredient.name}`,
            error
          );
        }

        if (isNewIngredient && !newIngredientAdded) {
          // This is the new ingredient (variant.variant) - add it
          updatedIngredients.push({
            id: selectedVariant.id,
            title: variantIngredient.name,
            portion: `${Math.round(variantIngredient.grams)} g`,
            calories: calculatedCalories
              ? `${Math.round(calculatedCalories)} kcal`
              : undefined,
          });
          newIngredientAdded = true;
        } else {
          // This is an existing ingredient - update its amount
          const existingIngredient = ingredientMap.get(ingredientNameLower);
          if (existingIngredient) {
            updatedIngredients.push({
              ...existingIngredient,
              portion: `${Math.round(variantIngredient.grams)} g`,
              calories: calculatedCalories
                ? `${Math.round(calculatedCalories)} kcal`
                : existingIngredient.calories,
            });
          }
        }
      }

      // Add any remaining ingredients from the original recipe that weren't in the variant
      for (const existingIngredient of currentIngredients) {
        const alreadyIncluded = updatedIngredients.some(
          ing =>
            ing.title.toLowerCase() === existingIngredient.title.toLowerCase()
        );
        if (!alreadyIncluded) {
          updatedIngredients.push(existingIngredient);
        }
      }

      // Recalculate nutrition with updated ingredients
      const updatedNutrition = await calculateRecipeNutrition(
        updatedIngredients
      );

      // Store the calculated recipe data temporarily in AsyncStorage
      const optimizerDraftKey = `optimizer_draft_${recipeData.id}`;
      const draftData = {
        recipeId: recipeData.id,
        title: recipeData.title,
        instructions: recipeData.instructions || "",
        ingredients: updatedIngredients,
        nutrition: updatedNutrition,
        imageUri: recipeData.image_uri,
        variant: selectedVariant,
      };
      await AsyncStorage.setItem(optimizerDraftKey, JSON.stringify(draftData));

      // Close popup and navigate to OptimizerFinal
      setShowPopup(false);
      router.push({
        pathname: "/OptimizerFinal",
        params: { id: recipeData.id.toString() },
      });
    } catch (error) {
      console.error("Error applying variant:", error);
      setError("Fehler beim Aktualisieren des Rezepts.");
    }
  };

  return (
    <SafeAreaView style={styles.Content}>
      <NavBar title="Optimizer" isBold={true} isBackButton={true} />
      <View style={styles.centerContainer}>
        <View style={styles.animationContainer}>
          <OptimizerStatusIcon size={48} isFinished={isFinished} />
        </View>
        <Text style={styles.text}>Aminosäureprofil analysieren</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <NextButton
        text="Abbrechen"
        onPress={handleClosePopup}
        buttonStyle="dark"
      />
      {showPopup && (
        <OptimizerPopUp
          titleText="Nährstoff-Bioverfügbarkeit"
          descriptionText={`Füge ein lysinreiches Lebensmittel hinzu. Lysin ist die limitierende Aminosäure in Getreide. Durch die Ergänzung gleichst du dieses Defizit aus und erhöhst die Proteinqualität.\n\nDie Empfehlungen basieren auf dem Lysingehalt und sind nach der erwarteten Wirkung auf die Proteinqualität sortiert.`}
          isShowButtons={true}
          leftButtonText="Abbrechen"
          rightButtonText="Fertig"
          rightButtonColor={Color.neutralWhite}
          rightButtonTextColor={Color.neutralBlackText}
          onRightButtonPress={handleApplyVariant}
          onClose={handleClosePopup}
        >
          <View style={styles.selectionContainer}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.scrollViewContent}>
                {dummyVariants.map((variant, index) => (
                  <AltLebSelectRow
                    key={index}
                    checked={selectedVariantIndex === index}
                    text={variant.variant}
                    onCheckPress={() => {
                      setSelectedVariantIndex(
                        selectedVariantIndex === index ? null : index
                      );
                    }}
                    onRemovePress={() => {}}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.selectionRow}>
              <Pressable
                style={styles.helpContainer}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Help"
              >
                <HelpCircleIcon size={24} color={Color.neutralWhite} />
              </Pressable>
              <Pressable
                style={styles.mehrLadenClickContainer}
                onPress={() => {}}
                accessibilityRole="button"
                accessibilityLabel="Mehr laden"
              >
                <Text style={styles.mehrLadenText}>Mehr laden</Text>
              </Pressable>
            </View>
          </View>
        </OptimizerPopUp>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    paddingBottom: Padding.padding_next_button,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  animationContainer: {
    padding: 5,
  },
  text: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
  },
  errorText: {
    ...Typography.subheadlineRegular,
    color: Color.destructive50,
    textAlign: "center",
    marginTop: 8,
  },
  selectionContainer: {
    paddingTop: 14,
    gap: 4,
  },
  scrollView: {},
  scrollViewContent: {
    gap: 4,
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 44,
  },
  helpContainer: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  mehrLadenClickContainer: {
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  mehrLadenText: {
    ...Typography.subheadlineRegular,
    color: Color.brand40LetzteButtonOrBlueText,
  },
});
