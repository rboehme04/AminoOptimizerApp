import { StyleSheet, Text, View } from "react-native";

export default function DetailsNaehstoffprofilComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Naehstoffprofil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        gap: 16,
    }
})