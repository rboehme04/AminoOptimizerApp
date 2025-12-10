import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface VariableInputTextareaProps extends TextInputProps {
  placeholder?: string;
}

const VariableInputTextarea: React.FC<VariableInputTextareaProps> = ({
  placeholder = "optional",
  value,
  onChangeText,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Color.neutralTextOrTabGrey}
        value={value}
        onChangeText={onChangeText}
        multiline
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 100,
    borderRadius: 18,
    backgroundColor: Color.colorGray100,
    paddingHorizontal: Padding.padding_10,
    paddingVertical: Padding.padding_10,
    alignSelf: "stretch",
  },
  input: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    flex: 1,
    minHeight: 80,
  },
});

export default VariableInputTextarea;
