import { Color, Typography } from "@/constants/GlobalStyles";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonRowProps {
  leftButtonText?: string;
  rightButtonText?: string;
  rightButtonColor?: string;
  rightButtonTextColor?: string;
  onLeftButtonPress?: () => void;
  onRightButtonPress?: () => void;
  disabled?: boolean;
}

export default function ButtonRow({
  leftButtonText = "Left Button",
  rightButtonText = "Right Button",
  rightButtonColor = Color.neutralTagColor,
  rightButtonTextColor = Color.neutralWhite,
  onLeftButtonPress,
  onRightButtonPress,
  disabled = false,
}: ButtonRowProps) {
  const [isRightButtonPressed, setIsRightButtonPressed] = useState(false);

  const handleRightButtonPress = () => {
    setIsRightButtonPressed(true);
    onRightButtonPress?.();
  };

  return (
    <View style={styles.buttonRowContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonOuterContainer,
          styles.leftButtonContainer,
          pressed && !disabled && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        onPress={onLeftButtonPress}
        disabled={disabled}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{leftButtonText}</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.buttonOuterContainer,
          styles.rightButtonContainer,
          (pressed || isRightButtonPressed) && !disabled && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
        onPress={handleRightButtonPress}
        disabled={disabled}
      >
        <View style={[styles.button, { backgroundColor: rightButtonColor }]}>
          <Text style={[styles.buttonText, { color: rightButtonTextColor }]}>
            {rightButtonText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRowContainer: {
    flexDirection: "row",
    gap: 16,
  },
  buttonOuterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 2,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  leftButtonContainer: {
    flex: 1,
  },
  rightButtonContainer: {
    flex: 1,
  },
  button: {
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
});
