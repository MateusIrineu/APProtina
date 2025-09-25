import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import BigButton from "../../components/BigButton";
import { useBigTargets } from "../../components/BigTargetsContext";
import { useFontSize } from "../../components/FonteSizeContext";

export default function SettingsScreen() {
  const { bigTargets, setBigTargets } = useBigTargets();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <ImageBackground
      source={require("../../assets/image/imagemFundo.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ---------------- FONT SIZE ---------------- */}
        <View style={styles.card} accessible accessibilityLabel="Grupo de tamanho de fonte">
          <Text style={[styles.cardTitle, { fontSize }]}>Acessibilidade visual</Text>
          <View style={styles.row}>
            <BigButton
              title="A+"
              onPress={() => setFontSize(24)}
              style={styles.buttonSmall}
              textStyle={[styles.buttonText, { fontSize }]}
            />
            <BigButton
              title="A-"
              onPress={() => setFontSize(16)}
              style={styles.buttonSmall}
              textStyle={[styles.buttonText, { fontSize }]}
            />
          </View>
        </View>

        {/* ---------------- BIG TARGETS ---------------- */}
        <View style={styles.card} accessible accessibilityLabel="Grupo de alvos de toque">
          <Text style={[styles.cardTitle, { fontSize }]}>Acessibilidade tátil</Text>
          <View style={styles.row}>
            <Text style={[styles.label, { fontSize }]}>Alvos de toque grandes</Text>
            <BigButton
              title={bigTargets ? "Ativado" : "Desativado"}
              onPress={() => setBigTargets((v) => !v)}
              style={[styles.switchBtn, bigTargets ? styles.switchOn : styles.switchOff]}
              textStyle={[styles.switchText, { fontSize }]}
              bigTargets={bigTargets}
              accessibilityState={{ checked: bigTargets }}
              accessibilityHint="Aumenta áreas de toque e espaçamentos."
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,       // padding interno consistente
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,    // espaçamento entre cards
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: {
    color: "#333",
    flex: 1,
  },
  buttonSmall: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  switchBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  switchOn: {
    backgroundColor: "#DC385A",
  },
  switchOff: {
    backgroundColor: "#000",
  },
  switchText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
