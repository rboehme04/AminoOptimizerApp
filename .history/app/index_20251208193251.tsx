import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '@/constants/GlobalStyles';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.bodyText}>
        This text uses bodyRegular style from Figma design
      </Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.title3Emphasized, // Matches Figma: Title 3 Emphasized
  },
  bodyText: {
    ...Typography.bodyRegular, // Matches Figma: Body Regular
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

