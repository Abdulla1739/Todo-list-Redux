import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToDo, removeToDo, toggleComplete } from './Redux/todoSlice';
import './App.css';

const App = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const dispatch = useDispatch();
  const [taskValue, setTaskValue] = useState('');

  const handleSubmit = () => {
    if (taskValue.trim()) {
      dispatch(addToDo({ value: taskValue, completed: false }));
      setTaskValue('');
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add todo..."
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="show-todo">
        {todoList.map((todo) => (
          <div key={todo.id} className={`item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <p>{todo.value}</p>
            <button onClick={() => dispatch(removeToDo(todo.id))}>Delete</button>
          </div>
        ))}
      </div>
      <div style={{marginTop:"20px", fontWeight:"800"}}>Total complete items: {todoList.filter(todo => todo.completed).length}</div>
    </div>
  );
};

export default App;
