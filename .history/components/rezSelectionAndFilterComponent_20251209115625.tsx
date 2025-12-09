import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import StarFullIcon from "@/assets/icons/starfull_icon.svg";
import StarLineIcon from "@/assets/icons/starline_icon.svg";

import { Color, Gap, Typography } from "@/constants/GlobalStyles";

const RezSelectionAndFilterComponent = () => {
  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");

  return (
    <View style={styles.container}>
      <View style={styles.sortierungContainer}>
        <Pressable
          style={styles.clickContainer}
          onPress={() => setSelection("letzte")}
        >
          <View
            style={[
              styles.badge,
              selection === "letzte"
                ? styles.badgeSelected
                : styles.badgeUnselected,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                selection === "letzte" && styles.badgeTextSelected,
              ]}
            >
              Letzte
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.clickContainer}
          onPress={() => setSelection("favoriten")}
        >
          <View
            style={[
              styles.badge,
              selection === "favoriten"
                ? styles.badgeSelected
                : styles.badgeUnselected,
            ]}
          >
            {selection === "favoriten" ? (
              <StarFullIcon width={16} height={16} />
            ) : (
              <StarLineIcon width={16} height={16} />
            )}
            <Text
              style={[
                styles.badgeText,
                selection === "favoriten" && styles.badgeTextSelected,
              ]}
            >
              Favoriten
            </Text>
          </View>
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
  badgeTextSelected: {
    color: Color.neutralBackgroundDark,
  },
});

export default RezSelectionAndFilterComponent;
