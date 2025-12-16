import {
  EatSymbolIcon,
  MagicSparkleIcon,
  SolidFireIcon,
} from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AddIconButton from "./addIconButton";

const OptimizedBadge = () => {
  return (
    <View style={[styles.optimizedBadge]}>
      <MagicSparkleIcon width={12} height={12} />
      <Text style={styles.optimized}>Optimized</Text>
    </View>
  );
};

type AddMealRowProps = {
  recipeId?: number;
  title?: string;
  ingredients?: string;
  calories?: string;
  isOptimized?: boolean;
  macros?: { protein: number; carbs: number; fat: number } | null;
  onPress?: () => void;
  onAddPress?: () => void;
};

const AddMealRow = ({
  recipeId,
  title = "Frühstücks Bowl",
  ingredients = "Banane, Haferflocken, Blaubeeren, Heidelbeeren",
  calories = "555 kcal",
  isOptimized = false,
  macros,
  onPress,
  onAddPress = () => {},
}: AddMealRowProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    router.push({
      pathname: "/HinzuRezDetail",
      params: {
        id: recipeId?.toString() ?? "",
      },
    });
  };

  return (
    <View style={styles.mealRow}>
      <Pressable style={styles.leftClickContainer} onPress={handlePress}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            {isOptimized ? <OptimizedBadge /> : null}
            <EatSymbolIcon
              width={18}
              height={18}
              color={Color.neutralTagColor}
            />
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
            <SolidFireIcon
              width={18}
              height={18}
              color={Color.neutralTagColor}
            />
            <Text style={styles.captionTypo}>{calories}</Text>
          </View>
        </View>
      </Pressable>
      <AddIconButton
        containerStyle={styles.rightClickContainer}
        accessibilityLabel="Add meal"
        onPress={onAddPress}
      />
    </View>
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
    paddingRight: 8,
    paddingVertical: 12,
    gap: 4,
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
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightClickContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 13,
    alignSelf: "stretch",
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
});

export default AddMealRow;
