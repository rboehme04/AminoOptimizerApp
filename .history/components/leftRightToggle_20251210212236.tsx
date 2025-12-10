import { Color, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

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
  const [leftContainerLayout, setLeftContainerLayout] = React.useState<{
    x: number;
  } | null>(null);
  const [rightContainerLayout, setRightContainerLayout] = React.useState<{
    x: number;
  } | null>(null);

  const lineLeft = React.useRef(new Animated.Value(0)).current;
  const lineWidth = React.useRef(new Animated.Value(0)).current;
  const isInitialMount = React.useRef(true);

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  React.useEffect(() => {
    let targetLeft = 0;
    let targetWidth = 0;

    if (activeSide === "left" && leftTextLayout && leftContainerLayout) {
      const absoluteX = leftContainerLayout.x + leftTextLayout.x;
      const textWidth = leftTextLayout.width;
      targetWidth = textWidth * 1.2; // 10% longer on each side (20% total)
      targetLeft = absoluteX - textWidth * 0.1; // Shift left by 10% of text width
    } else if (
      activeSide === "right" &&
      rightTextLayout &&
      rightContainerLayout
    ) {
      const absoluteX = rightContainerLayout.x + rightTextLayout.x;
      const textWidth = rightTextLayout.width;
      targetWidth = textWidth * 1.2; // 10% longer on each side (20% total)
      targetLeft = absoluteX - textWidth * 0.1; // Shift left by 10% of text width
    }

    if (targetWidth > 0 && targetLeft >= 0) {
      if (isInitialMount.current) {
        // Set initial values without animation
        lineLeft.setValue(targetLeft);
        lineWidth.setValue(targetWidth);
        isInitialMount.current = false;
      } else {
        // Animate to new values
        Animated.parallel([
          Animated.timing(lineLeft, {
            toValue: targetLeft,
            duration: 250,
            useNativeDriver: false, // left/width can't use native driver
          }),
          Animated.timing(lineWidth, {
            toValue: targetWidth,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }
  }, [
    activeSide,
    leftTextLayout,
    rightTextLayout,
    leftContainerLayout,
    rightContainerLayout,
    lineLeft,
    lineWidth,
  ]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
        onLayout={event => {
          const { x } = event.nativeEvent.layout;
          setLeftContainerLayout({ x });
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
          onLayout={event => {
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
        onLayout={event => {
          const { x } = event.nativeEvent.layout;
          setRightContainerLayout({ x });
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            setRightTextLayout({ width, x });
          }}
        >
          {rightLabel}
        </Text>
      </Pressable>
      <Animated.View
        style={[
          styles.line,
          {
            left: lineLeft,
            width: lineWidth,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 3,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 30,
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
    bottom: 16,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
  },
});

export default LeftRightToggle;
