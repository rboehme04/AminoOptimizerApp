import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function AllergeneComponent() {
  return (
    <View style={styles.container}>
      <Text>
        Hast du Allergien oder gibt es Lebensmittel, die du lieber nicht essen
        möchtest?
      </Text>
      <View style={styles.inputContainer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 16,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  greyText: {
    color: Color.neutralTextOrTabGrey,
  },
  inputContainer: {
    gap: 4,
  },
});
