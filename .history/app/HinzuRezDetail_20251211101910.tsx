import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";

export default function HinzuRezDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Rezept Details" />
      <View style={styles.content}>
        {/* Content will be added here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});

