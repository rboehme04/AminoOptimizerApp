import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title="Einstellungen" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rowListContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Persönliche Daten</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Community Profil</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.text}>Kontoeinstellungen</Text>
          </View>
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
