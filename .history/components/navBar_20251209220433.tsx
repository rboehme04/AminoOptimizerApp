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
        <View>
      <View style={styles.leftRightContainer}>
        <Pressable style={[styles.clickContainer]} onPress={() => {}}>
          <ChevronLeftIcon size={28} />
        </Pressable>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.leftRightContainer]}>
        <Pressable
          style={[styles.clickContainer2, styles.clickContainerFlexBox]}
          onPress={() => {}}
        >
          <View style={[styles.background, styles.clickContainerFlexBox]}>
            <BlurView style={styles.blurview} intensity={4}>
              <View style={styles.view2} />
            </BlurView>
            <View style={styles.starFull}>
              <StarFullIcon size={20} />
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    width: "100%",
    paddingHorizontal: 4,
    backgroundColor: "red",
  },
  leftRightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clickContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  clickContainerFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  clickContainer2: {
    padding: Padding.padding_4,
    width: 44,
    justifyContent: "center",
    height: 44,
    flexDirection: "row",
  },
  title: {
    ...Typography.title2Regular,
    color: Color.neutralWhite,
    textAlign: "center",
    flex: 1,
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
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavBar;
