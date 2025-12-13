import { Typography } from "@/constants/GlobalStyles";
import { StyleSheet, Text, View } from "react-native";

export default function DropDown() {
    return (
        <View>
            <Text style={Typography.bodyLargeRegular}>DropDown</Text>
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        width: 250,
    },
});