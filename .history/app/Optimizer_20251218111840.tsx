import { SettingsIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OptimizerScreen() {
  return (
    <SafeAreaView style={styles.Content}>
      <NavBar
        title="Optimizer"
        isBold={true}
        isBackButton={true}
      />
      <View style={styles.centerContainer}>
        <Text style={styles.text}>oder auswählen:</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    paddingBottom: Padding.padding_next_button,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});
