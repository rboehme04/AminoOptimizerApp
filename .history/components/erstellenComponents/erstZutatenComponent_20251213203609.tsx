import { CloseXIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
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
      <Pressable style={styles.leftOuterContainer} onPress={() => {}}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
        <Text style={styles.kcalText}>{ingredient.calories}</Text>
      </Pressable>
      <View style={styles.rightContainer}>
        <Pressable style={styles.removeClickContainer} onPress={onPress}>
          <View style={styles.closexContainer}>
            <CloseXIcon size={16} color={Color.neutralTextOrTabGrey} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const ZutatenContainer = () => {
  const router = useRouter();
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
        <View style={styles.listContainer}>
          {ingredients.map(ingredient => (
            <IngredientRow key={ingredient.id} ingredient={ingredient} />
          ))}
        </View>
        <Pressable
          style={styles.addButtonContainer}
          onPress={() => {
            router.push("/HinzuOverview");
          }}
        >
          <AddCircleOutlineIcon
            size={24}
            color={Color.brand40LetzteButtonOrBlueText}
          />
          <Text style={styles.addButtonText}>Hinzufügen</Text>
        </Pressable>
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
  ingredientsContainer: {},
  listContainer: {
    paddingLeft: 8,
    paddingRight: 4,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftOuterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftInnerContainer: {
    flex: 1,
  },
  ingredientName: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  ingredientAmount: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
  kcalText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    textAlign: "left",
  },
  removeClickContainer: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  closexContainer: {
    height: 24,
    width: 24,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.neutralStrokeColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 8,
  },
  addButtonText: {
    ...Typography.subheadlineRegular,
    color: Color.brand40LetzteButtonOrBlueText,
  },
});

export default ZutatenContainer;
