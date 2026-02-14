import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import AllergeneComponent from "@/components/settingsComponents/allergeneComponent";
import {
  getAllergiesExclusions,
  setAllergiesExclusions,
} from "@/utils/allergiesExclusions";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsDetailScreen = () => {
  const router = useRouter();
  const { label, placeholder, measuringUnit } = useLocalSearchParams<{
    label: string;
    placeholder?: string;
    measuringUnit?: string;
  }>();
  const [allergenValue, setAllergenValue] = useState("");

  const isAllergiesScreen = label === "Allergien und Ausschlüsse";

  useEffect(() => {
    if (!isAllergiesScreen) return;
    let cancelled = false;
    getAllergiesExclusions().then((stored) => {
      if (!cancelled) setAllergenValue(stored);
    });
    return () => {
      cancelled = true;
    };
  }, [isAllergiesScreen]);

  const handleSave = useCallback(async () => {
    if (isAllergiesScreen) {
      await setAllergiesExclusions(allergenValue);
    }
    router.back();
  }, [isAllergiesScreen, allergenValue, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title={label} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {label === "Allergien und Ausschlüsse" && (
          <AllergeneComponent
            value={allergenValue}
            onChangeText={setAllergenValue}
          />
        )}
      </ScrollView>
      <NextButton text="Speichern" onPress={handleSave} />
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
