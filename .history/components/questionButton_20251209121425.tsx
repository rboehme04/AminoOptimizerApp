import { Color, Gap, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const QuestionButton = () => {
  return (
    <Pressable
      style={[styles.questionButton, styles.buttonFlexBox]}
      onPress={() => {}}
    >
      <View style={[styles.button, styles.buttonFlexBox]}>
        <Text style={styles.text}>Wie funktioniert es?</Text>
        <View style={styles.helpCircle}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke={Color.neutralWhite}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  questionButton: {
    height: 44,
    width: "100%",
    justifyContent: "center",
    overflow: "hidden",
    back
  },
  button: {
    height: 36,
    borderRadius: 18,
    borderStyle: "solid",
    borderColor: Color.neutralWhite,
    borderWidth: 1,
    paddingLeft: 12,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    gap: Gap.gap_8,
  },
  text: {
    ...Typography.subheadlineRegular,
    color: Color.neutralWhite,
    textAlign: "left",
  },
  helpCircle: {
    height: 24,
    width: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuestionButton;
