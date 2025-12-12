import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Width, FontFamily, Color } from "../GlobalStyles";

const OptimizedBadge = () => {
  	
  	return (
    		<SafeAreaView style={styles.lebRezElevatedoptimizedBad}>
      			<View style={styles.view}>
        				<View style={styles.optimizedIcon}>
          					<Image style={[styles.polygonIcon, styles.polygonIconPosition]} resizeMode="cover" />
          					<Image style={[styles.polygonIcon2, styles.polygonIconPosition]} resizeMode="cover" />
          					<View style={styles.magicSparkle}>
            						<Image style={styles.vectorIcon} resizeMode="cover" />
          					</View>
        				</View>
        				<View style={styles.header}>
          					<Text style={styles.optimized}>Optimized</Text>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	lebRezElevatedoptimizedBad: {
    		flex: 1
  	},
  	polygonIconPosition: {
    		width: Width.width_24,
    		bottom: 1,
    		top: 1,
    		marginLeft: -12,
    		maxHeight: "100%",
    		left: "50%",
    		position: "absolute"
  	},
  	view: {
    		width: "100%",
    		alignItems: "center",
    		gap: 2,
    		flex: 1
  	},
  	optimizedIcon: {
    		width: 30,
    		height: 30,
    		boxShadow: "0px 4px 8px rgba(15, 23, 42, 0.03)",
    		elevation: 8,
    		overflow: "hidden"
  	},
  	polygonIcon: {
    		borderRadius: 7
  	},
  	polygonIcon2: {
    		borderRadius: 4
  	},
  	magicSparkle: {
    		marginLeft: -8,
    		top: 7,
    		bottom: 7,
    		boxShadow: "0px 14.000000953674316px 18.67px rgba(28, 25, 23, 0.08)",
    		elevation: 18.67,
    		width: 16,
    		left: "50%",
    		position: "absolute"
  	},
  	vectorIcon: {
    		height: "90.63%",
    		width: "85.63%",
    		top: "1.97%",
    		right: "6.87%",
    		bottom: "7.41%",
    		left: "7.5%",
    		boxShadow: "0px 4.6666669845581055px 9.33px rgba(15, 23, 42, 0.03), 0px 9.333333969116211px 18.67px rgba(15, 23, 42, 0.02)",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	header: {
    		alignSelf: "stretch"
  	},
  	optimized: {
    		fontSize: 12,
    		lineHeight: 16,
    		fontWeight: "500",
    		fontFamily: FontFamily.sFPro,
    		color: Color.colorDarkgray,
    		textAlign: "center",
    		alignSelf: "stretch"
  	}
});

export default OptimizedBadge;
