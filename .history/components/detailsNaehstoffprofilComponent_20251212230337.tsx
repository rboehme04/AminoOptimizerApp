import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

const NaehrstoffprofilRow = () => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowText}>Naehstoffprofil</Text>
        </View>
    )
}

function DetailsNaehrstoffprofilComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>Details</Text>
            <View style={styles.rowsContainer}>
                <NaehrstoffprofilRow />
            </View>
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
    },
    rowsContainer: {
        gap: 12,
    },
})

export default DetailsNaehrstoffprofilComponent;