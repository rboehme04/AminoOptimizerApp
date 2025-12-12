import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function DetailsNaehstoffprofilComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Details</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        gap: 16,
    },
    labelText: {
        ...Typography.bodyRegular,
        color: Color.neutralTextOrTabGrey,
    }
})