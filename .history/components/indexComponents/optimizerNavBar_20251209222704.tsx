import { ChevronLeftIcon, SettingsIcon } from "@/assets/icons/icons";
import {
  Border,
  Color,
  Height,
  Typography,
  Width,
} from "@/constants/GlobalStyles";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BAOptNavBarProps {
  isBold?: boolean;
  isBackButton?: boolean;
}

const BAOptNavBar = ({
  isBold = false,
  isBackButton = true,
}: BAOptNavBarProps) => {
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]}>
      <View style={[styles.view, styles.viewFlexBox]}>
        <View style={styles.viewFlexBox}>
          {isBackButton ? (
            <Pressable
              style={[styles.clickContainer, styles.clickContainerFlexBox]}
              onPress={() => {}}
            >
              <ChevronLeftIcon size={28} />
            </Pressable>
          ) : (
            <View style={[styles.clickContainer, styles.clickContainerFlexBox]} />
          )}
        </View>
        <Text
          style={[
            styles.optimizer,
            isBold ? Typography.title2Emphasized : Typography.title2Regular,
          ]}
        >
          Optimizer
        </Text>
        <View style={styles.viewFlexBox}>
          <Pressable
            style={[styles.clickContainer2, styles.clickContainerFlexBox]}
            onPress={() => {}}
          >
            <View style={[styles.background, styles.clickContainerFlexBox]}>
              <BlurView style={styles.blurview} intensity={4}>
                <View style={styles.view2} />
              </BlurView>
              <View style={styles.settingsLayout}>
                <SettingsIcon
                  width={Width.width_24}
                  height={Height.height_24}
                />
              </View>
            </View>
          </Pressable>
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
  settingsLayout: {
    width: Width.width_24,
    height: Height.height_24,
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
  settingsSvgrepoCom1Icon: {
    top: 0,
    left: 0,
    position: "absolute",
  },
});

export default BAOptNavBar;
