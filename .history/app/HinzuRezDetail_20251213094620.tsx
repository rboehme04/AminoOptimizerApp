import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import DetailsNaehstoffprofilComponent from "@/components/detailsNaehstoffprofilComponent";
import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown from "@/components/zutatenDropDown";
import { Color, Typography } from "@/constants/GlobalStyles";

export default function HinzuRezDetailScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
      >
        <RecipeDetailTopComponent isOptimized={true} />
        <View style={styles.innerContainer}>
          <HinzuRezAmountInput />
          <HinzufügenButton />
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown />
            <ZubereitungDropDown isExpanded={false} />
            <DetailsNaehstoffprofilComponent />
            <View style={styles.rezLoeschenOuterContainer}>
              <View style={styles.rezLoeschenInnerContainer}>
                <Text style={styles.rezLoeschenLabel}>Rezept löschen?</Text>
                <Text style={styles.rezLoeschenText}>löschen</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  innerContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  dropDownsContainer: {
    paddingHorizontal: 16,
  },
  rezLoeschenOuterContainer: {
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "red",
  },
  rezLoeschenInnerContainer: {
    flexWrap: "wrap",
    // alignSelf: "center",
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: "blue",
  },
  rezLoeschenLabel: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  rezLoeschenText: {
    ...Typography.subheadlineRegular,
    color: Color.destructive50,
  },
});
