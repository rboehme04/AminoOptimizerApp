import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";
import HinzuRezAmountInput from "@/components/erstellenComponents/hinzuRezAmountInput";
import HinzufügenButton from "@/components/erstellenComponents/hinzufügenButton";

export default function HinzuRezDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RecipeDetailTopComponent isOptimized={true} />
      <View style={styles.innerContainer}>
        <HinzuRezAmountInput />
        <HinzufügenButton />
        <View style={styles.dropDownsContainer}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
 innerContainer: {
  paddingHorizontal: 16,
  gap: 16,
 },
 
});

