import { StyleSheet, View } from "react-native";

export default function SettingsInputComponent() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name eingeben" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});