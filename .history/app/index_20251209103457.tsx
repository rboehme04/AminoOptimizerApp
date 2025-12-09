import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import OptimizerNavBar from "@/components/optimizerNavBar";
import QuestionButton from "@/components/questionButton";
import RezeptErstellenButton from "@/components/rezeptErstellenButton";
import { Color, Typography } from "@/constants/GlobalStyles";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.Content} edges={["left", "right", "bottom"]}>
      <LinearGradient
        colors={["#262626", Color.neutralBackgroundDark]}
        locations={[0, 0.97]}
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <OptimizerNavBar />
        <View style={styles.headerButtonsContainer}>
          <QuestionButton />
          <View style={styles.rezeptErstellenContainer}>
            <RezeptErstellenButton />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.oderAuswaehlenText}>oder auswählen:</Text>
          </View>
        </View>
      </LinearGradient>
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
  oderAuswaehlenText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
  rezepteUndFilterContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 12,
  },
});
