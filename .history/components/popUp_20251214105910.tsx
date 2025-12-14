import { HelpCircleIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function PopUp() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <HelpCircleIcon size={20} color={Color.neutralWhite} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Lebensmittel entfernen</Text>
            <Text style={styles.descriptionText}>
              Dieses Lebensmittel wird nicht mehr vorgeschlagen. Änderungen sind
              jederzeit in den Einstellungen möglich.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => {}}></Pressable>
          </View>
        </View>
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
    flexDirection: "row",
    gap: 12,
  },
  contentContainer: {
    flex: 1,
    gap: 16,
  },
  textContainer: {
    gap: 4,
  },
  titleText: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  descriptionText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
