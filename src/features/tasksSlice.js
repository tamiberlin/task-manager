import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [], // array of { id, text, category, completed, createdAt }
  filterText: '',
  filterCategory: 'ALL',
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem('tasks_state', JSON.stringify(state));
  } catch (e) { /* ignore */ }
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem('tasks_state');
    if (!raw) return initialState;
    return JSON.parse(raw);
  } catch (e) {
    return initialState;
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadFromStorage(),
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload);
        saveToStorage(state);
      },
      prepare({ text, category }) {
        return {
          payload: {
            id: uuidv4(),
            text,
            category,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    deleteTask(state, action) {
      state.items = state.items.filter(t => t.id !== action.payload);
      saveToStorage(state);
    },
    toggleComplete(state, action) {
      const t = state.items.find(it => it.id === action.payload);
      if (t) t.completed = !t.completed;
      saveToStorage(state);
    },
    setFilterText(state, action) {
      state.filterText = action.payload;
      // don't save filters to storage if you prefer; but okay to save:
      saveToStorage(state);
    },
    setFilterCategory(state, action) {
      state.filterCategory = action.payload;
      saveToStorage(state);
    },
    loadInitial(state, action) {
      return loadFromStorage();
    },
    clearAll(state) {
      state.items = [];
      saveToStorage(state);
    },
  },
});

export const {
  addTask, deleteTask, toggleComplete, setFilterText, setFilterCategory, loadInitial, clearAll,
} = tasksSlice.actions;

export default tasksSlice.reducer;
