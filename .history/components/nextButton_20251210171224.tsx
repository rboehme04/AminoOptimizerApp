import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NextButtonProps {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
  badge?: string | number;
}

const NextButton = ({
  onPress,
  text = "Button",
  disabled = false,
  badge,
}: NextButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.text, disabled && styles.textDisabled]}>
          {text}
        </Text>
      </Pressable>
      {badge !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    width: 190,
    padding: 16,
    backgroundColor: Color.neutralWhite,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
    overflow: "hidden",
  },
  buttonDisabled: {
    backgroundColor: Color.neutralButtonInactive,
  },
  text: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralBlackText,
  },
  textDisabled: {
    color: Color.neutralBackgroundDark,
  },
  badge: {
    position: "absolute",
    top: -12,
    right: -12,
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Color.colorRoyalblue,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    overflow: "hidden",
  },
  badgeText: {
    fontSize: 16,
    letterSpacing: -0.1,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: "Inter",
    color: Color.neutralWhite,
    textAlign: "center",
  },
});

export default NextButton;
