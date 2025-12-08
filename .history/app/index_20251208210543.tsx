import OptimizerNavBar from "@/components/optimizerNavBar";
import { StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View>
      <View style={styles.container}>
        <OptimizerNavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
