import { View } from "react-native";

export default function SettingsCategoryRowComponent({ item }: { item: string }) {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}