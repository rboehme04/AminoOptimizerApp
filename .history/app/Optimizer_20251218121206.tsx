import { OptimizerNotStartedIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import NextButton from "@/components/nextButton";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";
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
        <View style={styles.animationContainer}>
          <OptimizerNotStartedIcon size={48} />
        </View>
        <Text style={styles.text}>Aminosäureprofil analysieren</Text>
      </View>
      <NextButton
        text="Abbrechen"
        onPress={() => {}}
        buttonStyle="dark"
      />
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
    gap: 16,
  },
  animationContainer: {
    padding: 5,
  },
  text: {
    ...Typography.bodyRegular,
    color: Color.neutralTextOrTabGrey,
  },
});
