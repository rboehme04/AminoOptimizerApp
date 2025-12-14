import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";
import { Color } from "@/constants/GlobalStyles";
import SettingsRowComponent from "./settingsRowComponent";

export default function KontoComponent() {
  return (
    <View style={styles.container}>
      <View>
        <SettingsCategoryRowComponent
          label="Email-Adresse"
          placeholder="jens.huhn@gmail.com"
        />
        <SettingsCategoryRowComponent label="Passwort" placeholder="********" />
        <SettingsCategoryRowComponent label="Sprache" placeholder="Deutsch" />
        <SettingsCategoryRowComponent label="Abonnement" placeholder="Gratis" />
      </View>
      <View>
        <SettingsRowComponent text="Kauf wiederherstellen" onPress={() => {}} isChevron={false} />
        <SettingsRowComponent text="Abmelden" onPress={() => {}} isChevron={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 16,
  },
});
