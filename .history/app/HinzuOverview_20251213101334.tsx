import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import LeftRightToggle from "@/components/leftRightToggle";
import NavBar from "@/components/navBar";
import SearchBar from "@/components/searchBar";
import AddMealRow from "@/components/erstellenComponents/addMealRow";
import AddLebensmittelRow from "@/components/erstellenComponents/addLebRow";
import NextButton from "@/components/nextButton";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar placeholder="Rezept suchen" />
        <LeftRightToggle leftLabel="Rezepte" rightLabel="Lebensmittel" />
      </View>
      <ScrollView style={styles.outerContainer}>
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
  container: {flex: 1},
  headerContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  outerContainer: {
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 106,
    paddingHorizontal: 8,
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});
