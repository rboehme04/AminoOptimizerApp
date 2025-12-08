import { Text as ThemedText } from "@/components/Themed";
import { Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* Method 1: Using Typography directly in StyleSheet */}
      <Text style={styles.largeTitle}>Large Title</Text>
      <Text style={styles.title}>Title 3 Emphasized</Text>
      <Text style={styles.bodyText}>Body Regular Text</Text>

      {/* Method 2: Using typography prop with Themed Text component */}
      <ThemedText typography="title1Emphasized">
        Title 1 Emphasized (via prop)
      </ThemedText>
      <ThemedText typography="calloutRegular">
        Callout Regular (via prop)
      </ThemedText>
      <ThemedText typography="caption1Regular">
        Caption 1 Regular (via prop)
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  largeTitle: {
    ...Typography.largeTitleEmphasized, // 34px, Bold
  },
  title: {
    ...Typography.title3Emphasized, // 20px, Semibold
  },
  bodyText: {
    ...Typography.bodyRegular, // 17px, Regular
  },
});
