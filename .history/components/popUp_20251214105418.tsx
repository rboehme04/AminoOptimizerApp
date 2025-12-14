import { HelpCircleIcon } from "@/assets/icons/icons";
import { Color } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function PopUp() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <HelpCircleIcon size={20} color={Color.neutralWhite} />
        <View style={styles.contentContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 18,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  contentContainer: {
    flex: 1,
    gap: 16,
  },
  textContainer:
});
