import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, TextInput, View } from "react-native";

export default function SettingsInputComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text>{label}</Text>
        <TextInput style={styles.input} />
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
