import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useState } from "react"
import Task from "../../components/Task";

const initialTasks = [
    { id: 1, completed: true, text: "Estudar React Native" },
    { id: 2, completed: false, text: "Fazer exercícios" },
    { id: 3, completed: true, text: "Ler documentação" },
];

export default function Filtro() {
    const [filtro, setFiltro] = useState('todas');
    const [tasks, setTasks] = useState(initialTasks);

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
        if (filtro === 'todas') return true;
        if (filtro === 'concluidas') return task.completed;
        if (filtro === 'pendentes') return !task.completed;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.nome}>Pagina de Filtro</Text>
            <View style={styles.botoes}>
                <Button title="Todas" onPress={() => setFiltro('todas')} />
                <Button title="Concluídas" onPress={() => setFiltro('concluidas')} />
                <Button title="Pendentes" onPress={() => setFiltro('pendentes')} />
            </View>
            <Text style={styles.filtroSelecionado}>Filtro selecionado: {filtro}</Text>
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
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    botoes: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 20,
    },
    filtroSelecionado: {
        fontSize: 16,
        marginTop: 10,
    },
});