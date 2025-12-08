import { StyleSheet, Text, View } from "react-native";
import { Typography, Color } from "@/constants/GlobalStyles";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.largeTitle}>Large Title</Text>
      <Text style={styles.title}>Title 3 Emphasized</Text>
      <Text style={styles.bodyText}>Body Regular Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
    backgroundColor: Color.neutralBackgroundDark,
  },
  largeTitle: {
    ...Typography.largeTitleEmphasized, // 34px, Bold
  },
  title: {
    ...Typography.title3Emphasized, // 20px, Semibold
  },
  bodyText: {
    ...Typography.bodyRegular, // 17px, Regular
  },
});
