import { StyleSheet, View } from "react-native";
import { Color } from "@/constants/GlobalStyles";

export default function CheckboxComponent({ checked = false, onPress }: { checked: boolean, onPress: () => void }) {
  return (
    <View style={styles.container}>
        <View style={[styles.checkbox, checked ? styles.selectedCheckbox : {}]}>
        </View>
    </View>
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