import { create } from 'zustand';

export const useTasksStore = create((set) => ({
  tasks: [{ id: 1, completed: true, text: "Estudar React Native" }],
  addTask: (text) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: state.tasks.length + 1,
          completed: false,
          text,
        },
      ],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleCompleted: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));