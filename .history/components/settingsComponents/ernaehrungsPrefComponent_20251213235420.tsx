import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function Ern() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Ernährungsweise" placeholder="Allesesser" />
      <SettingsCategoryRowComponent label="Makronährstoff-Verhältnis" placeholder="High Protein"/>
      <SettingsCategoryRowComponent label="Allergien und Ausschlüsse" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});
