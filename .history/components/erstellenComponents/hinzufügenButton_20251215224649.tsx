import { Color, Typography } from "@/constants/GlobalStyles";
import { View, Text, StyleSheet, Pressable } from "react-native";

type HinzufügenButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
};

const HinzufügenButton = ({
  onPress,
  disabled = false,
}: HinzufügenButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[styles.text, disabled && styles.textDisabled]}
        >
          Hinzufügen
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 213,
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: Color.neutralWhite,
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
});

export default HinzufügenButton;