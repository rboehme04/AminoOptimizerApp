import { HelpCircleIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckboxComponent from "./checkBoxComponent";

export default function PopUp() {
  const [isChecked, setIsChecked] = useState(false);
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
          <View style={styles.buttonRowContainer}>
            <Pressable style={styles.buttonOuterContainer} onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Entfernen</Text>
              </View>
            </Pressable>
            <Pressable style={styles.buttonOuterContainer} onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Abbrechen</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.notShowAgainContainer}>
            <CheckboxComponent
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
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
  buttonRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  buttonOuterContainer: {
    paddingVertical: 2,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Color.neutralTagColor,
  },
  buttonText: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  notShowAgainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
