import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Color, Padding, Typography } from "@/constants/GlobalStyles";

interface NextButtonProps {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
}

const NextButton = ({ 
  onPress, 
  text = "Button",
  disabled = false 
}: NextButtonProps) => {
  return (
    <Pressable 
      style={[styles.button, disabled && styles.buttonDisabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.view}>
        <Text style={[styles.text, disabled && styles.textDisabled]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Color.neutralWhite,
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonDisabled: {
    backgroundColor: Color.neutralButtonInactive,
  },
  view: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.padding_16,
  },
  text: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralBlackText,
    textAlign: "center",
    flex: 1,
  },
  textDisabled: {
    color: Color.neutralTextOrTabGrey,
  },
});

export default NextButton;
