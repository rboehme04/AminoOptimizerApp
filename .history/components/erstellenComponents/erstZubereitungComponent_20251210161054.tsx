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
  const textareaRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {}}
        accessibilityRole="button"
      >
        <Text style={styles.labelText}>Zubereitung</Text>
        <ChevronRightIcon size={20} color={Color.neutralTextOrTabGrey} />
      </Pressable>
      <View style={styles.textinputContainer}>
        <TextInput
          ref={textareaRef}
          style={[
            styles.variableInputTextarea,
            Typography.subheadlineRegular,
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
  view: {
    width: "100%",
    alignItems: "center",
    flex: 1,
  },
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
  pressed: {
    opacity: 0.7,
  },
  textinputContainer: {
    paddingHorizontal: 8,
  },
  variableInputTextarea: {
    height: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: Color.neutralInputOnDark,
    color: Color.neutralTextOrTabGrey,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
  },
  variableInputTextareaFocused: {
    borderColor: Color.neutralWhite,
  },
});

export default ErstZubereitungComponent;
