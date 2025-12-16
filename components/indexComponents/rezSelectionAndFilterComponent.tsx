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
import {
  calculateRecipeNutrition,
  getKeyMacros,
  type RecipeIngredient,
} from "@/utils/recipeNutrition";
import {
  getAllRecipesOrderedByCreatedDesc,
  getRecipeById,
  RecipeRow,
} from "@/utils/sqlite";
import { mapRecipeRowToItem, type RecipeItem } from "@/utils/recipeHelpers";

// RecipeItem is now imported from recipeHelpers
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
        {(items as RecipeItem[]).map(recipe => (
          <RecipeRowWithMacros
            key={recipe.id}
            recipe={recipe}
            isOptimizerHome={isOptimizerHome}
          />
        ))}
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


// Component to load and display macros for a recipe row
const RecipeRowWithMacros = ({
  recipe,
  isOptimizerHome,
}: {
  recipe: RecipeItem;
  isOptimizerHome: boolean;
}) => {
  const [macros, setMacros] = useState<{
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  useEffect(() => {
    // Load macros from database
    const loadMacros = async () => {
      try {
        const recipeRow = await getRecipeById(recipe.id);
        if (!recipeRow) return;

        if (recipeRow.nutrition_json) {
          try {
            const nutrition = JSON.parse(recipeRow.nutrition_json) as Record<
              string,
              number
            >;
            const keyMacros = getKeyMacros(nutrition);
            setMacros(keyMacros);
            return;
          } catch (error) {
            console.error("Error parsing stored nutrition", error);
          }
        }

        // Fallback: calculate if nutrition not stored
        const parsedIngredients = JSON.parse(
          recipeRow.ingredients_json
        ) as RecipeIngredient[];

        const nutrition = await calculateRecipeNutrition(parsedIngredients);
        const keyMacros = getKeyMacros(nutrition);
        setMacros(keyMacros);

        // Store calculated nutrition for future use
        const { updateRecipeNutrition } = await import("@/utils/sqlite");
        updateRecipeNutrition(recipeRow.id, nutrition).catch(console.error);
      } catch (error) {
        console.error("Error loading macros for recipe", error);
      }
    };

    loadMacros();
  }, [recipe.id]);

  if (isOptimizerHome) {
    return (
      <MealRow
        recipeId={recipe.id}
        title={recipe.title}
        ingredients={recipe.ingredients}
        calories={recipe.calories}
        isOptimized={recipe.isOptimized}
        macros={macros}
      />
    );
  }

  return (
    <AddMealRow
      recipeId={recipe.id}
      title={recipe.title}
      ingredients={recipe.ingredients}
      calories={recipe.calories}
      isOptimized={recipe.isOptimized}
      macros={macros}
    />
  );
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
