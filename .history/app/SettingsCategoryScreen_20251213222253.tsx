import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronRightIcon } from "@/assets/icons/icons";

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
      pathname: "/SettingsDetailScreen",
      params: { item },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title=" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rowListContainer}>
          {SETTINGS_ITEMS_1.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.rowItemContainer,
                index === SETTINGS_ITEMS_1.length - 1 && styles.rowItemLast,
                pressed && styles.rowItemPressed,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.text}>{item}</Text>
              <ChevronRightIcon size={20} color={Color.neutralButtonInactive} />
            </Pressable>
          ))}
        </View>
        <View style={styles.rowListContainer}>
          {SETTINGS_ITEMS_2.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.rowItemContainer,
                index === SETTINGS_ITEMS_2.length - 1 && styles.rowItemLast,
                pressed && styles.rowItemPressed,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.text}>{item}</Text>
              <ChevronRightIcon size={20} color={Color.neutralButtonInactive} />
            </Pressable>
          ))}
        </View>
        <View style={styles.rowListContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.rowItemContainer,
              styles.rowItemLast,
              pressed && styles.rowItemPressed,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.abmeldenText}>Abmelden</Text>
          </Pressable>
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
