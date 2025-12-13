import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ChevronDownIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import DropDown from "../dropDown";

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
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
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
      <View style={styles.leftContainer}>
        <TextInput
          ref={inputRef}
          style={[styles.textInput, isFocused && styles.textInputFocused]}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onSubmitEditing={() => inputRef.current?.blur()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={6}
          accessibilityLabel="Portionen eingeben"
        />
      </View>
      <View >
        <Pressable style={styles.rightContainer} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <View style={styles.dropDownInput}>
            <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
              {label}
            </Text>
            <ChevronDownIcon color={Color.neutralWhite} size={24} />
          </View>
        </Pressable>
        {isDropdownOpen && (
          <View style={styles.dropdownWrapper}>
            <DropDown />
          </View>
        )}
      </View>
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
  leftContainer: {
    paddingHorizontal: 20,
  },
  textInput: {
    width: 68,
    textAlign: "center",
    paddingVertical: 10,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    backgroundColor: Color.neutralInputOnDark,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    borderRadius: 12,
  },
  textInputFocused: {
    borderColor: Color.neutralWhite,
  },
  rightContainer: {
    paddingRight: 20,
  },
  dropDownInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    borderRadius: 12,
    backgroundColor: Color.neutralTagColor,
  },
  dropdownWrapper: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 4,
    zIndex: 1000,
  },
  label: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});

export default HinzuRezAmountInput;
