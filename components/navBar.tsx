import { ChevronLeftIcon } from "@/assets/icons/icons";
import { Border, Color, Typography } from "@/constants/GlobalStyles";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Type for each action button in the navbar
export interface NavBarAction {
  icon: React.ReactNode;
  onPress: () => void;
}

interface NavBarProps {
  isBold?: boolean;
  isBackButton?: boolean;
  title?: string;
  rightActions?: NavBarAction[];
  backIcon?: React.ReactNode;
  onBackPress?: () => void;
}

// Reusable action button component with blur background
const ActionButton = ({ icon, onPress }: NavBarAction) => (
  <Pressable
    style={[styles.clickContainer2, styles.clickContainerFlexBox]}
    onPress={onPress}
  >
    <View style={[styles.background, styles.clickContainerFlexBox]}>
      <BlurView style={styles.blurview} intensity={4}>
        <View style={styles.view2} />
      </BlurView>
      <View style={styles.iconContainer}>{icon}</View>
    </View>
  </Pressable>
);

const NavBar = ({
  isBold = false,
  isBackButton = true,
  title = "Title",
  rightActions = [],
  backIcon = <ChevronLeftIcon size={28} />,
  onBackPress,
}: NavBarProps) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView edges={["left", "right"]}>
      <View style={[styles.view, styles.viewFlexBox]}>
        <View style={styles.viewFlexBox}>
          {isBackButton ? (
            <Pressable
              style={[styles.clickContainer, styles.clickContainerFlexBox]}
              onPress={handleBackPress}
            >
              {backIcon}
            </Pressable>
          ) : (
            <View
              style={[styles.clickContainer, styles.clickContainerFlexBox]}
            />
          )}
        </View>
        <Text
          style={[
            styles.optimizer,
            isBold ? Typography.title2Emphasized : Typography.title2Regular,
          ]}
        >
          {title}
        </Text>
        <View style={styles.actionsContainer}>
          {rightActions.map((action, index) => (
            <ActionButton
              key={index}
              icon={action.icon}
              onPress={action.onPress}
            />
          ))}
          {/* Spacer to maintain layout when no actions */}
          {rightActions.length === 0 && <View style={styles.clickContainer} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  clickContainerFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    justifyContent: "space-between",
    gap: 0,
    height: 44,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
  clickContainer: {
    justifyContent: "center",
    width: 44,
    height: 44,
  },
  optimizer: {
    color: Color.neutralWhite,
    textAlign: "center",
    flex: 1,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clickContainer2: {
    padding: 4,
    width: 44,
    justifyContent: "center",
    height: 44,
    flexDirection: "row",
  },
  background: {
    alignSelf: "stretch",
    borderRadius: Border.br_9999,
    backgroundColor: "transparent",
    overflow: "hidden",
    flexDirection: "row",
    flex: 1,
  },
  blurview: {
    opacity: 0.16,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    position: "absolute",
  },
  view2: {
    backgroundColor: Color.neutralBlackText,
    height: "100%",
    width: "100%",
  },
});

export default NavBar;
