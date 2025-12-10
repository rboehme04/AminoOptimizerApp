import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NextButtonProps {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
}

const NextButton = ({
  onPress,
  text = "Button",
  disabled = false,
}: NextButtonProps) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
     
        <Text style={[styles.text, disabled && styles.textDisabled]}>
          {text} 
        </Text>
      
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 190,
    padding: 16,
    backgroundColor: Color.neutralWhite,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: Color.neutralButtonInactive,
  },
  text: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralBlackText,
  },
  textDisabled: {
    color: Color.neutralTextOrTabGrey,
  },
});

export default NextButton;
