import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import EatSymbolIcon from "@/assets/icons/eatSymbol_icon.svg";
import MagicSparkleIcon from "@/assets/icons/magicSparkle_icon.svg";
import SolidFireIcon from "@/assets/icons/solidFire_icon.svg";
import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";

const MealRow = () => {
  return (
    <Pressable style={styles.mealRow} onPress={() => {}}>
      <View style={styles.leftClickContainer}>
        <Text style={styles.title}>High Protein Raspberry Cheesecake Bowl</Text>
        <View style={[styles.bottomContainer, styles.containerFlexBox]}>
          <View style={[styles.leftContainer, styles.containerFlexBox]}>
            <View style={[styles.optimizedBadge, styles.containerFlexBox]}>
              <MagicSparkleIcon width={12} height={12} />
              <Text style={styles.optimized}>Optimized</Text>
            </View>
            <EatSymbolIcon width={18} height={18} />
            <Text style={[styles.ingredients, styles.kcalTypo]}>
              Skyr, Himbeeren, Zitronensaft
            </Text>
          </View>
          <View style={[styles.containerFlexBox, styles.calories]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.kcalTypo}>226 kcal</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.rightClickContainer, styles.containerFlexBox]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <Text style={styles.addText}>+</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    gap: Gap.gap_6,
    alignItems: "center",
    flexDirection: "row",
  },
  mealRow: {
    width: "100%",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
  },
  leftClickContainer: {
    paddingLeft: Padding.padding_16,
    paddingRight: Padding.padding_4,
    paddingVertical: Padding.padding_10,
    gap: Gap.gap_8,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  bottomContainer: {
    gap: Gap.gap_8,
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
  },
  optimizedBadge: {
    borderRadius: 12,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    paddingHorizontal: Padding.padding_4,
    paddingVertical: 2,
  },
  optimized: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
  ingredients: {
    flex: 1,
    ...Typography.caption1Regular,
  },
  kcalTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "left",
  },
  calories: {
    justifyContent: "flex-end",
  },
  rightClickContainer: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    lineHeight: 24,
  },
});

export default MealRow;
