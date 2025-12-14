import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title="Wie funktioniert es?" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {INFO_SECTIONS.map((section, index) => (
          <View key={index} style={styles.infoParagraphContainer}>
            <Text style={styles.infoParagraphTitle}>{section.title}</Text>
            <Text style={styles.infoParagraphText}>{section.content}</Text>
          </View>
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  infoParagraphContainer: {
    gap: 2,
  },
  infoParagraphTitle: {
    ...Typography.bodyEmphasized,
    color: Color.neutralWhite,
  },
  infoParagraphText: {
    ...Typography.bodyRegular,
    color: Color.neutralWhite,
  },
});

export default InfoScreen;
