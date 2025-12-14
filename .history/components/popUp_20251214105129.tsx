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
    backgroundColor: Color.neutralWhite,
    borderRadius: 16,
    shadowColor: Color.neutralBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
