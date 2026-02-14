import AsyncStorage from "@react-native-async-storage/async-storage";

const ALLERGIES_EXCLUSIONS_KEY = "allergies_exclusions";

export async function getAllergiesExclusions(): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(ALLERGIES_EXCLUSIONS_KEY);
    return value ?? "";
  } catch {
    return "";
  }
}

export async function setAllergiesExclusions(value: string): Promise<void> {
  await AsyncStorage.setItem(ALLERGIES_EXCLUSIONS_KEY, value);
}
