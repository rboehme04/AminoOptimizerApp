import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <NavBar title="Rezept erstellen" isBold={true} isBackButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
