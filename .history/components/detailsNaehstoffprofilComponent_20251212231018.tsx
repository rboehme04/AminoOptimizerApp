import { Lion3dIcon } from "@/assets/icons/icons";
import { Color, Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

const NaehrstoffprofilRow = () => {
    return (
        <View style={styles.rowContainer}>
            <Lion3dIcon size={28} />
            <Text style={styles.rowText}>Überblick</Text>
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
        gap: 16,
        borderRadius: 18,
        backgroundColor: Color.neutralBackgroundDarkElevated,
    },
    rowText: {
        ...Typography.subheadlineRegular,
        color: Color.neutralTextOrTabGrey,
    },
})

export default DetailsNaehrstoffprofilComponent;