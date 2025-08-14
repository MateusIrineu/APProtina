import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useState } from "react";
import Task from "../../components/Task";
import { useTasksStore } from '../../store/tasksStore';

export default function Filtro() {
    const [filtro, setFiltro] = useState('todas');
    const { tasks, removeTask, toggleCompleted } = useTasksStore();

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
                        onDelete={() => removeTask(item.id)}
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