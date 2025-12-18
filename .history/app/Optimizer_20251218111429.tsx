import { SettingsIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OptimizerScreen() {
  return (
    <SafeAreaView style={styles.Content} edges={["left", "right", "bottom"]}>
      <NavBar
        title="Optimizer"
        isBold={true}
        isBackButton={false}
        rightActions={[
          {
            icon: <SettingsIcon size={24} color={Color.neutralWhite} />,
            onPress: () => router.push("/SettingsScreen"),
          },
        ]}
      />
      <View style={styles.centerContainer}>
        <Text style={styles.oderAuswaehlenText}>oder auswählen:</Text>
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
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
