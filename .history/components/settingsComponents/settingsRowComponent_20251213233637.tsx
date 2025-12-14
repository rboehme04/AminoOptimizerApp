import { ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text } from "react-native";

interface SettingsRowComponentProps {
  text: string;
  onPress: () => void;
  isLast?: boolean;
  color?: string;
}

export default function SettingsRowComponent({
  text,
  onPress,
  isLast = false,
  color = Color.neutralButtonInactive,
}: SettingsRowComponentProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.rowItemContainer,
        isLast && styles.rowItemLast,
        pressed && styles.rowItemPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
      <ChevronRightIcon size={20} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.neutralStrokeColor,
  },
  rowItemLast: {
    borderBottomWidth: 0,
  },
  rowItemPressed: {
    opacity: 0.7,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
