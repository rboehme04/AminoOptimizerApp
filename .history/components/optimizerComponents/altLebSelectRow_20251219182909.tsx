import { CloseXIcon } from "@/assets/icons/icons";
import CheckboxComponent from "@/components/checkBoxComponent";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AltLebSelectRowProps {
  checked: boolean;
  text: string;
  onCheckPress: () => void;
  onRemovePress: () => void;
}

export default function AltLebSelectRow({
  checked,
  text,
  onCheckPress,
  onRemovePress,
}: AltLebSelectRowProps) {
  return (
    <View style={styles.selectionRow}>
      <CheckboxComponent checked={checked} onPress={onCheckPress} />
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

