import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  calories: string;
}

interface IngredientRowProps {
  ingredient: Ingredient;
}

type Props = {
  isExpanded?: boolean;
};

const IngredientRow = ({ ingredient }: IngredientRowProps) => {
  return (
    <View style={styles.ingredientRow}>
      <View style={styles.leftContainer}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.kcalText}>{ingredient.calories}</Text>
      </View>
    </View>
  );
};

const ZutatenDropDown = ({ isExpanded = true }: Props) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const rotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const ingredients: Ingredient[] = [
    {
      id: "1",
      name: "Kuhmilch 3,5% Fett",
      amount: "200ml",
      calories: "130 kcal",
    },
    {
      id: "2",
      name: "Banane",
      amount: "1 Frucht, mittelgroß (150g)",
      calories: "143 kcal",
    },
    {
      id: "3",
      name: "Haferflocken",
      amount: "50g",
      calories: "177 kcal",
    },
  ];

  // Rotate the chevron when expanded or collapsed
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  // Interpolate the rotation value to the chevron
  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => setExpanded(prev => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <Text style={styles.labelText}>Zutaten</Text>
        <Animated.View style={[styles.chevron, { transform: [{ rotate }] }]}>
          <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
        </Animated.View>
      </Pressable>
      <View
        style={[
          styles.itemsContainer,
          !expanded && styles.itemsContainerHidden,
        ]}
      >
        {ingredients.map(ingredient => (
          <IngredientRow key={ingredient.id} ingredient={ingredient} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padd
  },
  labelContainer: {
    height: 44,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  labelText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  chevron: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {},
  itemsContainer: {
    paddingHorizontal: 8,
    gap: 8,
  },
  itemsContainerHidden: {
    display: "none",
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    paddingRight: 8,
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
    paddingLeft: 8,
  },
  kcalText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});

export default ZutatenDropDown;
