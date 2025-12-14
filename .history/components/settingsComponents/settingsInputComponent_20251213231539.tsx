import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsInputComponent({
  label,
  placeholder,
  measuringUnit = "",
}: {
  label: string;
  placeholder?: string;
  measuringUnit?: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.textLabel}>{label}</Text>
        <Text style={styles.input}>
          {input || ""}
          {measuringUnit && ` ${measuringUnit}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.neutralWhite,
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  rightContainer: {
    paddingRight: 12,
  },
  textLabel: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  input: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
