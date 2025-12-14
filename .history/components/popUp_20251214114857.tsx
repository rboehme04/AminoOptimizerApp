import { HelpCircleIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckboxComponent from "./checkBoxComponent";

interface PopUpProps {
  titleText?: string;
  descriptionText?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  rightButtonColor?: string;
}

export default function PopUp({
  titleText = "Title",
  descriptionText = "Description text",
  leftButtonText = "Left Button",
  rightButtonText = "Right Button",
  rightButtonColor = Color.neutralTagColor,
}: PopUpProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <HelpCircleIcon size={20} color={Color.neutralWhite} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{titleText}</Text>
            <Text style={styles.descriptionText}>{descriptionText}</Text>
          </View>
          <View style={styles.buttonRowContainer}>
            <Pressable
              style={[styles.buttonOuterContainer, styles.leftButtonContainer]}
              onPress={() => {}}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>{leftButtonText}</Text>
              </View>
            </Pressable>
            <Pressable
              style={[styles.buttonOuterContainer, styles.rightButtonContainer]}
              onPress={() => {}}
            >
              <View
                style={[styles.button, { backgroundColor: rightButtonColor }]}
              >
                <Text style={styles.buttonText}>{rightButtonText}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.notShowAgainContainer}>
            <CheckboxComponent
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={[styles.descriptionText, styles.notShowAgainText]}>
              diese Meldung nicht mehr anzeigen
            </Text>
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
    gap: 16,
  },
  buttonOuterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 2,
  },
  leftButtonContainer: {
    alignItems: "flex-end",
  },
  rightButtonContainer: {
    alignItems: "flex-start",
  },
  button: {
    width: 110,
    alignSelf: "stre",
    alignItems: "center",
    justifyContent: "center",
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
    gap: 8,
  },
  notShowAgainText: {
    flex: 1,
  },
});
