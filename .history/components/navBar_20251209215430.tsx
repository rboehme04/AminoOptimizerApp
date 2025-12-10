import { ChevronLeftIcon, StarFullIcon } from "@/assets/icons/icons";
import { Border, Color, Padding, Typography } from "@/constants/GlobalStyles";
import { BlurView } from "expo-blur";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NavBarProps {
  title: string;
}

const NavBar = ({ title }: NavBarProps) => {
  return (
    <SafeAreaView style={styles.navBar}>
        <View style={styles.leftRightContainer}>
          <Pressable
            style={[styles.clickContainer]}
            onPress={() => {}}
          >
           
              <ChevronLeftIcon size={28} />
            </View>
          </Pressable>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.rightContainer, styles.backgroundFlexBox]}>
          <View style={[styles.starNavBar, styles.containerLayout]}>
            <View style={[styles.background, styles.backgroundFlexBox]}>
              <BlurView style={styles.blurview} intensity={4}>
                <View style={styles.view2} />
              </BlurView>
              <View style={styles.starFull}>
                <StarFullIcon />
              </View>
            </View>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 4,
    backgroundColor: "red",
  },
  leftRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerLayout: {
    width: 44,
    alignItems: "center",
    flexDirection: "row",
    height: 44,
  },
  backgroundFlexBox: {
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  view: {
    justifyContent: "space-between",
    paddingHorizontal: Padding.padding_4,
    paddingVertical: 0,
    gap: 0,
    alignItems: "center",
    flexDirection: "row",
    height: 44,
    width: "100%",
  },
  clickContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Typography.title2Regular,
    color: Color.neutralWhite,
    textAlign: "center",
    flex: 1,
  },
  rightContainer: {
    minWidth: 44,
  },
  starNavBar: {
    padding: Padding.padding_4,
    justifyContent: "center",
  },
  background: {
    alignSelf: "stretch",
    borderRadius: Border.br_9999,
    backgroundColor: "transparent",
    justifyContent: "center",
    flex: 1,
  },
  blurview: {
    opacity: 0.1599999964237213,
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
  starFull: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavBar;
