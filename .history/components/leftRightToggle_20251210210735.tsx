import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface LeftRightToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  onToggle?: (value: "left" | "right") => void;
  initialValue?: "left" | "right";
}

const LeftRightToggle = ({
  leftLabel = "left",
  rightLabel = "right",
  onToggle,
  initialValue = "left",
}: LeftRightToggleProps) => {
  const [activeSide, setActiveSide] = React.useState<"left" | "right">(
    initialValue
  );

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.textContainer]}
        onPress={() => handleToggle("right")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : null,
          ]}
        >
          {rightLabel}
        </Text>
      </Pressable>
      <View
        style={[
          styles.line,
          activeSide === "left" ? styles.lineLeft : styles.lineRight,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: "red",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 3,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralButtonInactive,
  },
  activeText: {
    color: Color.neutralWhite,
  },
  line: {
    position: "absolute",
    height: 2,
    width: "30%",
    bottom: Padding.padding_10,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
  },
  lineLeft: {
    left: "2.5%",
  },
  lineRight: {
    left: "47.5%",
  },
});

export default LeftRightToggle;
