import { useFocusEffect, useRouter } from "expo-router";
import * as React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import SearchBar from "@/components/searchBar";
import { Padding } from "@/constants/GlobalStyles";
import { useRecipeDraft, useRecipeDraftActions } from "@/hooks/useRecipeDraft";
import { addRecentLebensmittel, addRecentRecipe } from "@/utils/recentItems";
import { type RecipeItem } from "@/utils/recipeHelpers";
import { supabase } from "@/utils/supabase";

type LebensmittelItem = {
  id: string | number;
  title: string;
  portion: string;
  calories: string;
};

export default function HinzuOverviewScreen() {
  const router = useRouter();
  const searchBarRef = React.useRef<TextInput>(null);
  const isFirstFocus = React.useRef(true);
  const isReturning = React.useRef(false);
  const [activeSide, setActiveSide] = React.useState<"Rezept" | "Lebensmittel">(
    "Lebensmittel"
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<LebensmittelItem[]>(
    []
  );
  const { ingredients } = useRecipeDraft();
  const { addIngredient } = useRecipeDraftActions();

  // Search function for Lebensmittel
  React.useEffect(() => {
    const searchFoods = async () => {
      if (activeSide !== "Lebensmittel" || !searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const trimmedQuery = searchQuery.trim();
        const { data, error } = await supabase
          .from("opennutrition_foods")
          .select("id, name, calories")
          .ilike("name", `%${trimmedQuery}%`)
          .limit(100); // Fetch more results to allow better sorting

        if (error) {
          console.error("Error searching foods:", error);
          setSearchResults([]);
        } else {
          // Sort results by relevance:
          // 1. Exact match (case-insensitive) first
          // 2. Then by length difference (closer to search query length = higher priority)
          // 3. Then alphabetically as tiebreaker
          const sortedData = (data || []).sort((a, b) => {
            const aName = a.name || "";
            const bName = b.name || "";
            const queryLower = trimmedQuery.toLowerCase();
            const aNameLower = aName.toLowerCase();
            const bNameLower = bName.toLowerCase();

            // Priority 1: Exact match (case-insensitive)
            const aExactMatch = aNameLower === queryLower;
            const bExactMatch = bNameLower === queryLower;
            if (aExactMatch && !bExactMatch) return -1;
            if (!aExactMatch && bExactMatch) return 1;

            // Priority 2: Length difference (closer to query length = better)
            const queryLength = trimmedQuery.length;
            const aLengthDiff = Math.abs(aName.length - queryLength);
            const bLengthDiff = Math.abs(bName.length - queryLength);
            if (aLengthDiff !== bLengthDiff) {
              return aLengthDiff - bLengthDiff;
            }

            // Priority 3: Alphabetical order
            return aName.localeCompare(bName);
          });

          // Take top 50 after sorting
          const topResults = sortedData.slice(0, 20);

          // Transform the data to match the expected format
          const transformedResults = topResults.map(food => ({
            id: food.id,
            title: food.name,
            portion: "100 g",
            calories: food.calories
              ? `${Math.round(food.calories)} kcal`
              : "0 kcal",
          }));
          setSearchResults(transformedResults);
        }
      } catch (error) {
        console.error("Error searching foods:", error);
        setSearchResults([]);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(() => {
      searchFoods();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeSide]);

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side === "left" ? "Rezept" : "Lebensmittel");
    // Clear search when switching sides
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleAddIngredient = (item: LebensmittelItem) => {
    // Dismiss keyboard when item is clicked
    Keyboard.dismiss();

    // Avoid duplicates by id where possible
    const alreadyAdded = ingredients.some(
      existing => existing.id === String(item.id)
    );
    if (alreadyAdded) {
      return;
    }

    addIngredient({
      id: String(item.id),
      title: item.title,
      portion: item.portion,
      calories: item.calories,
    });

    // Track as recently used Lebensmittel (fire-and-forget)
    addRecentLebensmittel({
      id: item.id,
      title: item.title,
      portion: item.portion,
      calories: item.calories,
    }).catch(error =>
      console.error("Error adding recent Lebensmittel item", error)
    );
  };

  const handleAddRecipe = (item: RecipeItem) => {
    // Dismiss keyboard when item is clicked
    Keyboard.dismiss();

    const itemId = `recipe:${item.id}`;
    const alreadyAdded = ingredients.some(existing => existing.id === itemId);
    if (alreadyAdded) return;

    addIngredient({
      id: itemId,
      title: item.title,
      portion: "1 Portion",
      calories: item.calories,
    });

    addRecentRecipe({
      id: item.id,
      title: item.title,
      ingredients: item.ingredients,
      calories: item.calories,
      isOptimized: item.isOptimized,
    }).catch(error => console.error("Error adding recent recipe item", error));
  };

  // Blur search bar and clear search query when screen comes into focus (e.g., when returning from detail screen)
  useFocusEffect(
    React.useCallback(() => {
      // Only clear search on subsequent focus events (not on initial mount)
      if (!isFirstFocus.current) {
        // Mark that we're handling this focus event
        const wasReturning = true;
        
        // Use a small delay to clear search query after navigation transition
        const timeoutId = setTimeout(() => {
          // Clear search query and results
          setSearchQuery("");
          setSearchResults([]);
        }, 100);

        return () => clearTimeout(timeoutId);
      }
      isFirstFocus.current = false;
    }, [])
  );

  // Use layout effect to dismiss keyboard synchronously before render when returning
  React.useLayoutEffect(() => {
    if (!isFirstFocus.current) {
      // Dismiss keyboard and blur immediately - this runs before render
      Keyboard.dismiss();
      searchBarRef.current?.blur();
    }
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar
          ref={searchBarRef}
          placeholder={
            activeSide === "Rezept" ? "Rezept suchen" : "Lebensmittel suchen"
          }
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <LeftRightToggle
          leftLabel="Rezepte"
          rightLabel="Lebensmittel"
          onToggle={handleToggle}
          initialValue="right"
        />
      </View>
      <ScrollView
        style={styles.outerContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <RezSelectionAndFilterComponent
          activeSide={activeSide}
          searchResults={
            activeSide === "Lebensmittel" && searchQuery.trim()
              ? searchResults
              : undefined
          }
          onAddIngredient={handleAddIngredient}
          onAddRecipe={handleAddRecipe}
        />
      </ScrollView>
      <NextButton
        text="Fertig"
        badge={ingredients.length > 0 ? ingredients.length : undefined}
        onPress={() => router.back()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  outerContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: Padding.padding_next_button,
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});
