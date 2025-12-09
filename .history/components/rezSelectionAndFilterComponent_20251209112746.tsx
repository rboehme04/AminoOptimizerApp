import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Color, Gap, Typography } from "@/constants/GlobalStyles";

const starPath =
  "M6.89328 1.52355C7.10623 1.21487 7.44887 0.839722 7.99995 0.839722C8.55103 0.839722 8.89367 1.21487 9.10662 1.52355C9.3166 1.82791 9.52992 2.26026 9.77109 2.74903L10.6387 4.50699C10.72 4.67171 10.7618 4.755 10.7967 4.81195L10.7985 4.8148L10.8018 4.8156C10.8667 4.83122 10.9589 4.84527 11.1406 4.87168L13.0807 5.15358C13.62 5.2319 14.0971 5.30119 14.4515 5.40683C14.8109 5.51397 15.2735 5.72391 15.4438 6.24802C15.6141 6.77213 15.3632 7.21392 15.1355 7.51185C14.9109 7.8056 14.5656 8.14209 14.1753 8.52249L12.7715 9.89086C12.6399 10.0191 12.5737 10.0846 12.5303 10.1354L12.5281 10.138L12.5284 10.1413C12.5336 10.2079 12.5487 10.2999 12.5797 10.4809L12.9111 12.4131C13.0033 12.9503 13.0849 13.4255 13.0939 13.7951C13.1031 14.17 13.0464 14.6749 12.6005 14.9988C12.1547 15.3228 11.657 15.2207 11.3033 15.0961C10.9545 14.9733 10.5278 14.7489 10.0454 14.4952L8.31018 13.583C8.14759 13.4975 8.06479 13.4547 8.00305 13.4291L7.99995 13.4279L7.99685 13.4291C7.93511 13.4547 7.85231 13.4975 7.68972 13.583L5.95451 14.4952C5.47212 14.7489 5.04541 14.9733 4.69664 15.0961C4.34291 15.2207 3.84521 15.3228 3.39938 14.9988C2.95354 14.6749 2.89685 14.17 2.906 13.7951C2.91503 13.4255 2.99658 12.9503 3.08876 12.4131L3.42016 10.4809C3.45121 10.2999 3.46633 10.2079 3.47154 10.1413L3.47179 10.138L3.46962 10.1354C3.42625 10.0846 3.35997 10.0191 3.22843 9.89086L1.86076 8.55771C1.84867 8.54592 1.83661 8.53418 1.8246 8.52247C1.43429 8.14208 1.08902 7.80559 0.864446 7.51185C0.636675 7.21392 0.385771 6.77213 0.556065 6.24802C0.726358 5.72391 1.18902 5.51397 1.54841 5.40683C1.90275 5.30119 2.37986 5.2319 2.91922 5.15358C2.93582 5.15117 2.95247 5.14875 2.96918 5.14632L4.85925 4.87168C5.04104 4.84527 5.13318 4.83122 5.19814 4.8156L5.2014 4.81481L5.20316 4.81195C5.23809 4.755 5.27992 4.67171 5.36121 4.50699L6.20648 2.79429C6.21395 2.77915 6.2214 2.76406 6.22882 2.74902C6.46998 2.26026 6.68331 1.82791 6.89328 1.52355ZM7.99078 2.2807C7.84319 2.49463 7.67257 2.83639 7.40213 3.38438L6.54726 5.11653C6.47966 5.25357 6.41069 5.39339 6.33972 5.50909C6.25828 5.64187 6.15147 5.78252 5.98981 5.89997C5.82816 6.01742 5.66139 6.07553 5.50994 6.11196C5.37797 6.1437 5.22367 6.1661 5.07245 6.18804C5.06528 6.18908 5.05813 6.19012 5.05099 6.19116L3.16092 6.4658C2.55617 6.55367 2.17841 6.61033 1.92935 6.68459C1.92408 6.68616 1.91896 6.68771 1.914 6.68924C1.91711 6.6934 1.92034 6.69766 1.92368 6.70203C2.08153 6.9085 2.35385 7.17638 2.79144 7.60293L4.15911 8.93608C4.16428 8.94111 4.16945 8.94616 4.17463 8.9512C4.28407 9.05785 4.39575 9.16666 4.48386 9.26991C4.58497 9.3884 4.68573 9.53344 4.74748 9.72348C4.80923 9.91352 4.81296 10.0901 4.80081 10.2454C4.79021 10.3807 4.76383 10.5344 4.73797 10.685L4.41144 12.5888C4.30814 13.1911 4.24529 13.5679 4.23894 13.8277C4.23881 13.8332 4.2387 13.8385 4.23862 13.8437C4.24354 13.842 4.24859 13.8403 4.25378 13.8385C4.49892 13.7521 4.83784 13.5759 5.37874 13.2916L7.08847 12.3927C7.22371 12.3216 7.3617 12.249 7.48712 12.1971C7.63105 12.1375 7.80013 12.0865 7.99995 12.0865C8.19977 12.0865 8.36885 12.1375 8.51278 12.1971C8.63822 12.249 8.77622 12.3216 8.91147 12.3927L10.6212 13.2916C11.1621 13.5759 11.501 13.7521 11.7461 13.8385C11.7513 13.8403 11.7564 13.842 11.7613 13.8437C11.7612 13.8385 11.7611 13.8332 11.761 13.8277C11.7546 13.5679 11.6918 13.1911 11.5885 12.5888L11.2656 10.7063C11.2644 10.6992 11.2632 10.6921 11.2619 10.685C11.2361 10.5344 11.2097 10.3807 11.1991 10.2454C11.1869 10.0901 11.1907 9.91352 11.2524 9.72348C11.3142 9.53344 11.4149 9.3884 11.516 9.26991C11.6042 9.16666 11.7158 9.05786 11.8253 8.95122L13.2085 7.60293C13.6461 7.17638 13.9184 6.9085 14.0762 6.70203C14.0796 6.69766 14.0828 6.6934 14.0859 6.68924C14.0809 6.68771 14.0758 6.68616 14.0706 6.68459C13.8215 6.61033 13.4437 6.55367 12.839 6.4658L10.9275 6.18804C10.7762 6.1661 10.6219 6.1437 10.49 6.11196C10.3385 6.07553 10.1717 6.01742 10.0101 5.89997C9.84843 5.78252 9.74163 5.64187 9.66018 5.50909C9.58922 5.39339 9.52024 5.25357 9.45264 5.11653L8.59778 3.38438C8.32733 2.83639 8.15671 2.49462 8.00912 2.2807C8.006 2.27617 8.00294 2.27178 7.99995 2.26753C7.99696 2.27178 7.9939 2.27617 7.99078 2.2807ZM7.90173 2.1486C7.89836 2.14643 7.89664 2.14478 7.89664 2.14478L7.90173 2.1486ZM11.9106 13.8822L11.917 13.8823C11.917 13.8823 11.9151 13.8826 11.9106 13.8822Z";

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

        <Pressable
          style={styles.clickContainer}
          onPress={() => setSelection("favoriten")}
        >
          <View
            style={[
              styles.badge,
              isFavoriten ? styles.badgeSelected : styles.badgeUnselected,
            ]}
          >
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d={starPath}
                fill={isFavoriten ? Color.neutralInputOnDark : Color.neutralWhite}
              />
            </Svg>
            <Text
              style={[
                styles.badgeText,
                isFavoriten ? styles.badgeTextSelected : null,
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
