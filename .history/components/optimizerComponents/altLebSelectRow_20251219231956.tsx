import { CloseXIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AltLebSelectRowProps {
  checked: boolean;
  text: string;
  onCheckPress: () => void;
  onRemovePress: () => void;
}

const RADIO_SIZE = 20;
const CONTAINER_SIZE = 44;
const INNER_CIRCLE_SIZE = 10;

export default function AltLebSelectRow({
  checked,
  text,
  onCheckPress,
  onRemovePress,
}: AltLebSelectRowProps) {
  return (
    <View style={styles.selectionRow}>
      <Pressable
        style={styles.rowPressable}
        onPress={onCheckPress}
        accessibilityRole="radio"
        accessibilityState={{ selected: checked }}
        accessibilityLabel={checked ? "Selected" : "Unselected"}
      >
        <View style={styles.radioContainer}>
          <View style={[styles.radio, checked && styles.selectedRadio]}>
            {checked && <View style={styles.innerCircle} />}
          </View>
        </View>
        <Text style={styles.rowText}>{text}</Text>
      </Pressable>
      <Pressable style={styles.removeClickContainer} onPress={onRemovePress}>
        <View style={styles.closexContainer}>
          <CloseXIcon size={16} color={Color.neutralTextOrTabGrey} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioContainer: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 1,
    borderColor: Color.neutralTextOrTabGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadio: {
    borderColor: Color.neutralWhite,
  },
  innerCircle: {
    width: INNER_CIRCLE_SIZE,
    height: INNER_CIRCLE_SIZE,
    borderRadius: INNER_CIRCLE_SIZE / 2,
    backgroundColor: Color.neutralWhite,
  },
  rowText: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
  removeClickContainer: {
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  closexContainer: {
    height: 24,
    width: 24,
    borderRadius: 9999,
    borderStyle: "solid",
    borderColor: Color.neutralStrokeColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
