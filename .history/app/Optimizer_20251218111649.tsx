import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { SettingsIcon } from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";

export default function OptimizerScreen() {
  const insets = useSafeAreaInsets();

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
  headerContainer: {
    justifyContent: "center",
    paddingHorizontal: 0,
    gap: 12,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});
