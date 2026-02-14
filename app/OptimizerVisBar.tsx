import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import RadarChart from "@/components/optimizerComponents/radarChart";
import StackedBarChart, {
  type AminoAcidData,
} from "@/components/optimizerComponents/barChart";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import {
  nutritionToAminoChartData,
  type RecipeNutrition,
} from "@/utils/recipeNutrition";
import { getRecipeById, initDatabase, type RecipeRow } from "@/utils/sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function OptimizerVisBarScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const [recipeData, setRecipeData] = useState<RecipeRow | null>(null);
  const [draftData, setDraftData] = useState<OptimizerDraftData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  const [toggleValue, setToggleValue] = useState<"left" | "right">("left");
  const [animationDuration, setAnimationDuration] = useState(500);
  const [hasUserToggled, setHasUserToggled] = useState(false);
  const hasUserToggledRef = useRef(false);
  const [visualizationType, setVisualizationType] = useState<"radar" | "bar">(
    "bar"
  );

  // Load recipe and draft
  useEffect(() => {
    const load = async () => {
      if (!params.id) {
        setError("Kein Rezept gefunden.");
        setShowLoading(false);
        return;
      }

      const recipeId = parseInt(params.id, 10);
      if (Number.isNaN(recipeId)) {
        setError("Ungültige Rezept-ID.");
        setShowLoading(false);
        return;
      }

      try {
        await initDatabase();
        const [recipe, draftJson] = await Promise.all([
          getRecipeById(recipeId),
          AsyncStorage.getItem(`optimizer_draft_${recipeId}`),
        ]);

        if (!recipe) {
          setError("Rezept nicht gefunden.");
          setShowLoading(false);
          return;
        }

        if (!draftJson) {
          setError("Kein Optimierungs-Entwurf gefunden. Bitte zuerst im Optimizer eine Variante auswählen und „Fertig“ wählen.");
          setShowLoading(false);
          return;
        }

        const draft: OptimizerDraftData = JSON.parse(draftJson);
        setRecipeData(recipe);
        setDraftData(draft);
      } catch (e) {
        console.error("Fehler beim Laden", e);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setShowLoading(false);
      }
    };

    load();
  }, [params.id]);

  // Before/after chart data from real nutrition
  const beforeChart = recipeData
    ? nutritionToAminoChartData(
        JSON.parse(recipeData.nutrition_json) as RecipeNutrition
      )
    : null;
  const afterChart = draftData
    ? nutritionToAminoChartData(draftData.nutrition)
    : null;

  const beforeData: AminoAcidData[] = beforeChart?.data ?? [];
  const afterData: AminoAcidData[] = afterChart?.data ?? [];
  const limitingASBefore = beforeChart?.limitingAS ?? 0;
  const limitingASAfter = afterChart?.limitingAS ?? 0;

  // Auto-switch toggle Vorher → Nachher after 3s if user hasn't toggled
  useEffect(() => {
    if (
      !showLoading &&
      recipeData &&
      draftData &&
      beforeData.length > 0 &&
      !hasUserToggledRef.current
    ) {
      const timeoutId = setTimeout(() => {
        if (!hasUserToggledRef.current) {
          setAnimationDuration(700);
          setToggleValue("right");
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [showLoading, recipeData, draftData, beforeData.length]);

  useEffect(() => {
    hasUserToggledRef.current = hasUserToggled;
  }, [hasUserToggled]);

  const handleManualToggle = (value: "left" | "right") => {
    setHasUserToggled(true);
    setAnimationDuration(500);
    setToggleValue(value);
  };

  const handleVisualizationToggle = () => {
    setVisualizationType(prev => (prev === "radar" ? "bar" : "radar"));
  };

  const showContent =
    !showLoading && recipeData && draftData && beforeData.length > 0;

  return (
    <SafeAreaView style={styles.Content}>
      <NavBar
        title="Optimizer"
        isBold={true}
        isBackButton={true}
        rightActions={[
          {
            icon: <View style={{ width: 44, height: 44, opacity: 0 }} />,
            onPress: handleVisualizationToggle,
          },
        ]}
      />
      {showLoading && (
        <View style={styles.centerContainer}>
          <Text style={styles.text}>Daten werden geladen…</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
      {!showLoading && error && !showContent && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {showContent && recipeData && (
        <>
          <View style={styles.contentContainer}>
            <View style={styles.aminoOptBarChartContainer}>
              <View style={styles.visTitleContainer}>
                <Text style={styles.visTitleText}>
                  Protein-Optimierung im Vergleich
                </Text>
              </View>
              <LeftRightToggle
                leftLabel="Vorher"
                rightLabel="Nachher"
                onToggle={handleManualToggle}
                value={toggleValue}
                animationDuration={animationDuration}
                inactiveColor="#878787"
              />
              <View style={styles.barChartContainer}>
                {visualizationType === "radar" ? (
                  <RadarChart
                    limitingAS={
                      toggleValue === "left"
                        ? limitingASBefore
                        : limitingASAfter
                    }
                    data={toggleValue === "left" ? beforeData : afterData}
                    width={Dimensions.get("window").width - 32}
                    height={Dimensions.get("window").width - 32}
                    animationDuration={animationDuration}
                  />
                ) : (
                  <StackedBarChart
                    limitingAS={
                      toggleValue === "left"
                        ? limitingASBefore
                        : limitingASAfter
                    }
                    data={toggleValue === "left" ? beforeData : afterData}
                    width={Dimensions.get("window").width - 32}
                    height={220}
                    animationDuration={animationDuration}
                  />
                )}
              </View>
              <View style={styles.legendContainer}>
                <View style={styles.legendeRow}>
                  <View
                    style={[
                      styles.legendeColorBox,
                      { backgroundColor: Color.success70 },
                    ]}
                  />
                  <Text style={styles.legendeText}>
                    Nutzbar für Muskeln, Zellen, Enzyme & Immunsystem
                  </Text>
                </View>
                <View style={styles.legendeRow}>
                  <View
                    style={[
                      styles.legendeColorBox,
                      { backgroundColor: Color.neutralButtonInactive },
                    ]}
                  />
                  <Text style={styles.legendeText}>
                    Nicht nutzbar, wird nur zur Energiegewinnung verwendet
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <NextButton
            text="Weiter"
            onPress={() => {
              router.push({
                pathname: "/OptimizerFinal",
                params: { id: recipeData.id.toString() },
              });
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: Padding.padding_next_button,
    paddingHorizontal: 16,
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  aminoOptBarChartContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 26,
    paddingVertical: 32,
    gap: 8,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 16,
  },
  visTitleContainer: {
    paddingBottom: 8,
  },
  visTitleText: {
    ...Typography.bodyRegular,
    color: Color.neutralWhite,
  },
  barChartContainer: {},
  legendContainer: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  legendeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 10,
  },
  legendeColorBox: {
    width: 18,
    height: 12,
  },
  legendeText: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
});
