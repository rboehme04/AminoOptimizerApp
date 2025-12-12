import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import RecipeDetailTopComponent from "@/components/recipeDetailTopComponent";

export default function HinzuRezDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RecipeDetailTopComponent />
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});

