import { Color, Gap, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

const MagicSparkleIcon = ({ color = "white", ...props }: SvgProps) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15.1433 1.42913L14.758 2.07123C14.6301 2.28452 14.5661 2.39117 14.479 2.47821C14.392 2.56526 14.2853 2.62925 14.072 2.75722L13.4299 3.14248C12.7917 3.52542 12.4726 3.71688 12.4726 3.99998C12.4726 4.28307 12.7917 4.47454 13.4299 4.85747L14.072 5.24273C14.2853 5.3707 14.392 5.43469 14.479 5.52174C14.5661 5.60878 14.63 5.71541 14.758 5.92866L15.1433 6.57082C15.5262 7.20904 15.7177 7.52815 16.0008 7.52815C16.2839 7.52815 16.4753 7.20904 16.8583 6.57082L17.2435 5.92872C17.3715 5.71544 17.4355 5.60879 17.5225 5.52174C17.6096 5.43469 17.7162 5.3707 17.9295 5.24273L18.5716 4.85747C19.2098 4.47454 19.529 4.28307 19.529 3.99998C19.529 3.71688 19.2098 3.52542 18.5716 3.14248L17.9295 2.75722C17.7162 2.62925 17.6096 2.56526 17.5225 2.47821C17.4355 2.39117 17.3715 2.28452 17.2435 2.07124L16.8583 1.42913C16.4753 0.790912 16.2839 0.471802 16.0008 0.471802C15.7177 0.471802 15.5262 0.790912 15.1433 1.42913Z"
      fill={color}
    />
    <Path
      d="M21.5008 8.24998C21.301 8.15009 21.2011 8.10014 21.1162 8.03126C21.0623 7.98758 21.0132 7.93842 20.9695 7.88457C20.9006 7.79964 20.8507 7.69975 20.7508 7.49998C20.4903 6.97897 20.36 6.71847 20.1758 6.64963C20.0629 6.60747 19.9386 6.60747 19.8258 6.64963C19.6415 6.71847 19.5113 6.97897 19.2508 7.49998C19.1509 7.69969 19.1009 7.79966 19.0321 7.88457C18.9884 7.93842 18.9392 7.98758 18.8854 8.03126C18.8004 8.10014 18.7006 8.15009 18.5008 8.24998C17.9798 8.51048 17.7193 8.64073 17.6504 8.82499C17.6083 8.93784 17.6083 9.06212 17.6504 9.17497C17.7193 9.35922 17.9798 9.48948 18.5008 9.74998C18.7006 9.84987 18.8004 9.89981 18.8854 9.9687C18.9392 10.0124 18.9884 10.0615 19.0321 10.1154C19.1009 10.2003 19.1509 10.3002 19.2508 10.5C19.5113 11.021 19.6415 11.2815 19.8258 11.3503C19.9386 11.3925 20.0629 11.3925 20.1758 11.3503C20.36 11.2815 20.4903 11.021 20.7508 10.5C20.8507 10.3002 20.9006 10.2003 20.9695 10.1154C21.0132 10.0615 21.0623 10.0124 21.1162 9.9687C21.2011 9.89981 21.301 9.84987 21.5008 9.74998C22.0218 9.48948 22.2823 9.35922 22.3511 9.17497C22.3933 9.06212 22.3933 8.93784 22.3511 8.82499C22.2823 8.64073 22.0218 8.51048 21.5008 8.24998Z"
      fill={color}
    />
    <Path
      d="M9.20165 5.64357C9.36706 5.36477 9.75783 4.79998 10.5008 4.79998C11.2437 4.79998 11.6345 5.36477 11.7999 5.64357C11.9766 5.94139 12.1474 6.35159 12.3225 6.7721L13.2904 9.095C13.6342 9.9201 13.7157 10.0703 13.8231 10.1777C13.9305 10.285 14.0807 10.3666 14.9058 10.7104L17.2286 11.6782C17.6491 11.8533 18.0594 12.0242 18.3572 12.2008C18.636 12.3663 19.2008 12.757 19.2008 13.5C19.2008 14.2429 18.636 14.6337 18.3572 14.7991C18.0594 14.9758 17.6492 15.1466 17.2287 15.3217L14.9058 16.2896C14.0807 16.6334 13.9305 16.7149 13.8231 16.8223C13.7157 16.9296 13.6342 17.0799 13.2904 17.905L12.3225 20.2279C12.1474 20.6483 11.9766 21.0586 11.7999 21.3564C11.6345 21.6352 11.2437 22.2 10.5008 22.2C9.75783 22.2 9.36706 21.6352 9.20165 21.3564C9.02496 21.0586 8.85416 20.6484 8.67907 20.2279L7.71119 17.905C7.3674 17.0799 7.28584 16.9296 7.17848 16.8223C7.07111 16.7149 6.9209 16.6334 6.0958 16.2896L3.7729 15.3217C3.35239 15.1466 2.9422 14.9758 2.64438 14.7991C2.36558 14.6337 1.80078 14.2429 1.80078 13.5C1.80078 12.757 2.36558 12.3663 2.64438 12.2008C2.9422 12.0242 3.3524 11.8533 3.77291 11.6782L6.0958 10.7104C6.9209 10.3666 7.07111 10.285 7.17848 10.1777C7.28584 10.0703 7.3674 9.9201 7.71119 9.095L8.67905 6.77211C8.85415 6.3516 9.02495 5.9414 9.20165 5.64357Z"
      fill={color}
    />
  </Svg>
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

const ChevronRightIcon = ({
  color = Color.neutralWhite,
  ...props
}: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OptimizedBadge = () => {
  return (
    <View style={[styles.optimizedBadge]}>
      <MagicSparkleIcon width={12} height={12} />
      <Text style={styles.optimized}>Optimized</Text>
    </View>
  );
};

const MealRow = () => {
  return (
    <Pressable style={styles.mealRow} onPress={() => {}}>
      <View style={styles.leftClickContainer}>
        <Text style={styles.title}>High Protein Raspberry Cheesecake Bowl</Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            <OptimizedBadge />
            <EatSymbolIcon width={18} height={18} />
            <View style={styles.ingredientsContainer}>
              <Text
                style={[styles.captionTypo]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Skyr, Himbeeren, Zitronensaft
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.captionTypo}>226 kcal</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <ChevronRightIcon />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.neutralBackgroundDarkElevated,
    borderRadius: 32,
  },
  leftClickContainer: {
    paddingLeft: 16,
    paddingRight: 2,
    paddingVertical: 10,
    gap: 6,
    flex: 1,
  },
  title: {
    ...Typography.subheadlineEmphasized,
    color: Color.neutralWhite,
  },
  captionTypo: {
    ...Typography.caption1Regular,
    color: Color.neutralTextOrTabGrey,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  ingredientsContainer: {
    flex: 1,
  },
  optimizedBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Color.brand50GraphicsOrBrandButton,
    paddingLeft: 4,
    paddingRight: 6,
    paddingVertical: 1,
    gap: 4,
  },
  optimized: {
    ...Typography.caption1Emphasized,
    color: Color.neutralWhite,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightClickContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex:
    paddingLeft: 8,
    paddingRight: 12,
  },
  addText: {
    ...Typography.title3Emphasized,
    color: Color.neutralWhite,
    lineHeight: 24,
  },
});

export default MealRow;
