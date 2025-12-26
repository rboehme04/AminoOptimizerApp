import NavBar from "@/components/navBar";
import { Color, Typography } from "@/constants/GlobalStyles";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INFO_SECTIONS = [
  {
    title: "Wie funktioniert es?",
    content:
      "Nicht jedes Protein ist gleich wertvoll. Entscheidend ist, ob alle essentiellen Aminosäuren in der richtigen Menge vorhanden sind. Diese kann dein Körper nicht selbst herstellen.",
    image: undefined, // Optional: require("../assets/images/example.png")
  },
  {
    title: "Wie funktioniert die Optimierung?",
    content:
      "Der Optimierer ergänzt dein Rezept gezielt mit Zutaten, die fehlende Aminosäuren ausgleichen. So entsteht ein vollständiges Aminosäureprofil.",
    image: require("../assets/images/building_blocks.jpg"), // Optional: require("../assets/images/example.png")
  },
  {
    title: "Warum ist das wichtig?",
    content:
      "Bei unausgewogenem Aminosäureprofil kann dein Körper viel Protein nicht für Muskelaufbau oder Zellreparatur nutzen. Es wird stattdessen ineffizient zur Energiegewinnung verbrannt.",
    image: undefined, // Optional: require("../assets/images/example.png")
  },
  {
    title: "Der Amino Acid Score",
    content:
      "Der Amino Acid Score zeigt, wie gut dein Körper das Protein verwerten kann. Er vergleicht den Gehalt jeder essenziellen Aminosäure mit WHO-Referenzwerten, wobei die knappste Aminosäure den Score bestimmt. Ab 100% sind alle essenziellen Aminosäuren ausreichend vorhanden. Je höher der Wert, desto hochwertiger das Protein.",
    image: undefined, // Optional: require("../assets/images/example.png")
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
        <View style={{ width: "100%", alignItems: "center", marginBottom: 18 }}>
          <Image
            source={require("../assets/images/protein_structure.jpg")}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 12,
              resizeMode: "cover",
              // source: https://www.cio.de/article/3697393/ki-erstellt-dreidimensionale-strukturen-von-proteinen.html
            }}
          />
        </View>
        {INFO_SECTIONS.map((section, index) => (
          <View key={index} style={styles.infoParagraphContainer}>
            <Text style={styles.infoParagraphTitle}>{section.title}</Text>
            <Text style={styles.infoParagraphText}>{section.content}</Text>
            {section.image && (
              <View style={styles.infoImageContainer}>
                <Image source={section.image} style={styles.infoImage} />
              </View>
            )}
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
  infoImageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  infoImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },
});

export default InfoScreen;
