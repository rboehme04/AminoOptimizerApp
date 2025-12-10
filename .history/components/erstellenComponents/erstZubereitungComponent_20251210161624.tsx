import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  value?: string;
  onChangeText: (text: string) => void;
};

const ErstZubereitungComponent = ({ value, onChangeText }: Props) => {
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const textareaRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <Text style={styles.labelText}>Zubereitung</Text>
        <ChevronRightIcon
          size={20}
          color={Color.neutralTextOrTabGrey}
          style={[styles.chevron, expanded && styles.chevronExpanded]}
        />
      </Pressable>
      <View
        style={[
          styles.textinputContainer,
          !expanded && styles.textinputContainerHidden,
        ]}
      >
        <TextInput
          ref={textareaRef}
          style={[
            styles.variableInputTextarea,
            textareaFocused && styles.variableInputTextareaFocused,
          ]}
          placeholder="optional"
          placeholderTextColor={Color.neutralTextOrTabGrey}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setTextareaFocused(true)}
          onBlur={() => setTextareaFocused(false)}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: "row",
    height: 44,
    alignItems: "center",
    gap: 4,
  },
  labelText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    transform: [{ rotate: "90deg" }],
  },
  pressed: {
    opacity: 0.7,
  },
  textinputContainer: {
    paddingHorizontal: 8,
  },
  textinputContainerHidden: {
    display: "none",
  },
  variableInputTextarea: {
    height: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    backgroundColor: Color.neutralInputOnDark,
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  variableInputTextareaFocused: {
    borderColor: Color.neutralWhite,
  },
});

export default ErstZubereitungComponent;
