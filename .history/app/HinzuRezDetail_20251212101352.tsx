import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";

export default function HinzuRezDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RecipeDetailTopComponent isOptimized={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
 inner+

});

