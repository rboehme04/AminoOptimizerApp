import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { EditPencilIcon, ShareIcon, StarLineIcon } from "@/assets/icons/icons";
import { OptimizedIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";

const breakfastImage = require("@/assets/images/FrühstücksBowlPicture.png");

interface RecipeDetailTopComponentProps {
  isOptimized?: boolean;
}

const RecipeDetailTopComponent = ({
  isOptimized,
}: RecipeDetailTopComponentProps) => {
  const rightActions = React.useMemo(
    () => [
      { icon: <EditPencilIcon size={20} />, onPress: () => {} },
      { icon: <ShareIcon size={20} />, onPress: () => {} },
      { icon: <StarLineIcon size={20} />, onPress: () => {} },
    ],
    []
  );

  return (
    <ImageBackground
      source={breakfastImage}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          "rgba(12,12,12,0.58)",
          "rgba(12,12,12,0.45)",
          "rgba(12,12,12,0.58)",
          "rgba(12,12,12,0.58)",
          "rgba(12,12,12,0.80)",
        ]}
        locations={[0, 0.4, 0.66, 0.83, 1]}
        style={styles.overlay}
      >
        <NavBar title="Hinzufügen" rightActions={rightActions} />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Frühstücks Bowl</Text>
            {isOptimized && 
            <View style={styles.optimizedIcon}>
              <OptimizedIcon size={30} />
              <Text style={styles.optimizedText}>Optimized</Text>
            </View>
            }
        </View>
        
      </LinearGradient>
    </ImageBackground>
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
    alignItems: "center",
    paddingTop: 16,
    paddingVertical: 24,
    gap: 12,
  },
  title: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    backgroundColor: "red",
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
