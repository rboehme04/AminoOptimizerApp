import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Color, Gap, Typography } from "@/constants/GlobalStyles";

const RezSelectionAndFilterComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sortierungContainer}>
        <Pressable style={styles.clickContainer} onPress={() => {}}>
          <View style={[styles.badge, styles.badgeSelected]}>
            <Text style={styles.badgeText}>Letzte</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.clickContainer} onPress={() => {}}>
          <View style={[styles.badge, styles.badgeUnselected]}>
            <Text style={styles.badgeText}>Letzte</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.badge, styles.badgeUnselected]}
          onPress={() => {}}
        >
          
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  sortierungContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clickContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 36,
    gap: Gap.gap_8,
  },
  badgeSelected: {
    backgroundColor: Color.brand50GraphicsOrBrandButton,
  },
  badgeUnselected: {
    backgroundColor: Color.neutralInputOnDark,
  },
  badgeText: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
});

export default RezSelectionAndFilterComponent;
