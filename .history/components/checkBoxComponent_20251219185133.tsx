import { CheckMarkIcon } from "@/assets/icons/icons";
import { Color } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, View } from "react-native";

interface CheckboxComponentProps {
  checked?: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}

const CHECKBOX_SIZE = 20;
const CONTAINER_SIZE = 44;
const CHECKMARK_SIZE = 14;

export default function CheckboxComponent({
  checked = false,
  onPress,
  accessibilityLabel,
}: CheckboxComponentProps) {
  return (
     p
  );
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutralTextOrTabGrey,
  },
  selectedCheckbox: {
    backgroundColor: Color.neutralWhite,
    borderColor: Color.neutralWhite,
  },
});
