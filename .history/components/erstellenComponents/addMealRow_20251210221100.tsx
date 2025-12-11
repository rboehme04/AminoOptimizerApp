import { EatSymbolIcon, SolidFireIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Add Icon (plus sign)
const AddIcon = ({
  color = Color.neutralWhite,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type AddMealRowProps = {
  title?: string;
  ingredients?: string;
  calories?: string;
  onPress?: () => void;
  onAddPress?: () => void;
};

const AddMealRow = ({
  title = "Frühstücks Bowl",
  ingredients = "Banane, Haferflocken, Blaubeeren, Heidelbeeren",
  calories = "555 kcal",
  onPress = () => {},
  onAddPress = () => {},
}: AddMealRowProps) => {
  return (
    <Pressable style={styles.mealRow} onPress={onPress}>
      <View style={styles.leftClickContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            <EatSymbolIcon width={18} height={18} color={Color.neutralT}/>
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
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={onAddPress}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <View style={styles.addButton}>
          <AddIcon size={24} color={Color.neutralWhite} />
        </View>
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
    paddingLeft: 8,
    paddingRight: 12,
    alignSelf: "stretch",
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.neutralStrokeColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddMealRow;
