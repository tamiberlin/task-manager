import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [],
  filterText: "",
  filterCategory: "ALL",
};

const STORAGE_KEY = "tasks_state";

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  } catch {
    return initialState;
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadFromStorage(),

  reducers: {
    addTask: {
      prepare({ text, category }) {
        return {
          payload: {
            id: uuidv4(),
            text: text || "",
            category: category || "GENERAL",
            status: "NEW",
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.items.unshift(action.payload);
        saveToStorage(state);
      },
    },

    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
      saveToStorage(state);
    },

    toggleComplete(state, action) {
      state.items = state.items.map((task) => {
        if (task.id !== action.payload) return task;
        const newStatus = task.status === "COMPLETED" ? "IN PROGRESS" : "COMPLETED";
        return { ...task, status: newStatus };
      });
      saveToStorage(state);
    },

    updateStatus(state, action) {
      const { id, status } = action.payload;
      state.items = state.items.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      saveToStorage(state);
    },

    setFilterText(state, action) {
      state.filterText = action.payload;
      saveToStorage(state);
    },

    setFilterCategory(state, action) {
      state.filterCategory = action.payload;
      saveToStorage(state);
    },

    loadInitial() {
      return loadFromStorage();
    },

    clearAll(state) {
      state.items = [];
      saveToStorage(state);
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  setFilterText,
  setFilterCategory,
  loadInitial,
  clearAll,
  updateStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
