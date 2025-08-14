import { create } from 'zustand';

export const useTarefasStore = create((set, get) => ({
  tasks: [],
  filtro: '',
  adicionarTarefa: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  removerTarefa: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  toggleCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  setFiltro: (filtro) => set({ filtro }),
  tarefasFiltradas: () =>
    get().filtro
      ? get().tasks.filter((task) =>
          task.text.toLowerCase().includes(get().filtro.toLowerCase())
        )
      : get().tasks,
}));