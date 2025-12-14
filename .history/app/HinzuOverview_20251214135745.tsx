import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import SearchBar from "@/components/searchBar";
import { Padding } from "@/constants/GlobalStyles";

export default function HinzuOverviewScreen() {
  const [activeSide, setActiveSide] = React.useState<"Rezept" | "Lebensmittel">(
    "Lebensmittel"
  );

  // Placeholder data - will be replaced with database fetch in the future
  const meals = React.useMemo(
    () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    []
  );

  const lebensmittel = React.useMemo(
    () => [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    []
  );

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side === "left" ? "Rezept" : "Lebensmittel");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar
          placeholder={
            activeSide === "Rezept" ? "Rezept suchen" : "Lebensmittel suchen"
          }
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
        keyboardDismissMode="on-drag"
      >
        <RezSelectionAndFilterComponent activeSide={activeSide} />
      </ScrollView>
      <NextButton text="Fertig" badge={2} />
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
