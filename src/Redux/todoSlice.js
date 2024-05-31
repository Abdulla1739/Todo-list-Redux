import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
  nextId: 1, 
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addToDo: (state, action) => {
      state.todoList.push({ id: state.nextId, ...action.payload });
      state.nextId += 1;
    },
    removeToDo: (state, action) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addToDo, removeToDo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
