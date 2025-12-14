import { StyleSheet, Text, View } from "react-native";

export default function SettingsCategoryRowComponent({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
});