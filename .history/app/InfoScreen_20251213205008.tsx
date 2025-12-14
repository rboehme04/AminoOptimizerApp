import NavBar from "@/components/navBar";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const InfoScreen = () => {
  return (
    <SafeAreaViewView>
        <NavBar title="Wie funktioniert es?" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text>Wie funktioniert es?</Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default InfoScreen;