import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Name" />
      <SettingsCategoryRowComponent label="Email" />
      <SettingsCategoryRowComponent label="Telefon" />
      <SettingsCategoryRowComponent label="Geburtsdatum" />
      <SettingsCategoryRowComponent label="Geschlecht" />
      <SettingsCategoryRowComponent label="Größe" />
      <SettingsCategoryRowComponent label="Gewicht" />
      <SettingsCategoryRowComponent label="Ziel" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});