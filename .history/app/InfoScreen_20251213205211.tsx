import NavBar from "@/components/navBar";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoScreen = () => {
  return (
    <SafeAreaView>
        <NavBar title="Wie funktioniert es?" />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.innerContainer}></View>
            <Text>Wie funktioniert es?</Text>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default InfoScreen;