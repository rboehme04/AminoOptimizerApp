import NavBar from "@/components/navBar";
import SettingsInputComponent from "@/components/settingsComponents/settingsInputComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsDetailScreen = () => {
  const { item } = useLocalSearchParams<{ item: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={item} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsInputComponent label="Name" input="Jens Huhn" />
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
