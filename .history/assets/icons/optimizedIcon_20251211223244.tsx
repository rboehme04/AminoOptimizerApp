import { BoxShadow, Color, FontFamily, Width } from "@/constants/GlobalStyles";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MagicSparkleIcon } from "./icons";

const OptimizedBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.optimizedIcon}>
          <View style={[styles.polygonIcon, styles.polygonIconPosition]} />
          <View style={[styles.polygonIcon2, styles.polygonIconPosition]} />
          <View style={styles.magicSparkle}>
            <MagicSparkleIcon size={16} color={Color.neutralWhite} />
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.optimized}>Optimized</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: 30, 
    height: 30,
  },
  polygonIconPosition: {
    width: Width.width_24,
    bottom: 1,
    top: 1,

    maxHeight: "100%",
    left: "50%",
    position: "absolute",
  },
  view: {
    width: "100%",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  optimizedIcon: {
    width: 30,
    height: 30,
    ...BoxShadow.shadowXl,
    overflow: "hidden",
    position: "relative",
  },
  polygonIcon: {
    borderRadius: 7,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    opacity: 0.9,
  },
  polygonIcon2: {
    borderRadius: 4,
    backgroundColor: Color.brand40LetzteButtonOrBlueText,
    opacity: 0.8,
  },
  magicSparkle: {
    marginLeft: -8,
    top: 7,
    bottom: 7,
    ...BoxShadow.shadow2Xl,
    width: 16,
    left: "50%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignSelf: "stretch",
  },
  optimized: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: FontFamily.sFPro,
    color: Color.colorDarkgray,
    textAlign: "center",
    alignSelf: "stretch",
  },
});

export default OptimizedBadge;
