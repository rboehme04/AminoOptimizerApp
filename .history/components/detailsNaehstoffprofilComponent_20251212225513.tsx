import { Text, View } from "react-native";

export default function DetailsNaehstoffprofilComponent() {
    return (
        <View style={styles.container}>
            <Text>Naehstoffprofil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.neutralWhite,
    }
})