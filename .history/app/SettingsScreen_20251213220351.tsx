import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SETTINGS_ITEMS = [
  "Persönliche Daten",
  "Kontoeinstellungen",
  "Community Profil",
  "Ernährungspräferenzen",
  "Ziele",
  "Einheiten",
  "Benachrichtigungen",
];

const SettingsScreen = () => {
  const handleItemPress = (item: string) => {
    // TODO: Navigate to respective settings screen
    console.log(`Pressed: ${item}`);
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
          {SETTINGS_ITEMS.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.rowItemContainer,
                pressed && styles.rowItemPressed,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.text}>{item}</Text>
            </Pressable>
          ))}
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
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});

export default SettingsScreen;
