import {
  ChevronRightIcon,
  EatSymbolIcon,
  MagicSparkleIcon,
  SolidFireIcon,
} from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const OptimizedBadge = () => {
  return (
    <View style={[styles.optimizedBadge]}>
      <MagicSparkleIcon width={12} height={12} />
      <Text style={styles.optimized}>Optimized</Text>
    </View>
  );
};

type MealRowProps = {
  recipeId?: number;
  title?: string;
  ingredients?: string;
  calories?: string;
  isOptimized?: boolean;
  macros?: { protein: number; carbs: number; fat: number } | null;
};

const MealRow = ({
  recipeId,
  title = "High Protein Raspberry Cheesecake Bowl",
  ingredients = "Skyr, Himbeeren, Zitronensaft",
  calories = "226 kcal",
  isOptimized = false,
}: MealRowProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (recipeId !== undefined) {
      router.push({
        pathname: "/RezDetail",
        params: { id: recipeId.toString() },
      });
    } else {
      router.push("/RezDetail");
    }
  };

  return (
    <Pressable style={styles.mealRow} onPress={handlePress}>
      <View style={styles.leftOuterContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
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
                {ingredients}
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.captionTypo}>{calories}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.rightOuterContainer]}>
        <ChevronRightIcon />
      </View>
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
  leftOuterContainer: {
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
  rightOuterContainer: {
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
