import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      
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
});
