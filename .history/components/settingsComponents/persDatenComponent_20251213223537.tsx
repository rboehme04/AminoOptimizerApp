import { StyleSheet, View } from "react-native";
import SettingsCategoryRowComponent from "./settingsCategoryRowComponent";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <SettingsCategoryRowComponent label="Name" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});