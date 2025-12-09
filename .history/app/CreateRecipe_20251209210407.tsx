import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Color, Typography } from "@/constants/GlobalStyles";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Recipe</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    paddingHorizontal: 16,
    
  },
});
