import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import AddLebensmittelRow from "@/components/erstellenComponents/addLebRow";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import { Color, Gap, Typography } from "@/constants/GlobalStyles";

type RecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
};

type LebensmittelItem = {
  id: number;
  title: string;
  portion: string;
  calories: string;
};

type RezSelectionAndFilterComponentProps = {
  activeSide: "left" | "right";
};

const RezSelectionAndFilterComponent = ({
  activeSide,
}: RezSelectionAndFilterComponentProps) => {
  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");

  // Placeholder data for recipes - will be replaced with database fetch in the future
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

  // Placeholder data for recipes - will be replaced with database fetch in the future
  const favoriteRecipes = useMemo<RecipeItem[]>(() => [], []);

  // Placeholder data for Lebensmittel - will be replaced with database fetch in the future
  const recentLebensmittel = useMemo<LebensmittelItem[]>(
    () => [
      {
        id: 1,
        title: "Apfel (mit Schale), frisch",
        portion: "1 Frucht, mittelgroß",
        calories: "52 kcal",
      },
      {
        id: 2,
        title: "Banane, frisch",
        portion: "1 Frucht, mittelgroß",
        calories: "89 kcal",
      },
      {
        id: 3,
        title: "Hähnchenbrust, gebraten",
        portion: "100 g",
        calories: "165 kcal",
      },
    ],
    []
  );

  // Placeholder data for Lebensmittel - will be replaced with database fetch in the future
  const favoriteLebensmittel = useMemo<LebensmittelItem[]>(() => [], []);

  const displayedRecipes =
    selection === "letzte" ? recentRecipes : favoriteRecipes;
  const displayedLebensmittel =
    selection === "letzte" ? recentLebensmittel : favoriteLebensmittel;

  const hasNoFavorites =
    activeSide === "left"
      ? selection === "favoriten" && favoriteRecipes.length === 0
      : selection === "favoriten" && favoriteLebensmittel.length === 0;

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
        <View style={styles.itemsContainer}>
          {activeSide === "left"
            ? displayedRecipes.map(recipe => (
                <AddMealRow
                  key={recipe.id}
                  title={recipe.title}
                  ingredients={recipe.ingredients}
                  calories={recipe.calories}
                />
              ))
            : displayedLebensmittel.map(item => (
                <AddLebensmittelRow
                  key={item.id}
                  title={item.title}
                  portion={item.portion}
                  calories={item.calories}
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
  itemsContainer: {
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
