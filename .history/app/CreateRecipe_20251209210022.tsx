import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Color, Typography } from "@/constants/GlobalStyles";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <Text>Create Recipe</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
  },
  title: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    ...Typography.calloutRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
});
