import { Color, Gap, Padding, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml, SvgProps } from "react-native-svg";

const MAGIC_SPARKLE_XML = `<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_dd_29556_5479)"><g filter="url(#filter1_dd_29556_5479)"><path d="M25.3382 9.81204L25.1456 10.1331C25.0816 10.2397 25.0496 10.2931 25.0061 10.3366C24.9626 10.3801 24.9093 10.4121 24.8026 10.4761L24.4816 10.6687C24.1625 10.8602 24.0029 10.9559 24.0029 11.0975C24.0029 11.239 24.1625 11.3347 24.4816 11.5262L24.8026 11.7188C24.9093 11.7828 24.9626 11.8148 25.0061 11.8583C25.0496 11.9019 25.0816 11.9552 25.1456 12.0618L25.3382 12.3829C25.5297 12.702 25.6254 12.8615 25.767 12.8615C25.9085 12.8615 26.0043 12.702 26.1957 12.3829L26.3884 12.0618C26.4524 11.9552 26.4843 11.9019 26.5279 11.8583C26.5714 11.8148 26.6247 11.7828 26.7314 11.7188L27.0524 11.5262C27.3715 11.3347 27.5311 11.239 27.5311 11.0975C27.5311 10.9559 27.3715 10.8602 27.0524 10.6687L26.7314 10.4761C26.6247 10.4121 26.5714 10.3801 26.5279 10.3366C26.4843 10.2931 26.4524 10.2397 26.3884 10.1331L26.1957 9.81204C26.0043 9.49293 25.9085 9.33337 25.767 9.33337C25.6254 9.33337 25.5297 9.49293 25.3382 9.81204Z" fill="white"/><path d="M28.517 13.2225C28.4171 13.1725 28.3672 13.1475 28.3247 13.1131C28.2978 13.0913 28.2732 13.0667 28.2514 13.0398C28.2169 12.9973 28.1919 12.9474 28.142 12.8475C28.0117 12.587 27.9466 12.4567 27.8545 12.4223C27.7981 12.4012 27.7359 12.4012 27.6795 12.4223C27.5874 12.4567 27.5222 12.587 27.392 12.8475C27.3421 12.9473 27.3171 12.9973 27.2826 13.0398C27.2608 13.0667 27.2362 13.0913 27.2093 13.1131C27.1668 13.1475 27.1169 13.1725 27.017 13.2225C26.7565 13.3527 26.6262 13.4178 26.5918 13.51C26.5707 13.5664 26.5707 13.6285 26.5918 13.685C26.6262 13.7771 26.7565 13.8422 27.017 13.9725C27.1169 14.0224 27.1668 14.0474 27.2093 14.0818C27.2362 14.1037 27.2608 14.1282 27.2826 14.1552C27.3171 14.1976 27.342 14.2476 27.392 14.3475C27.5222 14.608 27.5874 14.7382 27.6795 14.7726C27.7359 14.7937 27.7981 14.7937 27.8545 14.7726C27.9466 14.7382 28.0117 14.608 28.142 14.3475C28.1919 14.2476 28.2169 14.1976 28.2514 14.1552C28.2732 14.1282 28.2978 14.1037 28.3247 14.0818C28.3672 14.0474 28.4171 14.0224 28.517 13.9725C28.7775 13.8422 28.9077 13.7771 28.9422 13.685C28.9632 13.6285 28.9632 13.5664 28.9422 13.51C28.9077 13.4178 28.7775 13.3527 28.517 13.2225Z" fill="white"/><path d="M22.3674 11.9193C22.4501 11.7799 22.6455 11.4975 23.017 11.4975C23.3885 11.4975 23.5839 11.7799 23.6666 11.9193C23.7549 12.0682 23.8403 12.2733 23.9279 12.4835L24.4118 13.645C24.5837 14.0575 24.6245 14.1326 24.6781 14.1863C24.7318 14.24 24.8069 14.2808 25.2195 14.4527L26.3809 14.9366C26.5912 15.0241 26.7963 15.1095 26.9452 15.1979C27.0846 15.2806 27.367 15.476 27.367 15.8475C27.367 16.2189 27.0846 16.4143 26.9452 16.497C26.7963 16.5854 26.5912 16.6708 26.3809 16.7583L25.2195 17.2423C24.8069 17.4142 24.7318 17.4549 24.6781 17.5086C24.6245 17.5623 24.5837 17.6374 24.4118 18.05L23.9279 19.2114C23.8403 19.4216 23.7549 19.6268 23.6666 19.7757C23.5839 19.9151 23.3885 20.1975 23.017 20.1975C22.6455 20.1975 22.4501 19.9151 22.3674 19.7757C22.2791 19.6268 22.1937 19.4217 22.1061 19.2114L21.6222 18.05C21.4503 17.6374 21.4095 17.5623 21.3558 17.5086C21.3022 17.4549 21.2271 17.4142 20.8145 17.2423L19.6531 16.7583C19.4428 16.6708 19.2377 16.5854 19.0888 16.497C18.9494 16.4143 18.667 16.2189 18.667 15.8475C18.667 15.476 18.9494 15.2806 19.0888 15.1979C19.2377 15.1095 19.4428 15.0241 19.6531 14.9366L20.8145 14.4527C21.2271 14.2808 21.3022 14.24 21.3558 14.1863C21.4095 14.1326 21.4503 14.0575 21.6222 13.645L22.1061 12.4835C22.1937 12.2733 22.2791 12.0682 22.3674 11.9193Z" fill="white"/></g></g><defs><filter id="filter0_dd_29556_5479" x="3.7666" y="9.09753" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="2.33333" operator="erode" in="SourceAlpha" result="effect1_dropShadow_29556_5479"/><feOffset dy="4.66667"/><feGaussianBlur stdDeviation="3.5"/><feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.0980392 0 0 0 0 0.0901961 0 0 0 0.03 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29556_5479"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="4.66667" operator="erode" in="SourceAlpha" result="effect2_dropShadow_29556_5479"/><feOffset dy="14"/><feGaussianBlur stdDeviation="9.33333"/><feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.0980392 0 0 0 0 0.0901961 0 0 0 0.08 0"/><feBlend mode="normal" in2="effect1_dropShadow_29556_5479" result="effect2_dropShadow_29556_5479"/><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_29556_5479" result="shape"/></filter><filter id="filter1_dd_29556_5479" x="0.000324249" y="4.00543e-05" width="47.6244" height="48.1975" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="9.33333"/><feGaussianBlur stdDeviation="9.33333"/><feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.164706 0 0 0 0.02 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_29556_5479"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4.66667"/><feGaussianBlur stdDeviation="4.66667"/><feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0901961 0 0 0 0 0.164706 0 0 0 0.03 0"/><feBlend mode="normal" in2="effect1_dropShadow_29556_5479" result="effect2_dropShadow_29556_5479"/><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_29556_5479" result="shape"/></filter></defs></svg>`;

const MagicSparkleIcon = ({ width = 44, height = 44, ...props }: SvgProps) => (
  <SvgXml xml={MAGIC_SPARKLE_XML} width={width} height={height} {...props} />
);

const EatSymbolIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M3 8.16779V2.25H4.5V8.16779C4.5 8.34196 4.61145 8.49658 4.77667 8.55165C5.57075 8.81635 6.42925 8.81635 7.22333 8.55165C7.38855 8.49658 7.5 8.34196 7.5 8.16779V2.25H9V8.16779C9 8.9876 8.47541 9.71543 7.69767 9.97468C7.38753 10.0781 7.07031 10.1523 6.75 10.1975L6.75 16.5H5.25L5.25 10.1975C4.92969 10.1523 4.61247 10.0781 4.30233 9.97468C3.52459 9.71543 3 8.9876 3 8.16779Z"
      fill={Color.neutralTagColor}
    />
    <Path
      d="M11.141 2.25C10.3728 2.25 9.75 2.87275 9.75 3.64095L9.75 16.5H11.25V12.75L12.6629 12.75C13.0068 12.7501 13.338 12.7501 13.6087 12.7126C13.9121 12.6706 14.261 12.5675 14.5387 12.2657C14.8165 11.9638 14.8902 11.6076 14.9069 11.3017C14.9218 11.0288 14.8942 10.6988 14.8656 10.3561L14.4433 5.28861C14.3002 3.57109 12.8644 2.25 11.141 2.25Z"
      fill={Color.neutralTagColor}
    />
    <Path d="M5.25 2.25V7.5H6.75V2.25H5.25Z" fill={Color.neutralTagColor} />
  </Svg>
);

const SolidFireIcon = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M7.86367 11.9473L9.00037 10.8106L10.1371 11.9473C10.7672 12.5774 11.0062 13.4996 10.7613 14.3564C10.6841 14.6268 10.4784 14.8417 10.2116 14.9306L10.0193 14.9947C9.35791 15.2152 8.64282 15.2152 7.98139 14.9947L7.78911 14.9306C7.52234 14.8417 7.31664 14.6268 7.23939 14.3564C6.99458 13.4996 7.23355 12.5774 7.86367 11.9473Z"
      fill={Color.neutralTagColor}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.93773 1.30976C7.25874 1.03577 7.74013 0.726953 8.33946 0.886851C8.93878 1.04675 9.20236 1.55433 9.34423 1.95181C9.48413 2.34381 9.59051 2.87602 9.7108 3.47776L10.0453 5.15039C10.1345 5.59642 10.1894 5.86449 10.249 6.0473L10.2558 6.06786L10.2741 6.05617C10.4352 5.95126 10.6462 5.77705 10.9956 5.48586L11.1999 5.31561C11.3256 5.21085 11.447 5.10971 11.5555 5.03107C11.6731 4.94586 11.8212 4.85243 12.0067 4.79562C12.4241 4.66778 12.8765 4.72816 13.2459 4.96099C13.41 5.06446 13.5284 5.19345 13.6195 5.30652C13.7036 5.41086 13.7942 5.54029 13.888 5.67435L13.8995 5.69082C14.5956 6.68522 15.0779 7.81317 15.316 9.00342L15.4387 9.6173C15.6543 10.695 15.6543 11.8048 15.4388 12.8825L15.431 12.9215C15.1026 14.5635 13.8843 15.8845 12.2742 16.3446C10.1345 16.9559 7.86635 16.9559 5.72665 16.3446C4.11652 15.8845 2.89829 14.5635 2.56988 12.9215L2.53479 12.746C2.33954 11.7698 2.31172 10.7675 2.45252 9.78195L2.53245 9.22244C2.86331 6.90641 3.85953 4.73627 5.40014 2.97558L5.85973 2.45033C6.26378 1.98847 6.62114 1.57998 6.93773 1.30976ZM10.0563 9.74523C9.47314 9.16203 8.52759 9.16203 7.94439 9.74523L6.80301 10.8866C5.78769 11.9019 5.40264 13.3879 5.7971 14.7685C6.01038 15.515 6.57828 16.1081 7.31477 16.3536L7.50705 16.4177C8.47638 16.7408 9.52436 16.7408 10.4937 16.4177L10.686 16.3536C11.4225 16.1081 11.9904 15.515 12.2036 14.7685C12.5981 13.3879 12.213 11.9019 11.1977 10.8866L10.0563 9.74523Z"
      fill={Color.neutralTagColor}
    />
  </Svg>
);

const MealRow = () => {
  return (
    <Pressable style={styles.mealRow} onPress={() => {}}>
      <View style={styles.leftClickContainer}>
        <Text style={styles.title}>High Protein Raspberry Cheesecake Bowl</Text>
        <View style={[styles.bottomContainer, styles.containerFlexBox]}>
          <View style={[styles.leftContainer, styles.containerFlexBox]}>
            <View style={[styles.optimizedBadge, styles.containerFlexBox]}>
              <MagicSparkleIcon width={12} height={12} />
              <Text style={styles.optimized}>Optimized</Text>
            </View>
            <EatSymbolIcon width={18} height={18} />
            <Text style={[styles.ingredients, styles.kcalTypo]}>
              Skyr, Himbeeren, Zitronensaft
            </Text>
          </View>
          <View style={[styles.containerFlexBox, styles.calories]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.kcalTypo}>226 kcal</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.rightClickContainer, styles.containerFlexBox]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <Text style={styles.addText}>+</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    gap: Gap.gap_6,
    alignItems: "center",
    flexDirection: "row",
  },
  mealRow: {
    width: "100%",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
  },
  leftClickContainer: {
    paddingLeft: Padding.padding_16,
    paddingRight: Padding.padding_4,
    paddingVertical: Padding.padding_10,
    gap: Gap.gap_8,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  bottomContainer: {
    gap: Gap.gap_8,
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
  },
  optimizedBadge: {
    borderRadius: 12,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    paddingHorizontal: Padding.padding_4,
    paddingVertical: 2,
  },
  optimized: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
  ingredients: {
    flex: 1,
    ...Typography.caption1Regular,
  },
  kcalTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
    textAlign: "left",
  },
  calories: {
    justifyContent: "flex-end",
  },
  rightClickContainer: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    lineHeight: 24,
  },
});

export default MealRow;
