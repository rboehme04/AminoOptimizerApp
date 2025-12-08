import OptimizerNavBar from "@/components/optimizerNavBar";
import { StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.Content}>
      <View style={styles.headerContainer}>
        <OptimizerNavBar />
      </View>
      <View style={styles.rezepteUndFilterContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  Content: {
    justifyContent: "flex-start",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: "red",
  },
  rezepteUndFilterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
