import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function ZieleComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Not yet implemented</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
    },
    text: {
        ...Typography.subheadlineRegular,
        color: Color.neutralWhite,
        
    },
})