import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { useEffect } from "react";
import Task from "../../components/Task";
import BigButton from "../../components/BigButton";
import { useBigTargets } from "../../components/BigTargetsContext";
import { useFontSize } from "../../components/FonteSizeContext";
import { useTarefasStore } from "../../store/tasksStore"; // 👈 store que faz ponte com AsyncStorage

export default function Filtro() {
  // Contextos de UI
  const { bigTargets } = useBigTargets(); // acessibilidade de botões grandes
  const { fontSize } = useFontSize();     // tamanho de fonte dinâmico

  // ---------------- STORE (Zustand) ----------------
  // Pega do store as tarefas e funções para manipulação
  const {
    tasks,             // lista de tarefas carregadas do AsyncStorage
    carregarTarefas,   // função que lê tarefas do AsyncStorage e atualiza 'tasks'
    removerTarefa,     // remove tarefa do store e do AsyncStorage
    toggleCompleted,   // alterna status concluído/pendente no store e AsyncStorage
    carregando,        // indica se o store ainda está carregando
    filtro,            // filtro atual aplicado (todas, concluídas, pendentes)
    setFiltro,         // função que altera o filtro no estado
  } = useTarefasStore();

  // ---------------- CARREGAR TAREFAS AO MONTAR ----------------
  useEffect(() => {
    // Ao abrir a tela, busca todas as tarefas salvas no AsyncStorage
    carregarTarefas();
  }, []);

  // ---------------- FILTRAGEM ----------------
  const filteredTasks = tasks.filter((task) => {
    // Dependendo do filtro selecionado, filtra a lista de tarefas
    if (filtro === "todas") return true;              // mostra todas
    if (filtro === "concluidas") return task.completed; // só concluídas
    if (filtro === "pendentes") return !task.completed; // só pendentes
    return true;
  });

  // ---------------- LOADING ----------------
  if (carregando) {
    // Mostra um botão desabilitado enquanto AsyncStorage está carregando
    return (
      <View style={styles.container}>
        <BigButton title="Carregando..." disabled bigTargets={bigTargets} />
      </View>
    );
  }

  // ---------------- UI PRINCIPAL ----------------
  return (
    <ImageBackground
      source={require("../../assets/image/imagemFundo.png")} // fundo da tela
      style={styles.container}
    >
      {/* ---------------- BOTÕES DE FILTRO ---------------- */}
      <View style={styles.botoes}>
        <BigButton
          title="Todas"
          onPress={() => setFiltro("todas")}              // altera filtro no store
          style={[styles.botao, filtro === "todas" && styles.botaoAtivo]}
          textStyle={[styles.botaoTexto, filtro === "todas" && styles.botaoTextoAtivo, { fontSize }]}
          accessibilityHint="Mostrar todas as tarefas"
          bigTargets={bigTargets}
        />

        <BigButton
          title="Concluídas"
          onPress={() => setFiltro("concluidas")}       // altera filtro no store
          style={[styles.botao, filtro === "concluidas" && styles.botaoAtivo]}
          textStyle={[styles.botaoTexto, filtro === "concluidas" && styles.botaoTextoAtivo, { fontSize }]}
          accessibilityHint="Mostrar apenas tarefas concluídas"
          bigTargets={bigTargets}
        />

        <BigButton
          title="Pendentes"
          onPress={() => setFiltro("pendentes")}        // altera filtro no store
          style={[styles.botao, filtro === "pendentes" && styles.botaoAtivo]}
          textStyle={[styles.botaoTexto, filtro === "pendentes" && styles.botaoTextoAtivo, { fontSize }]}
          accessibilityHint="Mostrar apenas tarefas pendentes"
          bigTargets={bigTargets}
        />
      </View>

      {/* ---------------- LISTA DE TAREFAS ---------------- */}
      <FlatList
        data={filteredTasks}               // recebe lista filtrada diretamente do store
        keyExtractor={(item) => item.id.toString()} // identifica cada tarefa
        renderItem={({ item }) => (
          <View style={styles.taskWrapper}>
            <Task
              text={item.text}                    // texto da tarefa
              completed={item.completed}          // status concluído/pendente
              onToggle={() => toggleCompleted(item.id)} // atualiza store + AsyncStorage
              onDelete={() => removerTarefa(item.id)}   // remove do store + AsyncStorage
              category={item.category}            // categoria
              time={item.time}                    // horário
            />
          </View>
        )}
        style={{ width: "100%" }}
      />
    </ImageBackground>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    paddingTop: 40,
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
  },
  botao: {
    backgroundColor: "#000",  // cor padrão do botão
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoAtivo: {
    backgroundColor: "#000",  // apenas o botão ativo muda visualmente
    borderWidth: 2,
    borderColor: "#DC385A", // destaque do botão ativo
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  botaoTextoAtivo: {
    color: "#DC385A", // destaca texto do botão ativo
    fontWeight: "800",
  },
  taskWrapper: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
});
