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
        style={styles.radioContainer}
        onPress={onCheckPress}
        accessibilityRole="radio"
        accessibilityState={{ selected: checked }}
        accessibilityLabel={checked ? "Selected" : "Unselected"}
      >
        <View style={[styles.radio, checked && styles.selectedRadio]}>
          {checked && <View style={styles.innerCircle} />}
        </View>
      </Pressable>
      <Text style={styles.rowText}>{text}</Text>
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
