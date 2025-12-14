import { Color, Typography } from "@/constants/GlobalStyles";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import NextButton from "../nextButton";

type Props = {
  value?: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
};

export default function AllergeneComponent({
  value,
  onChangeText,
  onFocus,
}: Props) {
  const [textareaFocused, setTextareaFocused] = useState(false);
  const textareaRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setTextareaFocused(true);
    if (onFocus) {
      // Delay to ensure keyboard animation starts
      setTimeout(() => {
        onFocus();
      }, 100);
    }
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}>
        Hast du Allergien oder gibt es Lebensmittel, die du lieber nicht essen
        möchtest?
      </Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.text, styles.greyText]}>
          (kann auch freigelassen werden)
        </Text>
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
          onFocus={handleFocus}
          onBlur={() => setTextareaFocused(false)}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 16,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  greyText: {
    color: Color.neutralTextOrTabGrey,
  },
  inputContainer: {
    gap: 4,
  },
  variableInputTextarea: {
    height: 125,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
    backgroundColor: Color.neutralInputOnDark,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  variableInputTextareaFocused: {
    borderColor: Color.neutralWhite,
  },
});
