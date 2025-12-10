import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { Color } from "@/constants/GlobalStyles";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <S
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  headerContainer: {
    paddingHorizontal: 8,
    gap: 12,
  },
});
