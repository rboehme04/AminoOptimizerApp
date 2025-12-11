import {
  EatSymbolIcon,
  SolidFireIcon,
} from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

// Add Icon (plus sign)
const AddIcon = ({
  color = Color.neutralWhite,
  size = 24,
}: {
  color?: string;
  size?: number;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type AddMealRowProps = {
  title?: string;
  ingredients?: string;
  calories?: string;
  onPress?: () => void;
  onAddPress?: () => void;
};

const AddMealRow = ({
  title = "Frühstücks Bowl",
  ingredients = "Banane, Haferflocken, Blaubeeren",
  calories = "555 kcal",
  onPress = () => {},
  onAddPress = () => {},
}: AddMealRowProps) => {
  return (
    <Pressable style={styles.mealRow} onPress={onPress}>
      <View style={styles.leftClickContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.bottomContainer]}>
          <View style={[styles.leftContainer]}>
            <EatSymbolIcon width={18} height={18} />
            <View style={styles.ingredientsContainer}>
              <Text
                style={[styles.captionTypo]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {ingredients}
              </Text>
            </View>
          </View>
          <View style={[styles.rightContainer]}>
            <SolidFireIcon width={18} height={18} />
            <Text style={styles.captionTypo}>{calories}</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.rightClickContainer]}
        onPress={onAddPress}
        accessibilityRole="button"
        accessibilityLabel="Add meal"
      >
        <View style={styles.addButton}>
          <AddIcon size={24} color={Color.neutralWhite} />
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  	mealRow: {
    		backgroundColor: Color.colorGray,
    		flex: 1
  	},
  	viewFlexBox: {
    		alignItems: "center",
    		flexDirection: "row",
    		flex: 1
  	},
  	frameFlexBox: {
    		gap: Gap.gap_4,
    		alignItems: "center"
  	},
  	containerFlexBox: {
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	vectorIconLayout: {
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	kcalTypo: {
    		color: Color.colorDarkgray,
    		lineHeight: LineHeight.lh_16,
    		fontSize: FontSize.fs_12,
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro
  	},
  	view: {
    		justifyContent: "space-between",
    		gap: 0,
    		width: "100%",
    		backgroundColor: Color.colorGray
  	},
  	leftClickContainer: {
    		height: 66,
    		paddingLeft: Padding.padding_16,
    		paddingRight: 8,
    		justifyContent: "center",
    		flex: 1
  	},
  	title: {
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontWeight: "600",
    		color: Color.colorWhite,
    		overflow: "hidden",
    		textAlign: "left",
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	bottomContainer: {
    		gap: 8,
    		flexDirection: "row"
  	},
  	frame: {
    		flexDirection: "row",
    		flex: 1
  	},
  	eatSymbol: {
    		height: Height.height_18,
    		width: Width.width_18
  	},
  	vectorIcon: {
    		height: "79.44%",
    		width: "66.11%",
    		right: "17.22%",
    		bottom: "8.06%",
    		left: "16.67%",
    		top: "12.5%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	},
  	bananeHaferflockenBlaubeer: {
    		overflow: "hidden",
    		flex: 1
  	},
  	frame2: {
    		flexDirection: "row"
  	},
  	vectorIcon2: {
    		height: "88.89%",
    		width: "73.33%",
    		top: "4.68%",
    		right: "13.53%",
    		bottom: "6.43%",
    		left: "13.13%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	},
  	rightClickContainer: {
    		width: 57,
    		paddingRight: 9,
    		justifyContent: "center"
  	},
  	addButton: {
    		paddingHorizontal: 4,
    		paddingVertical: 1,
    		flexDirection: "row",
    		width: "100%"
  	},
  	addButton2: {
    		height: 40,
    		borderRadius: 9999,
    		borderStyle: "solid",
    		borderColor: Color.colorDarkslategray,
    		borderWidth: 1,
    		padding: Padding.padding_16,
    		overflow: "hidden",
    		justifyContent: "center"
  	},
  	monotoneAdd: {
    		height: 24,
    		width: 24
  	},
  	vectorIcon3: {
    		height: "75%",
    		width: "75%",
    		right: "12.5%",
    		bottom: "12.5%",
    		left: "12.5%",
    		top: "12.5%",
    		maxHeight: "100%",
    		maxWidth: "100%",
    		position: "absolute"
  	}
});

export default MealRow;
