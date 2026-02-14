import { Color, Typography } from "@/constants/GlobalStyles";
import { Linking, StyleSheet, Text, View } from "react-native";

const OPENNUTRITION_URL = "https://www.opennutrition.app/";

export default function DataLicence() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Nährwertdaten:{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(OPENNUTRITION_URL)}
        >
          OpenNutrition
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  link: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    textDecorationLine: "underline",
  },
});
