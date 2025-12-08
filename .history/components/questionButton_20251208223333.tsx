import * as React from "react";
import {Text, StyleSheet, View, Pressable} from "react-native";
import { Color, Padding, FontFamily } from "../GlobalStyles";

const QuestionButton = () => {
  	
  	return (
    		<Pressable style={[styles.questionButton, styles.buttonFlexBox]} onPress={()=>{}}>
      			<View style={[styles.button, styles.buttonFlexBox]}>
        				<Text style={styles.text}>Wie funktioniert es?</Text>
          					<View style={styles.helpCircle}>
            						<Image style={styles.icon} resizeMode="cover" />
          					</View>
          					</View>
          					</Pressable>);
        				};
        				
        				const styles = StyleSheet.create({
          					buttonFlexBox: {
            						alignItems: "center",
            						flexDirection: "row"
          					},
          					questionButton: {
            						height: 44,
            						flex: 1,
            						width: "100%",
            						justifyContent: "center",
            						overflow: "hidden"
          					},
          					button: {
            						height: 36,
            						borderRadius: 18,
            						borderStyle: "solid",
            						borderColor: Color.colorWhite,
            						borderWidth: 1,
            						paddingLeft: 12,
            						paddingTop: Padding.padding_6,
            						paddingRight: Padding.padding_6,
            						paddingBottom: Padding.padding_6,
            						gap: 8
          					},
          					text: {
            						fontSize: 15,
            						letterSpacing: -0.23,
            						lineHeight: 20,
            						fontFamily: FontFamily.sFPro,
            						color: Color.colorWhite,
            						textAlign: "left"
          					},
          					helpCircle: {
            						height: 24,
            						width: 24,
            						overflow: "hidden"
          					},
          					icon: {
            						position: "absolute",
            						height: "83.33%",
            						width: "83.33%",
            						top: "8.33%",
            						right: "8.33%",
            						bottom: "8.33%",
            						left: "8.33%",
            						maxWidth: "100%",
            						maxHeight: "100%",
            						overflow: "hidden"
          					}
        				});
        				
        				export default QuestionButton;
        				