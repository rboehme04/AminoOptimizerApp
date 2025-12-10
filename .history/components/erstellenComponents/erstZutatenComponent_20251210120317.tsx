import {
  Color,
  Gap,
  Height,
  Padding,
  Typography,
  Width,
} from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Simple Add Icon (plus sign)
const AddIcon = ({
  color = Color.neutralWhite,
  size = 16,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 3V13M3 8H13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Add Circle Outline Icon
const AddCircleOutlineIcon = ({
  color = Color.brand40LetzteButtonOrBlueText,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 8V16M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  calories: string;
}

interface IngredientRowProps {
  ingredient: Ingredient;
  onPress?: () => void;
}

const IngredientRow = ({ ingredient, onPress }: IngredientRowProps) => {
  return (
    <View style={styles.ingredientRow}>
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
      </View>
      <View style={styles.ingredientActions}>
        <Text style={styles.caloriesText}>{ingredient.calories}</Text>
        <Pressable style={styles.addButton} onPress={onPress}>
          <AddIcon size={16} color={Color.neutralWhite} />
        </Pressable>
      </View>
    </View>
  );
};

const ZutatenContainer = () => {
  const [ingredients] = React.useState<Ingredient[]>([
    {
      id: "1",
      name: "Banane",
      amount: "1 Frucht, mittelgroß (150g)",
      calories: "140 kcal",
    },
    {
      id: "2",
      name: "Haferflocken",
      amount: "50g",
      calories: "187 kcal",
    },
    {
      id: "3",
      name: "Milch",
      amount: "200ml",
      calories: "96 kcal",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Zutaten</Text>
      <View style={styles.ingredientsContainer}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  headerText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  ingredientsContainer: {
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Gap.gap_8,
    paddingRight: 4,
  },
  ingredientInfo: {
    flex: 1,
    gap: 0,
  },
  ingredientName: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    textAlign: "left",
  },
  ingredientAmount: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "left",
  },
  ingredientActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Gap.gap_8,
  },
  caloriesText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    textAlign: "left",
  },
  addButton: {
    height: Height.height_24,
    width: Width.width_24,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray,
    borderWidth: 1,
    padding: Padding.padding_16,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonLarge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Gap.gap_8,
    paddingVertical: 10,
    gap: Gap.gap_8,
  },
  addButtonText: {
    ...Typography.subheadlineRegular,
    color: Color.brand40LetzteButtonOrBlueText,
    textAlign: "center",
  },
});

export default ZutatenContainer;
