import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingsIcon } from "@/assets/icons/icons";
import QuestionButton from "@/components/indexComponents/questionButton";
import RezeptErstellenButton from "@/components/indexComponents/rezeptErstellenButton";
import RezSelectionAndFilterComponent from "@/components/indexComponents/rezSelectionAndFilterComponent";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { resetDatabase } from "@/utils/sqlite";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // TEMPORARY: Reset database to start fresh with new schema
  // Remove this useEffect after the database has been reset
  useEffect(() => {
    resetDatabase()
      .then(() => {
        console.log("Database reset successfully");
      })
      .catch(error => {
        console.error("Error resetting database:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.Content} edges={["left", "right", "bottom"]}>
      <LinearGradient
        colors={["#262626", Color.neutralBackgroundDark]}
        locations={[0, 0.97]}
        style={[styles.headerContainer, { paddingTop: insets.top }]}
      >
        <NavBar
          title="Optimizer"
          isBold={true}
          isBackButton={false}
          rightActions={[
            {
              icon: <SettingsIcon size={24} color={Color.neutralWhite} />,
              onPress: () => router.push("/SettingsScreen"),
            },
          ]}
        />
        <View style={styles.headerButtonsContainer}>
          <QuestionButton onPress={() => router.push("/InfoScreen")} />
          <View style={styles.rezeptErstellenContainer}>
            <RezeptErstellenButton />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.oderAuswaehlenText}>oder auswählen:</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.rezepteUndFilterContainer}>
        <RezSelectionAndFilterComponent isOptimizerHome={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
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
    gap: 10,
  },
  mealRowsContainer: {
    gap: 10,
  },
});
