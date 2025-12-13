import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function DropDown() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Frucht, mittelgroß</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Frucht, klein</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Frucht, groß</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>1 g</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>1 kg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  row: {
    height: 44,
    paddingHorizontal: 16,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
