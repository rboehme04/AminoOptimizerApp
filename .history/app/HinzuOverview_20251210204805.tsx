import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "@/components/navBar";
import { Color } from "@/constants/GlobalStyles";
import SearchBar from "@/components/searchBar";

export default function HinzuOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar title="Hinzufügen" />
      <View style={styles.headerContainer}>
        <SearchBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  headerContainer: {
    
    paddingHorizontal: 16,
    gap: 12,
  },
});
