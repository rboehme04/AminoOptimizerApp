import { View, Text } from "react-native";

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
});

export default HinzufügenButton;