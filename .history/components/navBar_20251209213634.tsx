import { ChevronLeftIcon, StarFullIcon } from "@/assets/icons/icons";
import { Border, Color, Padding, Typography } from "@/constants/GlobalStyles";
import { BlurView } from "@react-native-community/blur";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NavBar = () => {
  return (
    <SafeAreaView style={styles.navBar}>
      <View style={styles.view}>
        <View style={styles.containerLayout}>
          <Pressable
            style={[styles.clickContainer, styles.containerLayout]}
            onPress={() => {}}
          >
            <View style={styles.chevronLeft}>
              <ChevronLeftIcon />
            </View>
          </Pressable>
        </View>
        <Text style={styles.hinzufgen}>Hinzufügen</Text>
        <View style={[styles.rightContainer, styles.backgroundFlexBox]}>
          <View style={[styles.starNavBar, styles.containerLayout]}>
            <View style={[styles.background, styles.backgroundFlexBox]}>
              <BlurView style={styles.blurview} blurAmount={4}>
                <View style={styles.view2} />
              </BlurView>
              <View style={styles.starFull}>
                <StarFullIcon />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
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
    flex: 1,
  },
  clickContainer: {
    marginTop: -22,
    marginLeft: -22,
    top: "50%",
    left: "50%",
    zIndex: 0,
    justifyContent: "center",
    position: "absolute",
  },
  chevronLeft: {
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  hinzufgen: {
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
