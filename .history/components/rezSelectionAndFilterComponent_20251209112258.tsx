import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Color, Gap, Typography } from "@/constants/GlobalStyles";

const RezSelectionAndFilterComponent = () => {
  const [selection, setSelection] = useState<"letzte" | "favoriten">("letzte");

  const isLetzte = selection === "letzte";
  const isFavoriten = selection === "favoriten";

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
              isLetzte ? styles.badgeSelected : styles.badgeUnselected,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isLetzte ? styles.badgeTextSelected : null,
              ]}
            >
              Letzte
            </Text>
          </View>
        </Pressable>
                fill={Color.neutralWhite}
              />
            </Svg>
            <Text style={styles.badgeText}>Favoriten</Text>
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
  badgeTextSelected: {
    color: Color.neutralBackgroundDark,
  },
});

export default RezSelectionAndFilterComponent;
