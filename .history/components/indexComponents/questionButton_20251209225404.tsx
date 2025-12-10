import { HelpCircleIcon } from "@/assets/icons/icons";
import { Color, Gap, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const QuestionButton = () => {
  return (
    <Pressable
      style={[styles.questionButton, styles.buttonFlexBox]}
      onPress={() => {}}
    >
      <View style={[styles.button, styles.buttonFlexBox]}>
        <Text style={styles.text}>Wie funktioniert es?</Text>
        <View style={styles.helpCircle}>
          <HelpCircleIcon />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  questionButton: {
    height: 44,
  },
  button: {
    height: 36,
    borderRadius: 18,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderWidth: 1,
    paddingLeft: 12,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    gap: Gap.gap_8,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    textAlign: "left",
  },
  helpCircle: {
    height: 24,
    width: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuestionButton;
