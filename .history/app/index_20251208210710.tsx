import OptimizerNavBar from "@/components/optimizerNavBar";
import { StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.content}>
      <View style={styles.headerContainer}>
        <OptimizerNavBar />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
