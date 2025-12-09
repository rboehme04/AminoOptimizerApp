import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import { Gap, Color, LineHeight, FontSize, FontFamily, Padding, Height, Width } from "../GlobalStyles";

const MealRow = () => {
  	
  	return (
    		<Pressable style={styles.mealRow} onPress={()=>{}}>
      			<View style={styles.leftClickContainer}>
        				<Text style={styles.title}>High Protein Raspberry Cheescake Bowl</Text>
        				<View style={[styles.bottomContainer, styles.containerFlexBox1]}>
          					<View style={[styles.leftContainer, styles.containerFlexBox]}>
            						<View style={[styles.optimizedBadge, styles.containerFlexBox]}>
              							<View style={styles.magicSparkle}>
                								<Image style={[styles.vectorIcon, styles.iconLayout]} resizeMode="cover" />
              							</View>
              							<View>
                								<Text style={styles.optimized}>Optimized</Text>
              							</View>
            						</View>
            						<View style={styles.eatSymbol}>
              							<Image style={[styles.vectorIcon2, styles.iconLayout]} resizeMode="cover" />
            						</View>
            						<Text style={[styles.bananeHaferflockenBlaubeer, styles.kcalTypo]}>Skyr, Himbeeren, Zitronensaft</Text>
          					</View>
          					<View style={styles.containerFlexBox}>
            						<View style={styles.eatSymbol}>
              							<Image style={[styles.vectorIcon3, styles.iconLayout]} resizeMode="cover" />
            						</View>
            						<Text style={styles.kcalTypo}>226kcal</Text>
          					</View>
        				</View>
      			</View>
      			<View style={[styles.rightClickContainer, styles.containerFlexBox1]}>
        				<View style={styles.monotoneAdd}>
          					<Image style={[styles.icon, styles.iconLayout]} resizeMode="cover" />
        				</View>
      			</View>
    		</Pressable>);
};

const styles = StyleSheet.create({
  	containerFlexBox1: {
    		alignSelf: "stretch",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	containerFlexBox: {
    		gap: Gap.gap_4,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	iconLayout: {
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
  	mealRow: {
    		width: "100%",
    		backgroundColor: Color.colorGray,
    		justifyContent: "space-between",
    		gap: 0,
    		alignItems: "center",
    		flexDirection: "row",
    		flex: 1
  	},
  	leftClickContainer: {
    		paddingLeft: 16,
    		paddingTop: Padding.padding_12,
    		paddingRight: 2,
    		paddingBottom: Padding.padding_12,
    		gap: 6,
    		flex: 1
  	},
  	title: {
    		height: 20,
    		fontSize: 15,
    		letterSpacing: -0.23,
    		lineHeight: 20,
    		fontWeight: "600",
    		overflow: "hidden",
    		textAlign: "left",
    		color: Color.colorWhite,
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	bottomContainer: {
    		gap: 8
  	},
  	leftContainer: {
    		flex: 1
  	},
  	optimizedBadge: {
    		borderRadius: 12,
    		backgroundColor: Color.colorRoyalblue,
    		paddingLeft: 4,
    		paddingTop: Padding.padding_1,
    		paddingRight: 6,
    		paddingBottom: Padding.padding_1
  	},
  	magicSparkle: {
    		height: 12,
    		width: 12,
    		boxShadow: "0px 14.000000953674316px 18.67px rgba(28, 25, 23, 0.08)",
    		elevation: 18.67
  	},
  	vectorIcon: {
    		height: "90.83%",
    		width: "85.83%",
    		top: "1.97%",
    		right: "6.66%",
    		bottom: "7.2%",
    		left: "7.5%",
    		boxShadow: "0px 4.6666669845581055px 9.33px rgba(15, 23, 42, 0.03), 0px 9.333333969116211px 18.67px rgba(15, 23, 42, 0.02)"
  	},
  	optimized: {
    		textAlign: "center",
    		lineHeight: LineHeight.lh_16,
    		fontSize: FontSize.fs_12,
    		color: Color.colorWhite,
    		fontFamily: FontFamily.sFPro,
    		alignSelf: "stretch"
  	},
  	eatSymbol: {
    		height: Height.height_18,
    		width: Width.width_18
  	},
  	vectorIcon2: {
    		height: "79.44%",
    		width: "66.11%",
    		top: "12.5%",
    		right: "17.22%",
    		bottom: "8.06%",
    		left: "16.67%"
  	},
  	bananeHaferflockenBlaubeer: {
    		overflow: "hidden",
    		flex: 1
  	},
  	vectorIcon3: {
    		height: "88.89%",
    		width: "73.33%",
    		top: "4.68%",
    		right: "13.53%",
    		bottom: "6.43%",
    		left: "13.13%"
  	},
  	rightClickContainer: {
    		justifyContent: "center",
    		paddingLeft: 8,
    		paddingRight: Padding.padding_12
  	},
  	monotoneAdd: {
    		height: 24,
    		width: 24
  	},
  	icon: {
    		height: "50%",
    		width: "25%",
    		top: "25%",
    		right: "37.5%",
    		bottom: "25%",
    		left: "37.5%"
  	}
});

export default MealRow;
