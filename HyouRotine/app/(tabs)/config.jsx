import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import BigButton from "../../components/BigButton";
import { makeSettingsStyles } from "../../styles/settingsStyles";
import { light } from "../../styles/theme";
import { useBigTargets } from "../../components/BigTargetsContext";
import { useFontSize } from "../components/FontSizeContext"; 

export default function SettingsScreen() {
  const { bigTargets, setBigTargets } = useBigTargets();
  const { fontSize, setFontSize } = useFontSize(); 
  const theme = light;
  const styles = makeSettingsStyles({ theme, bigTargets });

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.group} accessible accessibilityLabel="Grupo de tamanho de fonte">
        <Text style={[styles.groupTitle, { fontSize }]}>Acessibilidade visual</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button title="A+" onPress={() => setFontSize("24")} />
          <Button title="A-" onPress={() => setFontSize("16")} />
        </View>
      </View>

      <View style={styles.group} accessible accessibilityLabel="Grupo de alvos de toque">
        <Text style={[styles.groupTitle, { fontSize }]}>Acessibilidade tátil</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { fontSize }]}>Alvos de toque grandes</Text>
          <BigButton
            title={bigTargets ? "Ativado" : "Desativado"}
            onPress={() => setBigTargets((v) => !v)}
            role="switch"
            style={[
              styles.switchBtn,
              bigTargets ? styles.switchOn : styles.switchOff,
            ]}
            textStyle={[styles.switchText, { fontSize }]}
            bigTargets={bigTargets}
            accessibilityState={{ checked: bigTargets }}
            accessibilityHint="Aumenta áreas de toque e espaçamentos."
          />
        </View>
      </View>
    </View>
  );
}