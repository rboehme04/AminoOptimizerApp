import { Color, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChevronRightIcon,
  EatSymbolIcon,
  MagicSparkleIcon,
  SolidFireIcon,
} from "@/assets/icons/icons";

const OptimizedBadge = () => {
  return (
    <View style={[styles.optimizedBadge]}>
      <MagicSparkleIcon width={12} height={12} />
      <Text style={styles.optimized}>Optimized</Text>
    </View>
  );
};

type MealRowProps = {
  isOptimized?: boolean;
};

const MealRow = ({ isOptimized = false }: MealRowProps) => {
  return (
    <Pressable style={styles.mealRow} onPress={() => {}}>
      <Pressable style={styles.leftClickContainer} onPress={() => {}}>
        <Text style={styles.title}>High Protein Raspberry Cheesecake Bowl</Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            {isOptimized ? <OptimizedBadge /> : null}
            <EatSymbolIcon width={18} height={18} />
            <View style={styles.ingredientsContainer}>
              <Text
                style={[styles.captionTypo]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Skyr, Himbeeren, Zitronensaft
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.captionTypo}>226 kcal</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <ChevronRightIcon />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 32,
  },
  leftClickContainer: {
    paddingLeft: 16,
    paddingRight: 2,
    paddingVertical: 12,
    gap: 6,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  captionTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  ingredientsContainer: {
    flex: 1,
  },
  optimizedBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    paddingLeft: 4,
    paddingRight: 6,
    paddingVertical: 1,
    gap: 4,
  },
  optimized: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightClickContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 12,
    alignSelf: "stretch",
  },
  addText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    lineHeight: 24,
  },
});

export default MealRow;
