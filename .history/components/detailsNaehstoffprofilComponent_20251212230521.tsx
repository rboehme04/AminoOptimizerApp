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
            <View style={styles.rowsListContainer}>
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
    rowsListContainer: {
        gap: 12,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 18,
    },
    rowText: {
        ...Typography.bodyRegular,
        color: Color.neutralTextOrTabGrey,
    },
})

export default DetailsNaehrstoffprofilComponent;