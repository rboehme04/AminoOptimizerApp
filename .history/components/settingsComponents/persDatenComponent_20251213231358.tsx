import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Name" input="Jens Huhn" />
      <SettingsCategoryRowComponent label="Aktuelles Gewicht" input="70" measuringUnit="kg" />
      <SettingsCategoryRowComponent label="Körpergröße" input="187" measuringUnit="cm" />
      <SettingsCategoryRowComponent label="Geburtsdatum" input="19.05.2001" />
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
