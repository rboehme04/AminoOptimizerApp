import { Text, View } from "react-native";

export default function SettingsCategoryRowComponent({ text }: { item: string }) {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}