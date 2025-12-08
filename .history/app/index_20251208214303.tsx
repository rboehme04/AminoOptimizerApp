import OptimizerNavBar from "@/components/optimizerNavBar";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.Content}>
      <View style={styles.headerContainer}>
        {/* <OptimizerNavBar /> */}
      </View>
      <View style={styles.rezepteUndFilterContainer}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "blue",
  },
  headerContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: "red",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
