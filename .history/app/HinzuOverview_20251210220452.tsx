import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar placeholder="Rezept suchen" />
        <LeftRightToggle leftLabel="Rezepte" rightLabel="Lebensmittel" />
      </View>
      <View style={styles.outerContainer}>
        <RezSelectionAndFilterComponent />
        <View style={styles.mealRowsContainer}>
            <AddMealRow />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  outerContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingBottom: 106,
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});
