import { View, Text, StyleSheet, FlatList, ImageBackground, Pressable } from 'react-native';
import { useState } from "react";
import Task from "../../components/Task";
import { useTarefasStore } from "../../store/tasksStore"; // ajuste o caminho se necessário

export default function Filtro() {
    const [filtro, setFiltro] = useState('todas');

    // Zustand hooks
    const tasks = useTarefasStore((state) => state.tasks);
    const removerTarefa = useTarefasStore((state) => state.removerTarefa);
    const toggleCompleted = useTarefasStore((state) => state.toggleCompleted);

    const filteredTasks = tasks.filter((task) => {
        if (filtro === 'todas') return true;
        if (filtro === 'concluidas') return task.completed;
        if (filtro === 'pendentes') return !task.completed;
    });

    return (
        <ImageBackground
            source={require("../../assets/image/imagemFundo.png")}
            style={styles.container}
        >
            <View style={styles.botoes}>
                <Pressable style={styles.botao} onPress={() => setFiltro('todas')}>
                    <Text style={styles.botaoTexto}>Todas</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => setFiltro('concluidas')}>
                    <Text style={styles.botaoTexto}>Concluídas</Text>
                </Pressable>
                <Pressable style={styles.botao} onPress={() => setFiltro('pendentes')}>
                    <Text style={styles.botaoTexto}>Pendentes</Text>
                </Pressable>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Task
                        text={item.text}
                        completed={item.completed}
                        onToggle={() => toggleCompleted(item.id)}
                        onDelete={() => removerTarefa(item.id)}
                        category={item.category}
                        time={item.time}
                    />
                )}
                style={{ width: '100%' }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        alignItems: 'center',
        paddingTop: 40
    },
    botoes: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 20,
    },
    botao: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    }
});