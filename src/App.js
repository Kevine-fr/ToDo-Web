import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskInput, setEditTaskInput] = useState('');
  const [activeTab, setActiveTab] = useState('Personal');

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false,
        category: activeTab,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskInput(task.text);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editTaskInput } : task
      )
    );
    setEditTaskId(null);
    setEditTaskInput('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredTasks = tasks.filter(task => task.category === activeTab);

  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="tabs">
        <span
          className={`tab ${activeTab === 'Personal' ? 'active' : ''}`}
          onClick={() => handleTabChange('Personal')}
        >
          Personnel
        </span>
        <span
          className={`tab ${activeTab === 'Professional' ? 'active' : ''}`}
          onClick={() => handleTabChange('Professional')}
        >
          Professionnel
        </span>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Que voulez vous faire comme tache ?"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            {editTaskId === task.id ? (
              <input
                type="text"
                value={editTaskInput}
                onChange={(e) => setEditTaskInput(e.target.value)}
                onBlur={() => saveTask(task.id)} // Enregistre lors de la perte de focus
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span onDoubleClick={() => editTask(task)}>{task.text}</span>
              </>
            )}
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
            {editTaskId !== task.id && (
              <button onClick={() => editTask(task)}>✏️</button>
            )}
          </div>
        ))}
      </div>
      <button className="clear-completed" onClick={clearCompleted}>
        <p className='clear-completed-text'>Vider toutes les taches</p>
      </button>
    </div>
  );
}

export default App;
