import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function AllergeneComponent() {
    return (
        <View style={styles.container}>
            <Text>Allergene</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        gap: 16,
    },
    text: {
        ...Typography.subheadlineRegular,
        color: Color.neutralWhite,
    },
});