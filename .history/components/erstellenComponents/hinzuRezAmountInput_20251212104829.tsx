import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Color, Typography } from "@/constants/GlobalStyles";

type HinzuRezAmountInputProps = {
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

const HinzuRezAmountInput = ({
  label = "Rezept Portionen",
  initialValue = 1,
  min = 0,
  max = 99,
  onChange,
}: HinzuRezAmountInputProps) => {
  const [value, setValue] = React.useState(initialValue.toString());
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    const normalized = text.replace(",", ".");
    const [leading, ...rest] = normalized.replace(/[^0-9.]/g, "").split(".");
    const sanitized = rest.length ? `${leading}.${rest.join("")}` : leading;

    if (sanitized === "") {
      setValue("");
      return;
    }

    if (sanitized === ".") {
      setValue("0.");
      return;
    }
    if (sanitized.endsWith(".")) {
      setValue(sanitized);
      return;
    }

    const numeric = Number(sanitized);
    const clamped = Math.min(max, Math.max(min, numeric));
    setValue(clamped.toString());
    onChange?.(clamped);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="decimal-pad"
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={() => inputRef.current?.blur()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={6}
          accessibilityLabel="Portionen eingeben"
        />
      </View>
      <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
	flexDirection: "row",
	alignItems: "center",
    minHeight: 80,
    borderRadius: 24,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  inputContainer: {
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: Color.neutralInputOnDark,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainerFocused: {
    borderColor: Color.neutralWhite,
  },
  input: {
    ...Typography.title2Emphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
  label: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    flex: 1,
    textAlign: "right",
  },
});

export default HinzuRezAmountInput;
