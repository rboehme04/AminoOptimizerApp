import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { StarFullIcon, StarLineIcon } from "@/assets/icons/icons";
import AddLebensmittelRow from "@/components/erstellenComponents/addLebRow";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import MealRow from "@/components/indexComponents/mealRow";
import { Color, Gap, Typography } from "@/constants/GlobalStyles";

type RecipeItem = {
  id: number;
  title: string;
  ingredients: string;
  calories: string;
  isOptimized: boolean;
};

type LebensmittelItem = {
  id: string | number;
  title: string;
  portion: string;
  calories: string;
};

type RezSelectionAndFilterComponentProps =
  | {
      isOptimizerHome: true;
      activeSide?: "Rezept" | "Lebensmittel";
      searchResults?: LebensmittelItem[];
    }
  | {
      isOptimizerHome?: false;
      activeSide: "Rezept" | "Lebensmittel";
      searchResults?: LebensmittelItem[];
    };

const RezSelectionAndFilterComponent = (
  props: RezSelectionAndFilterComponentProps
) => {
  const isOptimizerHome = props.isOptimizerHome ?? false;
  const effectiveActiveSide: "Rezept" | "Lebensmittel" = isOptimizerHome
    ? "Rezept"
    : props.activeSide ?? "Rezept";
  const searchResults = props.searchResults;

  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");
  const showingFavorites = selection === "favoriten";

  const recentItems = useRecentItems(effectiveActiveSide);
  const favoriteItems = useFavoriteItems(effectiveActiveSide);

  const displayedItems = searchResults
    ? searchResults
    : showingFavorites
    ? favoriteItems
    : recentItems;

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
}: {
  activeSide: "Rezept" | "Lebensmittel";
  isOptimizerHome: boolean;
  items: RecipeItem[] | LebensmittelItem[];
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
        />
      ))}
    </View>
  );
};

const useRecentItems = (activeSide: "Rezept" | "Lebensmittel") =>
  useMemo(() => {
    if (activeSide === "Rezept") {
      return [
        {
          id: 1,
          title: "Frühstücks Bowl",
          ingredients: "Banane, Haferflocken, Blaubeeren",
          calories: "555 kcal",
          isOptimized: false,
        },
        {
          id: 2,
          title: "Protein Smoothie",
          ingredients: "Whey Protein, Banane, Milch",
          calories: "320 kcal",
          isOptimized: true,
        },
        {
          id: 3,
          title: "Avocado Toast",
          ingredients: "Avocado, Vollkornbrot, Ei",
          calories: "420 kcal",
          isOptimized: true,
        },
      ] as RecipeItem[];
    }

    return [
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
    ] as LebensmittelItem[];
  }, [activeSide]);

const useFavoriteItems = (activeSide: "Rezept" | "Lebensmittel") =>
  useMemo(() => {
    if (activeSide === "Rezept") {
      return [] as RecipeItem[];
    }

    return [] as LebensmittelItem[];
  }, [activeSide]);

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
