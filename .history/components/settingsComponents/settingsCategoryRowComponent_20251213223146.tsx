import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsCategoryRowComponent({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 10,
    gap: 10,
  },
  labelContainer: {
    width: 115,
  },
  clickContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    gap: 10,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});