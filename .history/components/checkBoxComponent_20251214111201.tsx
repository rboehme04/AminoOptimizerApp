import { StyleSheet, View } from "react-native";

export default function CheckboxComponent() {
  return (
    <View style={styles.container}>
        <View style={styles.checkbox}>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Color.neutralBorderDefault,
  },
});