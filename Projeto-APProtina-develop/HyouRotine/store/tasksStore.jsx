// store/tasksStore.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

//  Chave única para salvar as tarefas no AsyncStorage
const TASKS_KEY = '@HYOUROTINE_TASKS';

/* ---------------------- Funções auxiliares ---------------------- */
async function loadTasks() {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Erro ao carregar tarefas:', error);
    return [];
  }
}

async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Erro ao salvar tarefas:', error);
  }
}

/* ---------------------- Zustand Store ---------------------- */
export const useTarefasStore = create((set, get) => ({
  // 📌 Estado inicial
  tasks: [],
  filtro: "todas", 
  carregando: true,

  //  Carregar tarefas
  carregarTarefas: async () => {
    const tasks = await loadTasks();
    set({ tasks, carregando: false });
  },

  //  Adicionar
  adicionarTarefa: async (task) => {
    const novaLista = [...get().tasks, task];
    set({ tasks: novaLista });
    await saveTasks(novaLista);
  },

  //  Remover
  removerTarefa: async (id) => {
    const novaLista = get().tasks.filter((task) => task.id !== id);
    set({ tasks: novaLista });
    await saveTasks(novaLista);
  },

  //  Toggle completed
  toggleCompleted: async (id) => {
    const novaLista = get().tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    set({ tasks: novaLista });
    await saveTasks(novaLista);
  },

  //  Definir filtro ativo
  setFiltro: (filtro) => set({ filtro }),

  //  Filtragem por texto (opcional, se quiser usar depois)
  tarefasFiltradas: () => {
    const { filtro, tasks } = get();
    return filtro
      ? tasks.filter((task) =>
          task.text.toLowerCase().includes(filtro.toLowerCase())
        )
      : tasks;
  },
}));
