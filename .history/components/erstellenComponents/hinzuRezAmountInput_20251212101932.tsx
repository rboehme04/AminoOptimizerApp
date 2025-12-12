import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";

type HinzuRezAmountInputProps = {
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
};

const HinzuRezAmountInput = ({
  label = "Rezept Portionen",
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}: HinzuRezAmountInputProps) => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (nextValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, nextValue));
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleDecrement = () => handleChange(value - 1);
  const handleIncrement = () => handleChange(value + 1);

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <Pressable
            style={[
              styles.iconButton,
              value <= min ? styles.iconButtonDisabled : null,
            ]}
            onPress={handleDecrement}
            disabled={value <= min}
            accessibilityLabel="Portion verringern"
            accessibilityRole="button"
          >
            <ChevronLeftIcon size={20} color={Color.neutralWhite} />
          </Pressable>

          <Text style={styles.valueText}>{value}</Text>

          <Pressable
            style={[
              styles.iconButton,
              value >= max ? styles.iconButtonDisabled : null,
            ]}
            onPress={handleIncrement}
            disabled={value >= max}
            accessibilityLabel="Portion erhöhen"
            accessibilityRole="button"
          >
            <ChevronRightIcon size={20} color={Color.neutralWhite} />
          </Pressable>
        </View>

        <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
  },
  container: {
    width: "100%",
    minHeight: 80,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: Color.neutralInputOnDark,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonDisabled: {
    opacity: 0.4,
  },
  valueText: {
    ...Typography.title2Emphasized,
    color: Color.neutralWhite,
    minWidth: 24,
    textAlign: "center",
  },
  label: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    flex: 1,
    textAlign: "right",
  },
});

export default HinzuRezAmountInput;
