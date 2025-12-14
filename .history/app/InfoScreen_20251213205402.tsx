import NavBar from "@/components/navBar";
import { Typography } from "@/constants/GlobalStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoScreen = () => {
  return (
    <SafeAreaView>
      <NavBar title="Wie funktioniert es?" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.infoParagraphContainer}>
          <Text style={styles.infoParagraphTitle}>Wie funktioniert es?</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  infoParagraphContainer: {
    gap: 2,
  },
  infoParagraphTitle: {
    ...Typography.headlineRegular,
    color: Color.neutralWhite,
  },
});

export default InfoScreen;
