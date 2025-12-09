import { useRouter } from "expo-router";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";

const RezeptErstellenButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/CreateRecipe");
  };

  return (
    <Pressable style={styles.rezeptErstellenButton} onPress={handlePress}>
      <View style={styles.iconWrapper}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.4916 3.09426C16.9162 2.66958 17.5251 2.48524 18.114 2.60303C19.7707 2.93437 21.0657 4.22935 21.397 5.88605C21.5148 6.47497 21.3305 7.08379 20.9058 7.50847L13.2929 15.1214L13.2331 15.1815C13.0104 15.4062 12.727 15.6921 12.3512 15.8478C11.9753 16.0035 11.5728 16.0017 11.2564 16.0003L11.1716 16H9.5L9.47654 16.0001C9.38313 16.0002 9.23037 16.0005 9.09244 15.982C8.91347 15.9579 8.6195 15.8873 8.36612 15.6339C8.11274 15.3805 8.04213 15.0866 8.01807 14.9076C7.99953 14.7697 7.9998 14.6169 7.99997 14.5235L8 14.5V12.8285L7.99975 12.7437C7.99835 12.4273 7.99658 12.0247 8.15224 11.6489C8.30791 11.2731 8.59382 10.9897 8.81855 10.7669L8.87868 10.7071L16.4916 3.09426ZM15 7.41425L10.2929 12.1214C10.138 12.2762 10.0612 12.354 10.0098 12.4138L10.007 12.4171L10.0066 12.4214C10.0007 12.5001 10 12.6094 10 12.8285V14H11.1716C11.3906 14 11.5 13.9994 11.5786 13.9934L11.5829 13.9931L11.5862 13.9902C11.646 13.9389 11.7238 13.862 11.8787 13.7071L16.5858 9.00003L15 7.41425ZM16.4142 6.00003L18 7.58582L19.4122 6.17359C19.2162 5.39365 18.6064 4.78386 17.8264 4.5878L16.4142 6.00003Z"
            fill={Color.neutralWhite}
          />
          <Path
            d="M11.9268 3.00003L12 3.00003V5.00003C10.0861 5.00003 8.7513 5.00216 7.74416 5.13756C6.76579 5.2691 6.2477 5.5097 5.87868 5.87871C5.50966 6.24773 5.26907 6.76583 5.13753 7.74419C5.00213 8.75133 5 10.0861 5 12C5 13.9139 5.00213 15.2487 5.13753 16.2559C5.26907 17.2342 5.50966 17.7523 5.87868 18.1214C6.2477 18.4904 6.76579 18.731 7.74416 18.8625C8.7513 18.9979 10.0861 19 12 19C13.9139 19 15.2487 18.9979 16.2558 18.8625C17.2342 18.731 17.7523 18.4904 18.1213 18.1214C18.4903 17.7523 18.7309 17.2342 18.8625 16.2559C18.9979 15.2487 19 13.9139 19 12H21V12.0732C21 13.8966 21.0001 15.3664 20.8446 16.5224C20.6833 17.7225 20.3381 18.733 19.5355 19.5356C18.733 20.3381 17.7225 20.6833 16.5223 20.8447C15.3664 21.0001 13.8966 21.0001 12.0731 21H11.9269C10.1034 21.0001 8.63363 21.0001 7.47767 20.8447C6.27752 20.6833 5.26702 20.3381 4.46447 19.5356C3.66191 18.733 3.31672 17.7225 3.15537 16.5224C2.99995 15.3664 2.99997 13.8967 3 12.0732V11.9269C2.99997 10.1034 2.99995 8.63365 3.15537 7.4777C3.31672 6.27755 3.66191 5.26705 4.46447 4.4645C5.26702 3.66194 6.27752 3.31675 7.47767 3.1554C8.63362 2.99998 10.1034 3 11.9268 3.00003Z"
            fill={Color.neutralWhite}
          />
        </Svg>
      </View>
      <Text style={styles.text}>Rezept erstellen</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rezeptErstellenButton: {
    width: "100%",
    minHeight: 44,
    backgroundColor: Color.neutralInputOnDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingTop: Padding.padding_10,
    paddingRight: 24,
    paddingBottom: Padding.padding_10,
    gap: Gap.gap_8,
    borderRadius: 18,
    overflow: "hidden",
  },
  iconWrapper: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
    textAlign: "center",
  },
});

export default RezeptErstellenButton;
