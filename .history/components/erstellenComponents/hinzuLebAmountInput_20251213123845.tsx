import * as React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
  const dropDownInputRef = React.useRef<View>(null);
  const containerRef = React.useRef<View>(null);
  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

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

  const measureDropdownPosition = React.useCallback(() => {
    if (dropDownInputRef.current && containerRef.current) {
      dropDownInputRef.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          setDropdownPosition({
            top: y + height,
            left: x,
            width: width,
          });
        },
        () => {
          // Fallback if measureLayout fails
          dropDownInputRef.current?.measureInWindow((x, y, width, height) => {
            containerRef.current?.measureInWindow((containerX, containerY) => {
              setDropdownPosition({
                top: y + height - containerY,
                left: x - containerX,
                width: width,
              });
            });
          });
        }
      );
    }
  }, []);

  React.useEffect(() => {
    if (isDropdownOpen) {
      // Small delay to ensure layout is complete
      setTimeout(measureDropdownPosition, 0);
    }
  }, [isDropdownOpen, measureDropdownPosition]);

  return (
    <View ref={containerRef} style={styles.container}>
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
      <Pressable
        style={styles.rightContainer}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <View
          ref={dropDownInputRef}
          style={styles.dropDownInput}
          onLayout={measureDropdownPosition}
        >
          <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
            {label}
          </Text>
          <ChevronDownIcon color={Color.neutralWhite} size={24} />
        </View>
      </Pressable>
      {isDropdownOpen && (
        <View
          style={[
            styles.dropdownWrapper,
            {
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            },
          ]}
        >
          <DropDown width={dropdownPosition.width || undefined} />
        </View>
      )}
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
    position: "relative",
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
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
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
  label: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  dropdownWrapper: {
    position: "absolute",
    zIndex: 1000,
    marginTop: 4,
  },
});

export default HinzuRezAmountInput;
