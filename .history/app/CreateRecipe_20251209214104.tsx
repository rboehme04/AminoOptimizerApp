import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Color, Typography } from "@/constants/GlobalStyles";
import NavBar from "@/components/navBar";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingBottom: 106,
  },
});
