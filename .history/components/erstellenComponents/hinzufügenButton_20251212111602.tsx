import { Color, Typography } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet } from "react-native";

const HinzufügenButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Hinzufügen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    justifyContent: "center",
  },
  button: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: Color.neutralWhite,
  },
  text: {
      ...Typography.subheadlineRegular,
    color: Color.neutralBlack,
  },
});

export default HinzufügenButton;