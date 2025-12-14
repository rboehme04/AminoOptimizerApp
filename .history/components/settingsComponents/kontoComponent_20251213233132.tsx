import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Email-Adresse" placeholder="Jens Huhn" />
      <SettingsCategoryRowComponent label="Aktuelles Gewicht" placeholder="70" measuringUnit="kg" />
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