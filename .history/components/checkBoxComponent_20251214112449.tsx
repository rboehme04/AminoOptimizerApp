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
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={
        accessibilityLabel || (checked ? "Checked" : "Unchecked")
      }
    >
      <View style={[styles.checkbox, checked && styles.selectedCheckbox]}>
        {checked && (
          <CheckMarkIcon
            size={CHECKMARK_SIZE}
            color={Color.neutralButtonInactive}
          />
        )}
      </View>
    </Pressable>
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
    
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutralTextOrTabGrey,
  },
  selectedCheckbox: {
    backgroundColor: Color.neutralWhite,
    borderColor: Color.neutralWhite,
  },
});
