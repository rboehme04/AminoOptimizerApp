import { View } from "react-native";

export default function PersDatenComponent() {
  return (
    <View style={styles.container}>
      <Text>Persönliche Daten</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});