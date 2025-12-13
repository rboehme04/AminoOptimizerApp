import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  EditPencilIcon,
  ShareIcon,
  StarLineIcon,
} from "@/assets/icons/icons";
import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";

interface LebDetailTopComponentProps {
  navbarTitle?: string;
}

const LebDetailTopComponent = ({
  navbarTitle = "",
}: LebDetailTopComponentProps) => {
  const insets = useSafeAreaInsets();
  const rightActions = React.useMemo(
    () => [
      { icon: <StarLineIcon size={20} />, onPress: () => {} },
    ],
    []
  );

  return (
    <View
      style={[
        styles.imageBackground,
        styles.imageBackgroundNoPicture,
        { marginTop: -insets.top },
      ]}
    >
      <LinearGradient
        colors={["transparent", "transparent"]}
        locations={[0, 1]}
        style={[styles.overlay, { paddingTop: insets.top }]}
      >
        <NavBar title={navbarTitle} rightActions={rightActions} />
        <View style={styles.content}>
          <View style={[styles.titleContainer, { paddingTop: 32 }]}>
            <Text style={styles.titleText} numberOfLines={3} ellipsizeMode="tail">
              Frühstücks Bowl
            </Text>
          </View>
          <View style={styles.macrosContainer}>
            {[
              { value: "450 kcal", label: "Kalorien", align: "left" as const },
              { value: "15g", label: "Protein", align: "center" as const },
              { value: "71g", label: "Carbs", align: "center" as const },
              { value: "11g", label: "Fett", align: "right" as const },
            ].map((macro, index) => (
              <View key={index} style={styles.macroCard}>
                <Text style={[styles.macroValue, { textAlign: macro.align }]}>
                  {macro.value}
                </Text>
                <Text style={[styles.macroLabel, { textAlign: macro.align }]}>
                  {macro.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: 330,
    justifyContent: "space-between",
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  imageBackgroundNoPicture: {
    height: "auto",
    backgroundColor: Color.neutralBackgroundDarkElevated,
  },
  overlay: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingVertical: 24,
    gap: 12,
  },
  titleText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    flexShrink: 1,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroCard: {},
  macroValue: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
  macroLabel: {
    ...Typography.caption1Regular,
    color: Color.neutralWhite,
    opacity: 0.85,
    marginTop: 4,
    textAlign: "center",
  },
});

export default LebDetailTopComponent;
