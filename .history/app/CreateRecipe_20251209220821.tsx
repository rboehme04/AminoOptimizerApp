import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Color, Typography } from "@/constants/GlobalStyles";
import NavBar from "@/components/navBar";
import OptimizerNavBar from "@/components/indexComponents/optimizerNavBar";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept erstellen"/>
      <OptimizerNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
