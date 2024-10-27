import React, { useState } from 'react';
import Task from '../src/Components/Task';
import TaskForm from '../src/Components/TaskForm';
import './App.css';

function App() {
  const initialPlanner = [
    {
      taskName: 'put a task in',
      isCompleted: false,
    }
  ];

  const [tasks, setTasks] = useState(initialPlanner);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', or 'pending'

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleRemove = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true; // 'all' filter
  });

  const incompleteTaskCount = tasks.filter(task => !task.isCompleted).length;

  return (
    <>
      <h1>Daily Planner</h1>
      <TaskForm onSubmit={handleAddTask} />
      <p className="remaining-tasks">You have {incompleteTaskCount} tasks remaining</p>
      
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onToggle={() => toggleCompletion(index)}
            onDelete={() => handleRemove(index)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
