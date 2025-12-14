import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Email-Adresse" placeholder="jens.huhn@gmail.com" />
      <SettingsCategoryRowComponent label="Passwort" placeholder="70" measuringUnit="kg" />
      <SettingsCategoryRowComponent label="Sprache" placeholder="187" measuringUnit="cm" />
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