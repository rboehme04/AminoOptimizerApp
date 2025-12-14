import NavBar from "@/components/navBar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoScreen = () => {
  return (
    <SafeAreaView>
      <NavBar title="Wie funktioniert es?" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.infoParagraphContainer}>
          <Text>Wie funktioniert es?</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoParagraphContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
});

export default InfoScreen;
