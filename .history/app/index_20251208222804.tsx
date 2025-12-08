import OptimizerNavBar from "@/components/optimizerNavBar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.Content}>
      <View style={styles.headerContainer}>
        <OptimizerNavBar />
        <View style={styles.headerButtonsContainer}>

        </View>
      </View>
      <View style={styles.rezepteUndFilterContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerContainer: {
    justifyContent: "center",
    paddingHorizontal: 0,
    gap: 12,
    backgroundColor: "orange",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
