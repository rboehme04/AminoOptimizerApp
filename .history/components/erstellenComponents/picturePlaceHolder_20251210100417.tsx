import * as React from "react";
import {Text, StyleSheet, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Color, Typography } from "@/constants/GlobalStyles";

const PicturePlaceHolder = () => {
  	
  	return (
    		<SafeAreaView style={styles.viewBg}>
      			<View style={[styles.view, styles.viewFlexBox]}>
        				<View>
          					<MaterialIcons 
            						name="add-a-photo" 
            						size={36} 
            						color={Color.neutralTextOrTabGrey} 
            						style={styles.icon}
          					/>
          					<View style={styles.textContainer}>
            						<Text style={styles.bild}>Bild</Text>
          					</View>
        				</View>
      			</View>
    		</SafeAreaView>);
};

const styles = StyleSheet.create({
  	viewFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	viewBg: {
    		backgroundColor: Color.neutralInputOnDark,
    		flex: 1
  	},
  	view: {
    		width: "100%",
    		height: 78,
    		flexDirection: "row",
    		backgroundColor: Color.neutralInputOnDark,
    		flex: 1
  	},
  	icon: {
    		width: 36,
    		height: 40,
    		textAlign: "center"
  	},
  	textContainer: {
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	bild: {
    		...Typography.subheadlineRegular,
    		color: Color.neutralTextOrTabGrey,
    		textAlign: "center"
  	}
});

export default PicturePlaceHolder;
