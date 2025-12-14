import NavBar from "@/components/navBar";
import SettingsInputComponent from "@/components/settingsComponents/settingsInputComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextButton from "@/components/nextButton";

const SettingsDetailScreen = () => {
  const { label, placeholder, measuringUnit } = useLocalSearchParams<{
    label: string;
    placeholder?: string;
    measuringUnit?: string;
  }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={label} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <SettingsInputComponent
          label={label}
          placeholder={placeholder}
          measuringUnit={measuringUnit}
        />
      </ScrollView>
      <NextButton text="Speichern" />
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
