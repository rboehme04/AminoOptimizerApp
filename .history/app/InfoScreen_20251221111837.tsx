import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INFO_SECTIONS = [
  {
    title: "Wie funktioniert es?",
    content:
      "Nicht jedes Protein ist gleich wertvoll. Entscheidend ist, ob alle essentiellen Aminosäuren in der richtigen Menge vorhanden sind. Diese kann dein Körper nicht selbst herstellen.",
  },
  {
    title: "Wie funktioniert die Optimierung?",
    content:
      "Der Optimierer ergänzt dein Rezept gezielt mit Zutaten, die fehlende Aminosäuren ausgleichen. So entsteht ein vollständiges Aminosäureprofil.",
  },
  {
    title: "Warum ist das wichtig?",
    content:
      "Bei unausgewogenem Aminosäureprofil kann dein Körper viel Protein nicht für Muskelaufbau oder Zellreparatur nutzen. Es wird stattdessen ineffizient zur Energiegewinnung verbrannt.",
  },
  {
    title: "Der Amino Acid Score",
    content:
      "Der Amino Acid Score (WHO-Standard) zeigt, wie gut dein Körper das Protein verwerten kann. Je höher der Wert, desto mehr Protein kann dei.",
  },
];

const InfoScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar title="Wie funktioniert es?" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {INFO_SECTIONS.map((section, index) => (
          <View key={index} style={styles.infoParagraphContainer}>
            <Text style={styles.infoParagraphTitle}>{section.title}</Text>
            <Text style={styles.infoParagraphText}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
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
