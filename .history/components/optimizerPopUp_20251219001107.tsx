import { CloseXIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PopUpProps {
  titleText?: string;
  descriptionText?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  rightButtonColor?: string;
  rightButtonTextColor?: string;
  isNotShowAgain?: boolean;
  isShowButtons?: boolean;
  onClose?: () => void;
  onRightButtonPress?: () => void;
  children?: ReactNode;
}

export default function OptimizerPopUp({
  titleText = "Title",
  descriptionText = "Description text",
  leftButtonText = "Left Button",
  rightButtonText = "Right Button",
  rightButtonColor = Color.neutralTagColor,
  rightButtonTextColor = Color.neutralWhite,
  isNotShowAgain = false,
  isShowButtons = false,
  onClose,
  onRightButtonPress,
  children,
}: PopUpProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const textRef = useRef<Text>(null);

  useEffect(() => {
    if (collapsedHeight !== null && expandedHeight !== null) {
      Animated.timing(animatedHeight, {
        toValue: isDescriptionExpanded ? expandedHeight : collapsedHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDescriptionExpanded, collapsedHeight, expandedHeight]);

  const handleLeftButtonPress = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleRightButtonPress = () => {
    if (onRightButtonPress) {
      onRightButtonPress();
    }
  };

  const handleTextLayout = (event: { nativeEvent: { layout: LayoutRectangle } }) => {
    const { height } = event.nativeEvent.layout;
    if (collapsedHeight === null) {
      setCollapsedHeight(height);
      animatedHeight.setValue(height);
    } else if (expandedHeight === null && height > (collapsedHeight || 0)) {
      setExpandedHeight(height);
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={handleLeftButtonPress} />
      <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={handleLeftButtonPress}>
          <CloseXIcon size={20} color={Color.neutralWhite} />
        </Pressable>

        <Text style={styles.titleText}>{titleText}</Text>

        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Pressable onPress={toggleDescription}>
              <Text
                style={styles.descriptionText}
                numberOfLines={isDescriptionExpanded ? undefined : 2}
              >
                {descriptionText}
              </Text>
            </Pressable>
            {children}
          </View>
          {isShowButtons && (
            <View style={styles.buttonRowContainer}>
              <Pressable
                style={[
                  styles.buttonOuterContainer,
                  styles.leftButtonContainer,
                ]}
                onPress={handleLeftButtonPress}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{leftButtonText}</Text>
                </View>
              </Pressable>
              <Pressable
                style={[
                  styles.buttonOuterContainer,
                  styles.rightButtonContainer,
                ]}
                onPress={handleRightButtonPress}
              >
                <View
                  style={[styles.button, { backgroundColor: rightButtonColor }]}
                >
                  <Text
                    style={[styles.buttonText, { color: rightButtonTextColor }]}
                  >
                    {rightButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    width: "95%",
    padding: 16,
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 18,
    zIndex: 1001,
    elevation: 1001,
    gap: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 1002,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    gap: 16,
  },
  textContainer: {
    gap: 4,
  },
  titleText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
  },
  descriptionText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
  buttonRowContainer: {
    flexDirection: "row",
    gap: 16,
  },
  buttonOuterContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 2,
  },
  leftButtonContainer: {
    flex: 1,
  },
  rightButtonContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Color.neutralTagColor,
  },
  buttonText: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  notShowAgainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notShowAgainText: {
    flex: 1,
  },
});
