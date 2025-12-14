import NavBar from "@/components/navBar";
import AllergeneComponent from "@/components/settingsComponents/allergeneComponent";
import SettingsInputComponent from "@/components/settingsComponents/settingsInputComponent";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsDetailScreen = () => {
  const { label, placeholder, measuringUnit } = useLocalSearchParams<{
    label: string;
    placeholder?: string;
    measuringUnit?: string;
  }>();
  const [allergenValue, setAllergenValue] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={label} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {label === "Allergien und Ausschlüsse" ? (
          <AllergeneComponent
            value={allergenValue}
            onChangeText={setAllergenValue}
          />
        ) : (
          <SettingsInputComponent
            label={label}
            placeholder={placeholder}
            measuringUnit={measuringUnit}
          />
        )}
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
});

export default SettingsDetailScreen;
