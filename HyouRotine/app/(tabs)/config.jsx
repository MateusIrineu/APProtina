
import React, { useState } from "react";
import { View, Text } from "react-native";
import BigButton from "../../components/BigButton"
import { makeSettingsStyles } from "../../styles/settingsStyles";
import { light } from "../../styles/theme";

export default function SettingsScreen() {
  // Estado local simples
  const [bigTargets, setBigTargets] = useState(false);
  
  const theme = light;
  // Gera estilos baseados nas configurações atuais
  const styles = makeSettingsStyles({ theme, bigTargets });

  return (
    <View style={{ gap: 16 }}>

      {/* ========== SEÇÃO DE ALVOS DE TOQUE ========== */}
      <View
        style={styles.group}
        accessible
        accessibilityLabel="Grupo de alvos de toque"
      >
        <Text style={styles.groupTitle}>Acessibilidade tátil</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Alvos de toque grandes</Text>

          {/* Switch para alternar tamanho dos alvos de toque */}
          <BigButton
            title={bigTargets ? "Ativado" : "Desativado"}
            onPress={() => setBigTargets((v) => !v)}
            role="switch"
            style={[
              styles.switchBtn,
              bigTargets ? styles.switchOn : styles.switchOff,
            ]}
            textStyle={styles.switchText}
            bigTargets={bigTargets}
            accessibilityState={{ checked: bigTargets }} // Informa estado ao leitor de tela
            accessibilityHint="Aumenta áreas de toque e espaçamentos."
          />
        </View>
      </View>
    </View>
  );
}