import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OptimizerNavBar from "@/components/optimizerNavBar";
import QuestionButton from "@/components/questionButton";
import RezeptErstellenButton from "@/components/rezeptErstellenButton";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.Content}>
      <View style={styles.headerContainer}>
        <OptimizerNavBar />
        <View style={styles.headerButtonsContainer}>
          <QuestionButton />
          <View style={styles.rezeptErstellenContainer}>
            <RezeptErstellenButton />
          </View>
          <View style={styles.textContainer}>
            <Text>oder aus</Text>
          </View>
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
  headerButtonsContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  rezeptErstellenContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
});
