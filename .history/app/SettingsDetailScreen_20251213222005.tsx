import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsDetailScreen = () => {
  const { item } = useLocalSearchParams<{ item: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={item || "Einstellungen"} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{item}</Text>
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
  },
  contentContainer: {
    gap: 16,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});

export default SettingsDetailScreen;
