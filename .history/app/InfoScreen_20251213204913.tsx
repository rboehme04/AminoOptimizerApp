import NavBar from "@/components/navBar";
import { View, Text } from "react-native";

const InfoScreen = () => {
  return (
    <View>
        <NavBar title="Wie funktioniert es?" />
        <ScrollView>
            <Text>Wie funktioniert es?</Text>
        </ScrollView>
    </View>
  );
}

export default InfoScreen;