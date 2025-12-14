import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronRightIcon } from "@/assets/icons/icons";
import PersDatenComponent from "@/components/settingsComponents/persDatenComponent";
import KontoComponent from "@/components/settingsComponents/kontoComponent";
import ErnaehrungsPrefComponent from "@/components/settingsComponents/ernaehrungsPrefComponent";
import ZieleComponent from "@/components/settingsComponents/zieleComponent";

const SETTINGS_ITEMS_1 = [
  "Persönliche Daten",
  "Kontoeinstellungen",
  "Community Profil",
  "Ernährungspräferenzen",
  "Ziele",
  "Einheiten",
  "Benachrichtigungen",
];

const SETTINGS_ITEMS_2 = ["Kontakt & Support", "FAQ"];

const SettingsScreen = () => {
  const router = useRouter();
  const { item } = useLocalSearchParams<{ item: string }>();

  const handleItemPress = (item: string) => {
    router.push({
      pathname: "/SettingsDetailScreen",
      params: { item },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={item} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {item === "Persönliche Daten" && <PersDatenComponent />}
        {item === "Kontoeinstellungen" && <KontoComponent />}
        {item === "Community Profil" && <KontoComponent />}
        {item === "Ernährungspräferenzen" && <ErnaehrungsPrefComponent />}
        {item === "Ziele" && <ZieleComponent />}
        {item === "Einheiten" && <EinheitenComponent />}
        {item === "Benachrichtigungen" && <BenachrichtigungenComponent />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  rowListContainer: {},
  infoParagraphContainer: {
    gap: 2,
  },
  rowItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.neutralStrokeColor,
  },
  rowItemLast: {
    borderBottomWidth: 0,
  },
  rowItemPressed: {
    opacity: 0.7,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  abmeldenText: {
    ...Typography.subheadlineRegular,
    color: Color.brand40LetzteButtonOrBlueText,
  },
});

export default SettingsScreen;
