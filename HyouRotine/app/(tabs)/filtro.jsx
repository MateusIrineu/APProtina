import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { useState } from "react";
import Task from "../../components/Task";
import BigButton from "../../components/BigButton";
import { useBigTargets } from "../../components/BigTargetsContext";
const initialTasks = [
  { id: 1, completed: true, text: "Estudar React Native" },
  { id: 2, completed: false, text: "Fazer exercícios" },
  { id: 3, completed: true, text: "Ler documentação" },
];

export default function Filtro() {
  const [filtro, setFiltro] = useState("todas");
  const [tasks, setTasks] = useState(initialTasks);
  const { bigTargets } = useBigTargets();

  const remover = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filtro === "todas") return true;
    if (filtro === "concluidas") return task.completed;
    if (filtro === "pendentes") return !task.completed;
  });

  return (
    <ImageBackground
      source={require("../../assets/image/imagemFundo.png")}
      style={styles.container}
    >
      <View style={styles.botoes}>
        <BigButton
          title="Todas"
          onPress={() => setFiltro("todas")}
          style={[styles.botao, filtro === "todas" && styles.botaoAtivo]}
          textStyle={[
            styles.botaoTexto,
            filtro === "todas" && styles.botaoTextoAtivo,
          ]}
          accessibilityHint="Mostrar todas as tarefas"
          bigTargets={bigTargets} // <-- adicione aqui
        />
        <BigButton
          title="Concluídas"
          onPress={() => setFiltro("concluidas")}
          style={[styles.botao, filtro === "concluidas" && styles.botaoAtivo]}
          textStyle={[
            styles.botaoTexto,
            filtro === "concluidas" && styles.botaoTextoAtivo,
          ]}
          accessibilityHint="Mostrar apenas tarefas concluídas"
          bigTargets={bigTargets} // <-- adicione aqui
        />
        <BigButton
          bigTargets={bigTargets}
          title="Pendentes"
          onPress={() => setFiltro("pendentes")}
          style={[styles.botao, filtro === "pendentes" && styles.botaoAtivo]}
          textStyle={[
            styles.botaoTexto,
            filtro === "pendentes" && styles.botaoTextoAtivo,
          ]}
          accessibilityHint="Mostrar apenas tarefas pendentes"
        />
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Task
            text={item.text}
            completed={item.completed}
            onToggle={() => toggleCompleted(item.id)}
            onDelete={() => remover(item.id)}
          />
        )}
        style={{ width: "100%" }}
      />
    </ImageBackground>
  );
}

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
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoAtivo: {
    backgroundColor: "#DC385A",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  botaoTextoAtivo: {
    color: "#fff",
    fontWeight: "800",
  },
});
