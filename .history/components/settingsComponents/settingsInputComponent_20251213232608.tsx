import { CloseXIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SettingsInputComponent({
  label,
  placeholder,
  measuringUnit = "",
}: {
  label: string;
  placeholder?: string;
  measuringUnit?: string;
}) {
  const [value, setValue] = useState(placeholder || "");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus the input when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.textLabel}>{label}</Text>
        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholderTextColor={Color.neutralWhite}
            autoFocus={true}
            showSoftInputOnFocus={true}
          />
          {measuringUnit && (
            <Text style={styles.measuringUnit}>{measuringUnit}</Text>
          )}
        </View>
      </View>
      <Pressable style={styles.rightContainer} onPress={() => setValue("")}>
        <CloseXIcon size={20} color={Color.neutralWhite} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.neutralWhite,
    borderRadius: 10,
  },
  leftContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  rightContainer: {
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  measuringUnit: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    marginLeft: 4,
  },
});
