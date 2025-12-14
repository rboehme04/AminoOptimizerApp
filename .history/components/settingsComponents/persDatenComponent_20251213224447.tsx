import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Name" />
      <SettingsCategoryRowComponent label="Aktuelles Gewicht" />
      <SettingsCategoryRowComponent label="Körpergröße" />
      <SettingsCategoryRowComponent label="Geburtsdatum" />
      <SettingsCategoryRowComponent label="Geschlecht" />
      <SettingsCategoryRowComponent label="Aktivitätslevel" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});