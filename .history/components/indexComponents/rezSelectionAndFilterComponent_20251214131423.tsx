import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import { Color, Gap, Typography } from "@/constants/GlobalStyles";

type RecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
};

const RezSelectionAndFilterComponent = () => {
  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");

  // Placeholder data - will be replaced with database fetch in the future
  const recentRecipes = useMemo<RecipeItem[]>(
    () => [
      {
        id: 1,
        title: "Frühstücks Bowl",
        ingredients: "Banane, Haferflocken, Blaubeeren",
        calories: "555 kcal",
      },
      {
        id: 2,
        title: "Protein Smoothie",
        ingredients: "Whey Protein, Banane, Milch",
        calories: "320 kcal",
      },
      {
        id: 3,
        title: "Avocado Toast",
        ingredients: "Avocado, Vollkornbrot, Ei",
        calories: "420 kcal",
      },
    ],
    []
  );

  // Placeholder data - will be replaced with database fetch in the future
  const favoriteRecipes = useMemo<RecipeItem[]>(() => [], []);

  const displayedRecipes =
    selection === "letzte" ? recentRecipes : favoriteRecipes;
  const hasNoFavorites =
    selection === "favoriten" && favoriteRecipes.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.sortierungContainer}>
        <Pressable
          style={styles.clickContainer}
          onPress={() => setSelection("letzte")}
        >
          <View
            style={[
              styles.badge,
              selection === "letzte"
                ? styles.badgeSelected
                : styles.badgeUnselected,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                selection === "letzte" && styles.badgeTextSelected,
              ]}
            >
              Letzte
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.clickContainer}
          onPress={() => setSelection("favoriten")}
        >
          <View
            style={[
              styles.badge,
              selection === "favoriten"
                ? styles.badgeSelected
                : styles.badgeUnselected,
            ]}
          >
            {selection === "favoriten" ? (
              <View style={styles.starFullContainer}>
                <StarFullIcon
                  size={14}
                  color={Color.neutralBackgroundDarkElevated}
                />
              </View>
            ) : (
              <StarLineIcon color={Color.neutralWhite} />
            )}
            <Text
              style={[
                styles.badgeText,
                selection === "favoriten" && styles.badgeTextSelected,
              ]}
            >
              Favoriten
            </Text>
          </View>
        </Pressable>
      </View>
      {hasNoFavorites ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Keine Favoriten gefunden</Text>
        </View>
      ) : (
        <View style={styles.recipesContainer}>
          {displayedRecipes.map(recipe => (
            <AddMealRow
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  sortierungContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  clickContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: Gap.gap_8,
  },
  badgeSelected: {
    backgroundColor: Color.brand50GraphicsOrBrandButton,
  },
  badgeUnselected: {
    backgroundColor: Color.neutralInputOnDark,
  },
  badgeText: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
  badgeTextSelected: {
    color: Color.neutralBackgroundDark,
  },
  starFullContainer: {
    paddingRight: 2,
  },
  recipesContainer: {
    gap: 10,
  },
  emptyStateContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
});

export default RezSelectionAndFilterComponent;
