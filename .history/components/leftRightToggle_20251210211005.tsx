import { Color, Padding, Typography } from "@/constants/GlobalStyles";
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
  const [leftTextLayout, setLeftTextLayout] = React.useState<{
    width: number;
    x: number;
  } | null>(null);
  const [rightTextLayout, setRightTextLayout] = React.useState<{
    width: number;
    x: number;
  } | null>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  const activeLayout =
    activeSide === "left" ? leftTextLayout : rightTextLayout;

  const lineStyle = activeLayout
    ? {
        width: activeLayout.width,
        left: activeLayout.x,
      }
    : {};

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
          onLayout={(event) => {
            const { width, x } = event.nativeEvent.layout;
            setLeftTextLayout({ width, x });
          }}
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
          onLayout={(event) => {
            const { width, x } = event.nativeEvent.layout;
            setRightTextLayout({ width, x });
          }}
        >
          {rightLabel}
        </Text>
      </Pressable>
      <View
        style={[
          styles.line,
          lineStyle,
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
    bottom: Padding.padding_10,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
  },
});

export default LeftRightToggle;
