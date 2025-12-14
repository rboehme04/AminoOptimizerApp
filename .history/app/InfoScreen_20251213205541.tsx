import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoScreen = () => {
  return (
    <SafeAreaView>
      <NavBar title="Wie funktioniert es?" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.infoParagraphContainer}>
          <Text style={styles.infoParagraphTitle}>Wie funktioniert es?</Text>
          <Text style={styles.infoParagraphTitle}>
            Nicht jedes Protein ist gleich wertvoll. Entscheidend ist, ob alle
            essentiellen Aminosäuren in der richtigen Menge vorhanden sind.
            Diese kann dein Körper nicht selbst herstellen.
          </Text>
        </View>
        <View style={styles.infoParagraphContainer}>
          <Text style={styles.infoParagraphTitle}>
            Wie funktioniert die Optimierung?
          </Text>
          <Text style={styles.infoParagraphTitle}>
            Der Optimierer ergänzt dein Rezept gezielt mit Zutaten, die fehlende
            Aminosäuren ausgleichen. So entsteht ein vollständiges
            Aminosäureprofil.
          </Text>
        </View>
        <View style={styles.infoParagraphContainer}>
          <Text style={styles.infoParagraphTitle}>Warum ist das wichtig?</Text>
          <Text style={styles.infoParagraphTitle}>
            Bei unausgewogenem Aminosäureprofil kann dein Körper viel Protein
            nicht für Muskelaufbau oder Zellreparatur nutzen. Es wird
            stattdessen ineffizient zur Energiegewinnung verbrannt.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  infoParagraphContainer: {
    gap: 2,
  },
  infoParagraphTitle: {
    ...Typography.bodyEmphasized,
    color: Color.neutralWhite,
  },
  infoParagraphText: {
    ...Typography.bodyRegular,
    color: Color.neutralWhite,
  },
});

export default InfoScreen;
