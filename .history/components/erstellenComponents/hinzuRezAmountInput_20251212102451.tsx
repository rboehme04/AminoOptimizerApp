import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  min = 0.,
  max = 99,
  onChange,
}: HinzuRezAmountInputProps) => {
  const [value, setValue] = React.useState(initialValue.toString());
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    const sanitized = text.replace(/[^0-9]/g, "");
    if (sanitized === "") {
      setValue("");
      return;
    }

    const numeric = Number(sanitized);
    const clamped = Math.min(max, Math.max(min, numeric));
    setValue(clamped.toString());
    onChange?.(clamped);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
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
            keyboardType="number-pad"
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => inputRef.current?.blur()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={3}
            accessibilityLabel="Portionen eingeben"
          />
        </View>
        <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
  },
  container: {
    width: "100%",
    minHeight: 80,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  inputContainer: {
    height: 48,
    minWidth: 72,
    borderRadius: 12,
    backgroundColor: Color.neutralInputOnDark,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    justifyContent: "center",
    paddingHorizontal: 12,
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
