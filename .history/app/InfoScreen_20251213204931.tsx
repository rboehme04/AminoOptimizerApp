import NavBar from "@/components/navBar";
import { View, Text, ScrollView } from "react-native";

const InfoScreen = () => {
  return (
    <View>
        <NavBar title="Wie funktioniert es?" />
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>Wie funktioniert es?</Text>
        </ScrollView>
    </View>
  );
}

export default InfoScreen;