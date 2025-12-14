import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  EditPencilIcon,
  OptimizedIcon,
  ShareIcon,
  StarLineIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
const breakfastImage = require("@/assets/images/FrühstücksBowlPicture.png");

interface RecipeDetailTopComponentProps {
  isOptimized?: boolean;
  isPicture?: boolean;
  navbarTitle?: string;
}

const RecipeDetailTopComponent = ({
  isOptimized,
  isPicture = true,
  navbarTitle = "",
}: RecipeDetailTopComponentProps) => {
  const insets = useSafeAreaInsets();
  const rightActions = React.useMemo(
    () => [
      { icon: <EditPencilIcon size={20} />, onPress: () => {} },
      { icon: <ShareIcon size={20} />, onPress: () => {} },
      { icon: <StarLineIcon size={20} />, onPress: () => {} },
    ],
    []
  );

  const content = (
    <LinearGradient
      colors={
        isPicture
          ? [
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.45)",
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.58)",
              "rgba(12,12,12,0.80)",
            ]
          : ["transparent", "transparent"]
      }
      locations={isPicture ? [0, 0.4, 0.66, 0.83, 1] : [0, 1]}
      style={[styles.overlay, { paddingTop: insets.top }]}
    >
      <NavBar title={navbarTitle} rightActions={rightActions} />
      <View style={styles.content}>
        <View style={[styles.titleContainer, !isPicture && { paddingTop: 32 }]}>
          <Text style={styles.titleText} numberOfLines={3} ellipsizeMode="tail">
            Frühstücks Bowl
          </Text>
          {isOptimized && (
            <View style={styles.optimizedIconContainer}>
              <OptimizedIcon size={30} />
              <Text style={styles.optimizedText}>Optimized</Text>
            </View>
          )}
        </View>
        <View style={styles.macrosContainer}>
          {[
            { value: "450 kcal", label: "Kalorien", align: "left" as const },
            { value: "15g", label: "Protein", align: "center" as const },
            { value: "71g", label: "Carbs", align: "center" as const },
            { value: "11g", label: "Fett", align: "right" as const },
          ].map((macro, index) => (
            <View key={index} style={styles.macroCard}>
              <Text style={[styles.macroValue, { textAlign: macro.align }]}>
                {macro.value}
              </Text>
              <Text style={[styles.macroLabel, { textAlign: macro.align }]}>
                {macro.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );

  if (isPicture) {
    return (
      <ImageBackground
        source={breakfastImage}
        style={[styles.imageBackground, { marginTop: -insets.top }]}
        resizeMode="cover"
      >
        {content}
      </ImageBackground>
    );
  }

  return (
    <View
      style={[
        styles.imageBackground,
        styles.imageBackgroundNoPicture,
        { marginTop: -insets.top },
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 330,
    justifyContent: "space-between",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  imageBackgroundNoPicture: {
    height: "auto",
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  overlay: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingVertical: 24,
    gap: 12,
  },
  titleText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    flexShrink: 1,
  },
  optimizedIconContainer: {
    alignItems: "center",
    gap: 2,
  },
  optimizedText: {
    ...Typography.caption1Emphasized,
    color: Color.neutralTextOrTabGrey,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCard: {},
  macroValue: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
  macroLabel: {
    ...Typography.caption1Regular,
    color: Color.neutralWhite,
    opacity: 0.85,
    marginTop: 4,
    textAlign: "center",
  },
});

export default RecipeDetailTopComponent;
