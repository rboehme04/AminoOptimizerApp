import { Text, View } from "react-native";

export default function SettingsCategoryRowComponent({ label }: { item: string }) {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}