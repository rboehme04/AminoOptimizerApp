import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { Color } from "@/constants/GlobalStyles";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Hinzu Overview" />
      <View style={styles.content}>{/* Add your content here */}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutralBackgroundDark,
  },
  content: {
    flex: 1,
  },
});
