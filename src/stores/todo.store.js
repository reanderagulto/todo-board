import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const todoStore = create(
    persist(
        (set) => ({
            // Todo List
            todos: [],

            // Add Todo Function
            addTodo: (newTodo) => set((state) => ({
                todos: [...state.todos, newTodo] 
            })),

            // Remove Todo Function
            removeTodo: (id) => set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id)
            })),

            // Edit Todo
            editTodo: (id, updatedFields) => set((state) => ({
                todos: state.todos.map((todo) => 
                    todo.id === id 
                        ? { ...todo, ...updatedFields }
                        : todo
                )
            })),

            // Clear Todos: 
            clearTodos: () => set({ todos: [] })

        }), 
        {
            name: 'todo-storage'
        }
    )
);