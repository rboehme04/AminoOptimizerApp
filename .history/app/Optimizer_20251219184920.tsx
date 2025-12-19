import {
  OptimizerFinishedIcon,
  OptimizerNotStartedIcon,
  OptimizerStartedIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import AltLebSelectRow from "@/components/optimizerComponents/altLebSelectRow";
import OptimizerPopUp from "@/components/optimizerPopUp";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import { nutritionToRows, type RecipeNutrition } from "@/utils/recipeNutrition";
import { getRecipeById, initDatabase } from "@/utils/sqlite";
import { supabase } from "@/utils/supabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckboxComponent from "@/components/checkBoxComponent";

type OptimizerStatus = "not-started" | "running" | "finished";

type OptimizerStatusIconProps = {
  size?: number;
  /**
   * Set to true when your async action (e.g. DB query) has finished.
   */
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
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Minimum spin duration: 2 rounds * 2000ms per round = 4000ms
    const MIN_SPIN_DURATION_MS = 4000;

    const ensureMinimumSpinDuration = () => {
      if (!startTimeRef.current) return;

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
                    .slice(0, 50)
                    .map(({ _sum, ...rest }) => rest as FoodItem);
                }

                setRecommendedLebensmittel(
                  processedData.map(item => ({
                    id: item.id,
                    name: item.name || "Unbekannt",
                  }))
                );
              }
            } catch (queryErr) {
              console.error(
                "Error fetching recommended Lebensmittel:",
                queryErr
              );
            }
          }
        }

        ensureMinimumSpinDuration();
      } catch (e) {
        console.error("Fehler beim Optimieren des Rezepts", e);
        setError("Fehler beim Laden der Rezeptdaten.");
        ensureMinimumSpinDuration();
      }
    };

    runOptimization();
  }, [params.id]);

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
              <AltLebSelectRow
                checked={true}
                text="Sojaflocken"
                onCheckPress={() => {}}
                onRemovePress={() => {}}
              />
              <AltLebSelectRow
                checked={true}
                text="Sojaflocken"
                onCheckPress={() => {}}
                onRemovePress={() => {}}
              />
              <AltLebSelectRow
                checked={true}
                text="Sojaflocken"
                onCheckPress={() => {}}
                onRemovePress={() => {}}
              />
              <AltLebSelectRow
                checked={true}
                text="Sojaflocken"
                onCheckPress={() => {}}
                onRemovePress={() => {}}
              />
            </ScrollView>
            <View style={styles.selectionRow}>
              <CheckboxComponent checked={true} onPress={() => {}} />
              <Text style={styles.mehrLadenText}>Mehr l</Text>
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
  mehrLadenText: {
    ...Typography.subheadlineRegular,
    color: Color.brand40LetzteButtonOrBlueText,
  },
});
