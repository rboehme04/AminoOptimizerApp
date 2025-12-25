import NavBar from "@/components/navBar";
import SettingsRowComponent from "@/components/settingsComponents/settingsRowComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRecentLebensmittel } from "@/utils/recentItems";

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

  const handleItemPress = (item: string) => {
    router.push({
      pathname: "/SettingsCategoryScreen",
      params: { item },
    });
  };

  const handleResetPrototypeData = async () => {
    try {
      const currentList = await getRecentLebensmittel();
      // Remove the first 5 items
      const updatedList = currentList.slice(5);
      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem(
        "recent_lebensmittel_v1",
        JSON.stringify(updatedList)
      );
    } catch (error) {
      console.error("Error resetting prototype data", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title="Einstellungen" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rowListContainer}>
          {SETTINGS_ITEMS_1.map((item, index) => (
            <SettingsRowComponent
              key={index}
              text={item}
              onPress={() => handleItemPress(item)}
              isLast={index === SETTINGS_ITEMS_1.length - 1}
            />
          ))}
        </View>
        <View style={styles.rowListContainer}>
          {SETTINGS_ITEMS_2.map((item, index) => (
            <SettingsRowComponent
              key={index}
              text={item}
              onPress={() => {}}
              isLast={index === SETTINGS_ITEMS_2.length - 1}
            />
          ))}
        </View>
        <View style={styles.rowListContainer}>
          <SettingsRowComponent
            text="Abmelden"
            onPress={() => {}}
            isLast={true}
            color={Color.brand40LetzteButtonOrBlueText}
            isChevron={false}
          />
          <SettingsRowComponent
            text="Reset Prototype Data"
            onPress={() => {}}
            isLast={true}
            color={Color.brand40LetzteButtonOrBlueText}
            isChevron={false}
          />
        </View>
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
