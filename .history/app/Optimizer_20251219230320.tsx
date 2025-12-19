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
import { askLlama } from "@/utils/huggingface";
import { createPrompt } from "@/utils/llmPrompts";
import { nutritionToRows, type RecipeNutrition } from "@/utils/recipeNutrition";
import { getRecipeById, initDatabase, type RecipeRow } from "@/utils/sqlite";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

// Hyperparameters
const NUMBER_FOOD_OUTPUT = 4;
const NUMBER_FOOD_RECOMMENDATIONS = 200;

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

export default function OptimizerScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const [isFinished, setIsFinished] = useState(false);
  const [limitingAAs, setLimitingAAs] = useState<
    { label: string; cs: number }[] | null
  >(null);
  const [recommendedLebensmittel, setRecommendedLebensmittel] = useState<
    { id: string | number; name: string }[]
  >([]);
  const [recipeData, setRecipeData] = useState<RecipeRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  // Parse recipe data for prompt creation
  const recipeForLLM = useMemo(() => {
    if (!recipeData) return null;
    try {
      return {
        title: recipeData.title,
        ingredients: JSON.parse(recipeData.ingredients_json) as Array<{
          id: string;
          title: string;
          portion: string;
          calories?: string;
        }>,
        instructions: recipeData.instructions || undefined,
      };
    } catch (error) {
      console.error("Error parsing recipe ingredients:", error);
      return null;
    }
  }, [recipeData]);

  // Create prompt using utility function
  const prompt = useMemo(() => {
    if (!recipeForLLM || recommendedLebensmittel.length === 0) return null;
    return createPrompt({
      recommendedLebensmittel: recommendedLebensmittel,
      recipe: recipeForLLM,
      numberFoodOutput: NUMBER_FOOD_OUTPUT,
    });
  }, [recommendedLebensmittel, recipeForLLM]);
  // LLM state
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);

  // Minimum spin duration: 2 rounds * 2000ms per round = 4000ms
  const MIN_SPIN_DURATION_MS = 4000;

  // Helper function to ensure minimum spin duration
  const ensureMinimumSpinDuration = () => {
    if (!startTimeRef.current) {
      setIsFinished(true);
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = MIN_SPIN_DURATION_MS - elapsed;

    if (remaining > 0) {
      setTimeout(() => {
        setIsFinished(true);
      }, remaining);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    const runOptimization = async () => {
      // Record start time for minimum spin duration
      startTimeRef.current = Date.now();

      if (!params.id) {
        setError("Kein Rezept gefunden.");
        ensureMinimumSpinDuration();
        return;
      }

      const recipeId = parseInt(params.id, 10);
      if (Number.isNaN(recipeId)) {
        setError("Ungültige Rezept-ID.");
        ensureMinimumSpinDuration();
        return;
      }

      try {
        await initDatabase();
        const recipe = await getRecipeById(recipeId);
        if (!recipe || !recipe.nutrition_json) {
          setError("Keine Nährwertdaten für dieses Rezept vorhanden.");
          ensureMinimumSpinDuration();
          return;
        }

        // Store recipe data for useLLM hook
        setRecipeData(recipe);

        const nutrition: RecipeNutrition = JSON.parse(recipe.nutrition_json);
        const rows = nutritionToRows(nutrition);

        // Protein per 100 g (same logic as DetailsNaehrstoffprofilComponent)
        const proteinPer100g =
          rows
            .find(row => row.title === "Überblick")
            ?.values.find(value => value.label === "Eiweiß")?.current ??
          undefined;

        const aminoRow = rows.find(row => row.title === "Aminosäuren");
        if (
          !aminoRow ||
          typeof proteinPer100g !== "number" ||
          proteinPer100g <= 0
        ) {
          setError("Aminosäuren oder Proteinangabe fehlen.");
          ensureMinimumSpinDuration();
          return;
        }

        const proteinFactor = 100 / proteinPer100g;

        const scores = aminoRow.values
          .map(value => {
            const { label, current, reference } = value;
            if (!reference || reference <= 0) return null;

            const currentPer100gProtein = current * proteinFactor;
            const cs = (currentPer100gProtein / reference) * 100;

            if (!Number.isFinite(cs)) return null;

            return { label, cs: Math.round(cs) };
          })
          .filter(
            (item): item is { label: string; cs: number } => item !== null
          )
          .sort((a, b) => a.cs - b.cs)
          //   Todo: Later more than just the limiting Amino Acid should be used in the calculation to ensure an optimal Aminoprofil
          .slice(0, 1);

        setLimitingAAs(scores);

        // Query top 50 Lebensmittel ordered by the limiting amino acid
        if (scores.length > 0) {
          const limitingAALabel = scores[0].label;
          const limitingAAValue = aminoRow.values.find(
            v => v.label === limitingAALabel
          );

          if (limitingAAValue?.column) {
            let orderColumn: string;
            let needsSum = false;

            if (Array.isArray(limitingAAValue.column)) {
              // For combined amino acids, use the first column for ordering
              // We'll fetch more results and sort by sum in JavaScript if needed
              orderColumn = limitingAAValue.column[0];
              needsSum = limitingAAValue.column.length > 1;
            } else {
              orderColumn = limitingAAValue.column;
            }

            try {
              // Build select columns
              const selectColumns = ["id", "name", "protein", orderColumn];
              if (needsSum && Array.isArray(limitingAAValue.column)) {
                selectColumns.push(...limitingAAValue.column.slice(1));
              }

              const query = supabase
                .from("opennutrition_foods")
                .select(selectColumns.join(", "))
                .not(orderColumn, "is", null)
                .order(orderColumn, { ascending: false })
                .limit(needsSum ? 100 : 50);

              const { data, error: queryError } = await query;

              if (queryError) {
                console.error("Error querying Lebensmittel:", queryError);
              } else if (data) {
                type FoodItem = {
                  id: string | number;
                  name: string | null;
                  [key: string]: unknown;
                };

                let processedData: FoodItem[] = data as unknown as FoodItem[];

                // If we need to sum multiple columns, sort by the sum
                if (needsSum && Array.isArray(limitingAAValue.column)) {
                  const columns = limitingAAValue.column;
                  processedData = (data as unknown as FoodItem[])
                    .map(item => {
                      const sum = columns.reduce((acc: number, col: string) => {
                        const val = item[col];
                        return acc + (typeof val === "number" ? val : 0);
                      }, 0);
                      return { ...item, _sum: sum };
                    })
                    .sort((a, b) => {
                      const aSum = (a as FoodItem & { _sum: number })._sum;
                      const bSum = (b as FoodItem & { _sum: number })._sum;
                      return bSum - aSum;
                    })
                    .slice(0, NUMBER_FOOD_RECOMMENDATIONS)
                    .map(({ _sum, ...rest }) => rest as FoodItem);
                }

                const newRecommendedLebensmittel = processedData.map(item => ({
                  id: item.id,
                  name: item.name || "Unbekannt",
                }));
                setRecommendedLebensmittel(newRecommendedLebensmittel);
                console.log(length())
              }
            } catch (queryErr) {
              console.error(
                "Error fetching recommended Lebensmittel:",
                queryErr
              );
            }
          }
        }

        // Don't call ensureMinimumSpinDuration here - wait for LLM to complete
        // Only call it if there's an error that prevents LLM from running
      } catch (e) {
        console.error("Fehler beim Optimieren des Rezepts", e);
        setError("Fehler beim Laden der Rezeptdaten.");
        ensureMinimumSpinDuration();
      }
    };

    runOptimization();
  }, [params.id]);

  // Call LLM when prompt is ready
  useEffect(() => {
    if (!prompt) return;

    const callLLM = async () => {
      setLlmLoading(true);
      setLlmError(null);
      setLlmResponse(null);

      try {
        // console.log("LLM Prompt:", prompt);
        const answer = await askLlama(prompt);
        if (answer) {
          setLlmResponse(answer);
        //   console.log("LLM Raw Response:", answer);

          // Parse the LLM response to extract variants
          try {
            // Remove markdown code blocks if present
            let cleanedResponse = answer.trim();
            if (cleanedResponse.startsWith("```json")) {
              cleanedResponse = cleanedResponse
                .replace(/^```json\s*/, "")
                .replace(/\s*```$/, "");
            } else if (cleanedResponse.startsWith("```")) {
              cleanedResponse = cleanedResponse
                .replace(/^```\s*/, "")
                .replace(/\s*```$/, "");
            }

            // Try to parse as JSON array first
            let parsedVariants: Variant[] = [];
            try {
              const parsed = JSON.parse(cleanedResponse);
              if (Array.isArray(parsed)) {
                // Validate that each item has the variant structure
                parsedVariants = parsed.filter(
                  (item): item is Variant =>
                    typeof item === "object" &&
                    item !== null &&
                    "variant" in item &&
                    "id" in item &&
                    "recipe" in item
                );
              } else if (
                typeof parsed === "object" &&
                parsed !== null &&
                "variant" in parsed
              ) {
                // Single variant object
                parsedVariants = [parsed as Variant];
              }
            } catch (parseError) {
              console.log(
                "JSON.parse failed, trying to extract objects. Error:",
                parseError
              );
              // If JSON parsing fails, the response might be a comma-separated list of objects
              // Try wrapping it in an array first
              try {
                // Clean up the response: remove trailing commas and whitespace
                let wrappedResponse = cleanedResponse.trim();
                // Remove trailing comma (with optional whitespace)
                wrappedResponse = wrappedResponse.replace(/,\s*$/, "");
                // Remove any leading/trailing whitespace again after comma removal
                wrappedResponse = wrappedResponse.trim();

                // Only try wrapping if the response looks like it starts with an object
                if (wrappedResponse.startsWith("{")) {
                  // Wrap in array brackets
                  const arrayWrapped = `[${wrappedResponse}]`;
                  const parsed = JSON.parse(arrayWrapped);
                  if (Array.isArray(parsed)) {
                    parsedVariants = parsed.filter(
                      (item): item is Variant =>
                        typeof item === "object" &&
                        item !== null &&
                        "variant" in item &&
                        "id" in item &&
                        "recipe" in item
                    );
                    console.log(
                      "Successfully parsed as wrapped array, found",
                      parsedVariants.length,
                      "variants"
                    );
                  }
                } else {
                  throw new Error("Response doesn't start with {");
                }
              } catch (wrapError) {
                console.log(
                  "Wrapping in array failed:",
                  wrapError instanceof Error ? wrapError.message : wrapError
                );
                console.log(
                  "Response preview (first 200 chars):",
                  cleanedResponse.substring(0, 200)
                );
                console.log("Trying to extract individual objects");
                // Fallback: try to find complete JSON objects by matching braces
                // This is more complex - we need to match balanced braces
                const extractCompleteObjects = (text: string): Variant[] => {
                  const results: Variant[] = [];
                  let depth = 0;
                  let start = -1;

                  for (let i = 0; i < text.length; i++) {
                    if (text[i] === "{") {
                      if (depth === 0) start = i;
                      depth++;
                    } else if (text[i] === "}") {
                      depth--;
                      if (depth === 0 && start !== -1) {
                        const objStr = text.substring(start, i + 1);
                        try {
                          const parsed = JSON.parse(objStr);
                          if (
                            typeof parsed === "object" &&
                            parsed !== null &&
                            "variant" in parsed &&
                            "id" in parsed &&
                            "recipe" in parsed
                          ) {
                            results.push(parsed as Variant);
                          }
                        } catch (parseErr) {
                          console.log(
                            "Failed to parse object:",
                            objStr.substring(0, 100),
                            parseErr
                          );
                          // Skip invalid JSON
                        }
                        start = -1;
                      }
                    }
                  }
                  console.log(
                    "extractCompleteObjects found",
                    results.length,
                    "objects"
                  );
                  return results;
                };

                parsedVariants = extractCompleteObjects(cleanedResponse);
              }
            }
            console.log("Parsed Variants:", parsedVariants);
            setVariants(parsedVariants);
            // Mark as finished when LLM call completes (with or without variants)
            // Ensure minimum spin duration is respected
            // Only mark as finished if we have variants, otherwise keep loading
            if (parsedVariants.length > 0) {
              // Todo: add Timeout error so that is does not load forever
              ensureMinimumSpinDuration();
            }
          } catch (parseError) {
            console.error("Error parsing LLM response:", parseError);
            setLlmError("Failed to parse LLM response");
            // Don't mark as finished if parsing fails - keep trying or show error
          }
        } else {
          setLlmError("No response from LLM");
          // Don't mark as finished if no response - keep trying or show error
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setLlmError(errorMessage);
        console.error("Error calling LLM:", error);
        // Don't mark as finished on error - show error state instead
      } finally {
        setLlmLoading(false);
      }
    };

    callLLM();
  }, [prompt]);

  // Show popup 300ms after isFinished becomes true
  useEffect(() => {
    if (isFinished && !error && limitingAAs && limitingAAs.length > 0) {
      const timeoutId = setTimeout(() => {
        setShowPopup(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isFinished, error, limitingAAs]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const formatLimitingAAs = () => {
    if (!limitingAAs || limitingAAs.length === 0) return "";
    return limitingAAs.map(item => `${item.label}: ${item.cs}%`).join("\n");
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
      <NextButton text="Abbrechen" onPress={() => {}} buttonStyle="dark" />
      {showPopup && (
        <OptimizerPopUp
          titleText="Nährstoff-Bioverfügbarkeit"
          descriptionText={`Füge ein lysinreiches Lebensmittel hinzu. Lysin ist die limitierende Aminosäure in Getreide. Durch die Ergänzung gleichst du dieses Defizit aus und erhöhst die Proteinqualität.\n\nDie Empfehlungen basieren auf dem Lysingehalt und sind nach der erwarteten Wirkung auf die Proteinqualität sortiert.`}
          isShowButtons={true}
          leftButtonText="Überspringen"
          rightButtonText="Fertig"
          rightButtonColor={Color.neutralWhite}
          rightButtonTextColor={Color.neutralBlackText}
          onClose={handleClosePopup}
        >
          <View style={styles.selectionContainer}>
            <ScrollView style={styles.scrollView}>
              {variants.map((variant, index) => (
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
            <Text style={styles.popupText}>{formatLimitingAAs()}</Text>
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
  popupText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    marginTop: 8,
  },
  selectionContainer: {
    paddingTop: 14,
    gap: 4,
  },
  scrollView: {
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
