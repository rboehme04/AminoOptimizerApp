import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { EditPencilIcon, ShareIcon, StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Border, Color, Typography } from "@/constants/GlobalStyles";

const breakfastImage = require("@/assets/images/FrühstücksBowlPicture.png");

type MacroCardProps = {
  label: string;
  value: string;
  align?: "left" | "center" | "right";
};

const MacroCard = ({ label, value, align = "left" }: MacroCardProps) => (
  <BlurView intensity={25} tint="dark" style={[styles.macroCard]}>
    <Text style={[styles.macroValue, { textAlign: align }]}>{value}</Text>
    <Text style={[styles.macroLabel, { textAlign: align }]}>{label}</Text>
  </BlurView>
);

const RecipeDetailTopComponent = () => {
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
          <Text style={styles.title}>Frühstücks Bowl</Text>
          <View style={styles.macrosRow}>
            <MacroCard label="Kalorien" value="450kcal" />
            <MacroCard label="Protein" value="15g" align="center" />
            <MacroCard label="Carbs" value="71g" align="center" />
            <MacroCard label="Fett" value="11g" align="right" />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height:330,
    justifyContent: "space-between",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
    justifyContent: "space-between",
  },
  content: {
    gap: 16,
    paddingBottom: 8,
  },
  title: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
  },
  macrosRow: {
    flexDirection: "row",
    gap: 10,
  },
  macroCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: Color.transparentBlack32,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  macroValue: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  macroLabel: {
    ...Typography.caption1Regular,
    color: Color.neutralWhite,
    opacity: 0.85,
    marginTop: 4,
  },
});

export default RecipeDetailTopComponent;
