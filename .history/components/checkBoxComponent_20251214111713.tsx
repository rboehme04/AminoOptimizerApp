import { Pressable, StyleSheet, View } from "react-native";
import { Color } from "@/constants/GlobalStyles";

export default function CheckboxComponent({ checked = false, onPress }: { checked: boolean, onPress: () => void }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={[styles.checkbox, checked ? styles.selectedCheckbox : {}]}>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.neutralTextOrTabGrey,
  },
  selectedCheckbox: {
    backgroundColor: Color.neutralWhite,
    borderColor: Color.neutralWhite,
  },
});