import { Color } from "@/constants/GlobalStyles";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  current: number;
  max: number;
  height?: number;
}

export default function ProgressBar({
  current,
  max,
  height = 10,
}: ProgressBarProps) {
  const percentage =
    max === 0 ? 100 : Math.min(Math.max((current / max) * 100, 0), 100);

  const fillColor =
    percentage >= 100 ? Color.success50 : Color.brand50GraphicsOrBrandButton;

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${percentage}%`,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Color.neutralButtonInactive,
    borderRadius: 9999,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 9999,
  },
});
