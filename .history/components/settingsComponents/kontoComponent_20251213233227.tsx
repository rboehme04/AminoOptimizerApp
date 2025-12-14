import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Email-Adresse" placeholder="jens.huhn@gmail.com" />
      <SettingsCategoryRowComponent label="Passwort" placeholder="********" measuringUnit="kg" />
      <SettingsCategoryRowComponent label="Sprache" placeholder="Deutsch" measuringUnit="cm" />
      <SettingsCategoryRowComponent label="Abonnement" placeholder="" />
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