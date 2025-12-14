import { Color } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function PopUp() {
  return (
    <View style={styles.container}>
      <Text>Not yet implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 18,
  },
  innerContainer: {
    flexDirection: 'column',
    gap: 12,
  },
});
