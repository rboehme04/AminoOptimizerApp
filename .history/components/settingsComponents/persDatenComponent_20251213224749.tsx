import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Name" placeholder="Jens Huhn" />
      <SettingsCategoryRowComponent label="Aktuelles Gewicht" placeholder="70" />
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
