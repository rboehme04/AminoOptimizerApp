import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddLebensmittelRow from "@/components/erstellenComponents/addLebRow";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import SearchBar from "@/components/searchBar";
import { Padding } from "@/constants/GlobalStyles";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar placeholder="Rezept suchen" />
        <LeftRightToggle leftLabel="Rezepte" rightLabel="Lebensmittel" />
      </View>
      <ScrollView
        style={styles.outerContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <RezSelectionAndFilterComponent />
        <View style={styles.mealRowsContainer}>
          <AddMealRow />
          <AddLebensmittelRow />
          <AddMealRow />
          <AddLebensmittelRow />
          <AddMealRow />
          <AddLebensmittelRow />
          <AddMealRow />
          <AddLebensmittelRow />
          <AddMealRow />
          <AddLebensmittelRow />
          <AddMealRow />
          <AddLebensmittelRow />
        </View>
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
    backgroundColor: "red",
  },
  scrollContent: {
    paddingTop: 8,
    paddingHorizontal: 8,
    
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});
