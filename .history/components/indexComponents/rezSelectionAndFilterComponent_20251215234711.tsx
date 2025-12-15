import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import AddLebensmittelRow from "@/components/erstellenComponents/addLebRow";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import MealRow from "@/components/indexComponents/mealRow";
import { Color, Gap, Typography } from "@/constants/GlobalStyles";
import { getFavoriteLebensmittel, getFavoriteRecipes } from "@/utils/favorites";
import {
  getRecentLebensmittel,
  getRecentRecipes,
  RecentLebensmittelItem,
  RecentRecipeItem,
} from "@/utils/recentItems";
import { getAllRecipesOrderedByCreatedDesc, RecipeRow } from "@/utils/sqlite";

type RecipeItem = RecentRecipeItem;
type LebensmittelItem = RecentLebensmittelItem;

type RezSelectionAndFilterComponentProps =
  | {
      isOptimizerHome: true;
      activeSide?: "Rezept" | "Lebensmittel";
      searchResults?: LebensmittelItem[];
      onAddIngredient?: (item: LebensmittelItem) => void;
    }
  | {
      isOptimizerHome?: false;
      activeSide: "Rezept" | "Lebensmittel";
      searchResults?: LebensmittelItem[];
      onAddIngredient?: (item: LebensmittelItem) => void;
    };

const RezSelectionAndFilterComponent = (
  props: RezSelectionAndFilterComponentProps
) => {
  const isOptimizerHome = props.isOptimizerHome ?? false;
  const effectiveActiveSide: "Rezept" | "Lebensmittel" = isOptimizerHome
    ? "Rezept"
    : props.activeSide ?? "Rezept";
  const searchResults = props.searchResults;
  const onAddIngredient = props.onAddIngredient;

  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");
  const showingFavorites = selection === "favoriten";

  const recentItems = useRecentItems(effectiveActiveSide);
  const homeRecipes = useHomeRecipes(isOptimizerHome);
  const favoriteItems = useFavoriteItems(effectiveActiveSide);

  let displayedItems: RecipeItem[] | LebensmittelItem[];

  if (searchResults) {
    displayedItems = searchResults;
  } else if (showingFavorites) {
    displayedItems = favoriteItems;
  } else if (isOptimizerHome && effectiveActiveSide === "Rezept") {
    // Optimizer home, "Letzte" selected: show all stored recipes ordered by creation date
    displayedItems = homeRecipes;
  } else {
    displayedItems = recentItems;
  }

  const hasNoFavorites =
    !searchResults && showingFavorites && favoriteItems.length === 0;
  const hasNoSearchResults =
    searchResults !== undefined && searchResults.length === 0;

  return (
    <View style={styles.container}>
      {!searchResults && (
        <SelectionToggle selection={selection} onSelect={setSelection} />
      )}

      {hasNoFavorites ? (
        <EmptyState>
          Deine Favoriten sind noch leer. Tippe auf den Stern, um Rezepte oder
          Lebensmittel hinzuzufügen.
        </EmptyState>
      ) : hasNoSearchResults ? (
        <EmptyState>
          Keine Lebensmittel gefunden. Versuche es mit einer anderen Suche.
        </EmptyState>
      ) : (
        <ItemList
          activeSide={effectiveActiveSide}
          isOptimizerHome={isOptimizerHome}
          items={displayedItems}
          onAddIngredient={onAddIngredient}
        />
      )}
    </View>
  );
};

const SelectionToggle = ({
  selection,
  onSelect,
}: {
  selection: "letzte" | "favoriten";
  onSelect: (next: "letzte" | "favoriten") => void;
}) => {
  return (
    <View style={styles.sortierungContainer}>
      <Badge
        label="Letzte"
        isSelected={selection === "letzte"}
        onPress={() => onSelect("letzte")}
        icon={null}
      />
      <Badge
        label="Favoriten"
        isSelected={selection === "favoriten"}
        onPress={() => onSelect("favoriten")}
        icon={
          selection === "favoriten" ? (
            <View style={styles.starFullContainer}>
              <StarFullIcon
                size={14}
                color={Color.neutralBackgroundDarkElevated}
              />
            </View>
          ) : (
            <StarLineIcon color={Color.neutralWhite} />
          )
        }
      />
    </View>
  );
};

const Badge = ({
  label,
  isSelected,
  onPress,
  icon,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) => (
  <Pressable style={styles.clickContainer} onPress={onPress}>
    <View
      style={[
        styles.badge,
        isSelected ? styles.badgeSelected : styles.badgeUnselected,
      ]}
    >
      {icon}
      <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
        {label}
      </Text>
    </View>
  </Pressable>
);

const EmptyState = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.emptyStateText}>{children}</Text>
  </View>
);

const ItemList = ({
  activeSide,
  isOptimizerHome,
  items,
  onAddIngredient,
}: {
  activeSide: "Rezept" | "Lebensmittel";
  isOptimizerHome: boolean;
  items: RecipeItem[] | LebensmittelItem[];
  onAddIngredient?: (item: LebensmittelItem) => void;
}) => {
  if (activeSide === "Rezept") {
    return (
      <View style={styles.itemsContainer}>
        {(items as RecipeItem[]).map(recipe =>
          isOptimizerHome ? (
            <MealRow
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
              isOptimized={recipe.isOptimized}
            />
          ) : (
            <AddMealRow
              key={recipe.id}
              title={recipe.title}
              ingredients={recipe.ingredients}
              calories={recipe.calories}
              isOptimized={recipe.isOptimized}
            />
          )
        )}
      </View>
    );
  }

  return (
    <View style={styles.itemsContainer}>
      {(items as LebensmittelItem[]).map(item => (
        <AddLebensmittelRow
          key={item.id}
          itemId={item.id}
          title={item.title}
          portion={item.portion}
          calories={item.calories}
          onAddPress={onAddIngredient ? () => onAddIngredient(item) : undefined}
        />
      ))}
    </View>
  );
};

const useRecentItems = (activeSide: "Rezept" | "Lebensmittel") => {
  const [items, setItems] = useState<RecipeItem[] | LebensmittelItem[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        if (activeSide === "Rezept") {
          const recentRecipes = await getRecentRecipes();
          if (!isCancelled) {
            setItems(recentRecipes);
          }
        } else {
          const recentLebensmittel = await getRecentLebensmittel();
          if (!isCancelled) {
            setItems(recentLebensmittel);
          }
        }
      } catch (error) {
        console.error("Error loading recent items", error);
        if (!isCancelled) {
          setItems([]);
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [activeSide]);

  return items;
};

const mapRecipeRowToItem = (row: RecipeRow): RecipeItem => {
  let ingredientsSummary = "";
  let totalCalories = 0;

  try {
    const parsed = JSON.parse(row.ingredients_json) as Array<{
      title?: string;
      calories?: string;
    }>;
    if (Array.isArray(parsed)) {
      // Extract ingredient titles for summary
      ingredientsSummary = parsed
        .map(ingredient => ingredient.title)
        .filter(Boolean)
        .join(", ");

      // Calculate total calories from all ingredients
      parsed.forEach(ingredient => {
        if (ingredient.calories) {
          // Parse calories string like "100 kcal" or "100"
          const caloriesStr = ingredient.calories.trim();
          // Extract numeric value (remove "kcal" if present)
          const match = caloriesStr.match(/^(\d+(?:\.\d+)?)/);
          if (match) {
            const caloriesValue = parseFloat(match[1]);
            if (!isNaN(caloriesValue)) {
              totalCalories += caloriesValue;
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error parsing ingredients_json for recipe", error);
  }

  // Format calories as "X kcal" (round to nearest integer)
  const caloriesDisplay = `${Math.round(totalCalories)} kcal`;

  return {
    id: row.id,
    title: row.title,
    ingredients: ingredientsSummary,
    calories: caloriesDisplay,
    isOptimized: false,
  };
};

const useHomeRecipes = (enabled: boolean) => {
  const [items, setItems] = useState<RecipeItem[]>([]);

  const load = useCallback(async () => {
    try {
      const rows = await getAllRecipesOrderedByCreatedDesc();
      setItems(rows.map(mapRecipeRowToItem));
    } catch (error) {
      console.error("Error loading recipes for home view", error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    load();
  }, [enabled, load]);

  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;
      load();
    }, [enabled, load])
  );

  return items;
};

const useFavoriteItems = (activeSide: "Rezept" | "Lebensmittel") => {
  const [items, setItems] = useState<RecipeItem[] | LebensmittelItem[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        if (activeSide === "Rezept") {
          const favoriteRecipes = await getFavoriteRecipes();
          if (!isCancelled) {
            setItems(favoriteRecipes);
          }
        } else {
          const favoriteLebensmittel = await getFavoriteLebensmittel();
          if (!isCancelled) {
            setItems(favoriteLebensmittel);
          }
        }
      } catch (error) {
        console.error("Error loading favorite items", error);
        if (!isCancelled) {
          setItems([]);
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [activeSide]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          if (activeSide === "Rezept") {
            const favoriteRecipes = await getFavoriteRecipes();
            setItems(favoriteRecipes);
          } else {
            const favoriteLebensmittel = await getFavoriteLebensmittel();
            setItems(favoriteLebensmittel);
          }
        } catch (error) {
          console.error("Error loading favorite items", error);
          setItems([]);
        }
      };

      load();
    }, [activeSide])
  );

  return items;
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
    paddingVertical: 10,
    paddingHorizontal: 48,
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
