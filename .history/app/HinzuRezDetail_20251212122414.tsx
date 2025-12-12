import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import ZubereitungDropDown from "@/components/zubereitungDropDown";
import ZutatenDropDown from "@/components/zutatenDropDown";

export default function HinzuRezDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <RecipeDetailTopComponent isOptimized={true} />
        <View style={styles.innerContainer}>
          <HinzuRezAmountInput />
          <HinzufügenButton />
          <View style={styles.dropDownsContainer}>
            <ZutatenDropDown />
            <ZubereitungDropDown isExpanded={false} />
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
    gap: 12,
  },
});
