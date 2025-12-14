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
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutralTagColor,
  },
});