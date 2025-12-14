import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function KontoComponent() {
  return (
    <View style={styles.container}>
        <View
      <SettingsCategoryRowComponent label="Email-Adresse" placeholder="jens.huhn@gmail.com" />
      <SettingsCategoryRowComponent label="Passwort" placeholder="********" />
      <SettingsCategoryRowComponent label="Sprache" placeholder="Deutsch" />
      <SettingsCategoryRowComponent label="Abonnement" placeholder="Gratis" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});