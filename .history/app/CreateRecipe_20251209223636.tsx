import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { Color } from "@/constants/GlobalStyles";

export default function CreateRecipeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutralBackgroundDark,
  },
});
