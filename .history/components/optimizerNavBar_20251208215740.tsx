import { Border, Color, Typography } from "@/constants/GlobalStyles";
import { BlurView } from "expo-blur";
import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NavBar = () => {
  return (
    <SafeAreaView style={styles.navBar}>
      <View style={styles.view}>
        <View style={styles.containerFlexBox} />
        <Text style={styles.title}>Optimizer</Text>
        <View style={[styles.rightContainer, styles.containerFlexBox]}>
          <Pressable
            style={[styles.clickContainer, styles.backgroundFlexBox]}
            onPress={() => {}}
          >
            <View style={[styles.background, styles.backgroundFlexBox]}>
              <BlurView intensity={4} style={styles.blurview}>
                <View style={styles.view2} />
              </BlurView>
              <View style={styles.settings}>
                <Image
                  style={[
                    styles.settingsSvgrepoCom1Icon,
                    styles.clickContainerPosition,
                  ]}
                  resizeMode="cover"
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
  navBar: {

    backgroundColor: "green",
  },
  containerFlexBox: {
    width: 32,
    alignSelf: "stretch",
    alignItems: "center",
  },
  backgroundFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  clickContainerPosition: {
    top: 0,
    position: "absolute",
  },
  view: {
    justifyContent: "space-between",
    gap: 0,
    alignItems: "center",
    flexDirection: "row",
    height: 44,
    width: "100%",
    backgroundColor: "yellow",
  },
  title: {
    ...Typography.title2Emphasized,
    color: Color.neutralWhite,
    textAlign: "center",
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    width: 32,
  },
  clickContainer: {
    width: 44,
    right: -8,
    padding: 4,
    zIndex: 0,
    top: 0,
    position: "absolute",
    justifyContent: "center",
    height: 44,
  },
  background: {
    borderRadius: Border.br_9999,
    backgroundColor: "transparent",
    paddingBottom: 2,
    overflow: "hidden",
    alignSelf: "stretch",
    justifyContent: "center",
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
  settings: {
    height: 20,
    width: 20,
  },
  settingsSvgrepoCom1Icon: {
    left: 0,
    width: 24,
    height: 24,
  },
});

export default NavBar;
