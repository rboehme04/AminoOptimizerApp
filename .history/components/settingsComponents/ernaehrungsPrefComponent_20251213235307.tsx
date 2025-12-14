import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Ernährungsweise" placeholder="Allesesser" />
      <SettingsCategoryRowComponent label="Makronährstoff-Verhältnis" placeholder="High Proei" measuringUnit="kg" />
      <SettingsCategoryRowComponent label="Körpergröße" placeholder="187" measuringUnit="cm" />
      <SettingsCategoryRowComponent label="Geburtsdatum" placeholder="19.05.2001" />
      <SettingsCategoryRowComponent label="Geschlecht" placeholder="männlich" />
      <SettingsCategoryRowComponent label="Aktivitätslevel" placeholder="Hoch" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});
