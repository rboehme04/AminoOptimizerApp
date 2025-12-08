import * as React from "react";
import {StyleSheet, View, Text, Pressable} from "react-native";
import { BlurView } from "@react-native-community/blur"
import { SafeAreaView } from "react-native-safe-area-context";
import { Width, FontFamily, Color } from "../GlobalStyles";

const NavBar = () => {
  	
  	return (
    		<SafeAreaView style={styles.navBar}>
      			<View style={styles.view}>
        				<View style={styles.containerFlexBox} />
        				<Text style={styles.rezept}>Optimizer</Text>
        				<View style={[styles.rightContainer, styles.containerFlexBox]}>
          					<Pressable style={[styles.clickContainer, styles.backgroundFlexBox]} onPress={()=>{}}>
            						<View style={[styles.background, styles.backgroundFlexBox]}>
              							<BlurView style={styles.blurview} blurAmount={4}>
                								<View style={styles.view2} />
              							</BlurView>
              							<View style={styles.settings}>
                								<Image style={[styles.settingsSvgrepoCom1Icon, styles.clickContainerPosition]} resizeMode="cover" />
              							</View>
            						</View>
          					</Pressable>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	navBar: {
    		flex: 1
  	},
  	containerFlexBox: {
    		width: Width.width_32,
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	backgroundFlexBox: {
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	clickContainerPosition: {
    		top: 0,
    		position: "absolute"
  	},
  	view: {
    		justifyContent: "space-between",
    		gap: 0,
    		alignItems: "center",
    		flexDirection: "row",
    		height: 44,
    		width: "100%",
    		flex: 1
  	},
  	rezept: {
    		fontSize: 22,
    		letterSpacing: -0.26,
    		lineHeight: 28,
    		fontWeight: "700",
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorWhite,
    		textAlign: "center",
    		flex: 1
  	},
  	rightContainer: {
    		flexDirection: "row",
    		width: Width.width_32
  	},
  	clickContainer: {
    		width: 44,
    		right: -8,
    		padding: 4,
    		zIndex: 0,
    		top: 0,
    		position: "absolute",
    		justifyContent: "center",
    		height: 44
  	},
  	background: {
    		borderRadius: 9999,
    		backgroundColor: "transparent",
    		paddingBottom: 2,
    		overflow: "hidden",
    		alignSelf: "stretch",
    		justifyContent: "center",
    		flex: 1
  	},
  	blurview: {
    		opacity: 0.1599999964237213,
    		top: 0,
    		left: 0,
    		right: 0,
    		bottom: 0,
    		zIndex: -1,
    		position: "absolute"
  	},
  	view2: {
    		backgroundColor: Color.colorBlack,
    		height: "100%",
    		width: "100%"
  	},
  	settings: {
    		height: 20,
    		width: 20
  	},
  	settingsSvgrepoCom1Icon: {
    		left: 0,
    		width: 24,
    		height: 24
  	}
});

export default NavBar;
