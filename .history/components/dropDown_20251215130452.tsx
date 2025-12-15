import { Color, Typography } from "@/constants/GlobalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface DropDownProps {
  onSelect?: (value: string) => void;
  width?: number;
  items?: string[];
}

const defaultDropdownItems = [
  "Frucht, mittelgroß",
  "Frucht, klein",
  "Frucht, groß",
  "1 g",
  "1 kg",
];

export default function DropDown({
  onSelect,
  width = 250,
  items = defaultDropdownItems,
}: DropDownProps) {
  const handlePress = (item: string) => {
    onSelect?.(item);
  };

  return (
    <View style={[styles.container, { width }]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Pressable
            key={index}
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              isLast ? styles.lastRowContainer : styles.rowContainer,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.text}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 18,
    overflow: "hidden",
  },
  rowContainer: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.neutralStrokeColor,
  },
  lastRowContainer: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
  },
});
