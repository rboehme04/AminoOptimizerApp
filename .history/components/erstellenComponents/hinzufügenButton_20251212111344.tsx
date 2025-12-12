import { View, Text, StyleSheet } from "react-native";

const HinzufügenButton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hinzufügen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});

export default HinzufügenButton;