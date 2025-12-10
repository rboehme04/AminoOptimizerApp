import { Color, Typography } from "@/constants/GlobalStyles";
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
  const [leftTextCenter, setLeftTextCenter] = React.useState<number | null>(
    null
  );
  const [rightTextCenter, setRightTextCenter] = React.useState<number | null>(
    null
  );
  const [leftContainerX, setLeftContainerX] = React.useState<number | null>(
    null
  );
  const [rightContainerX, setRightContainerX] = React.useState<number | null>(
    null
  );

  const FIXED_LINE_WIDTH = 40; // Fixed width for the line
  const lineLeft = React.useRef(new Animated.Value(0)).current;
  const isInitialMount = React.useRef(true);

  const handleToggle = (side: "left" | "right") => {
    setActiveSide(side);
    onToggle?.(side);
  };

  React.useEffect(() => {
    const textCenter = activeSide === "left" ? leftTextCenter : rightTextCenter;

    if (textCenter !== null) {
      const targetLeft = textCenter - FIXED_LINE_WIDTH / 2;

      if (isInitialMount.current) {
        // Set initial values without animation
        lineLeft.setValue(targetLeft);
        isInitialMount.current = false;
      } else {
        // Animate to new values
        Animated.timing(lineLeft, {
          toValue: targetLeft,
          duration: 250,
          useNativeDriver: false, // left can't use native driver
        }).start();
      }
    }
  }, [activeSide, leftTextCenter, rightTextCenter, lineLeft]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textContainer}
        onPress={() => handleToggle("left")}
        onLayout={event => {
          const containerX = event.nativeEvent.layout.x;
          // Store container X for later use in text layout
          (event.target as any)._containerX = containerX;
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "left" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            // Get container X from parent Pressable
            const containerX =
              (event.target as any).parent?._containerX ??
              event.nativeEvent.layout.x;
            // Calculate center relative to container: containerX + textX + textWidth/2
            const textCenter = containerX + x + width / 2;
            setLeftTextCenter(textCenter);
          }}
        >
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.textContainer]}
        onPress={() => handleToggle("right")}
        onLayout={event => {
          const containerX = event.nativeEvent.layout.x;
          // Store container X for later use in text layout
          (event.target as any)._containerX = containerX;
        }}
      >
        <Text
          style={[
            styles.text,
            activeSide === "right" ? styles.activeText : null,
          ]}
          onLayout={event => {
            const { width, x } = event.nativeEvent.layout;
            // Get container X from parent Pressable
            const containerX =
              (event.target as any).parent?._containerX ??
              event.nativeEvent.layout.x;
            // Calculate center relative to container: containerX + textX + textWidth/2
            const textCenter = containerX + x + width / 2;
            setRightTextCenter(textCenter);
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
            width: FIXED_LINE_WIDTH,
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
    paddingTop: 10,
    paddingBottom: 14,
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
    bottom: 10,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderTopWidth: 2,
  },
});

export default LeftRightToggle;
