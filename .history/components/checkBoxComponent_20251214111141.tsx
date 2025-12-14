import { StyleSheet, Text, View } from "react-native";

export default function CheckboxComponent() {
  return (
    <View style={styles.container}>
        <View style={styles.checkbox}>
            <View style={styles.checkboxInner}></View>
        </View>
      <Text>Not yet implemented</Text>
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
  checkbox
});