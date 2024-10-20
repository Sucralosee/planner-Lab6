import { useState } from 'react';
import './App.css'; // Assuming the CSS above is in App.css

function App() {
  const initialPlanner = [
    {
      taskName: 'put a task in',
      isCompleted: false,
    }
  ];

  const [tasks, setTasks] = useState(initialPlanner);
  const [newTask, setNewTask] = useState({
    taskName: '',
    isCompleted: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.taskName.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask({ taskName: '', isCompleted: false });
  }

  function handleRemove(index) {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  }

  function toggleCompletion(index) {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  }

  const taskList = tasks.map((task, index) => (
    <div key={index} className="task">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => toggleCompletion(index)}
        className="checkbox"
      />
      <p style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
        {task.taskName}
      </p>
      <button className="remove-btn" onClick={() => handleRemove(index)}>
        Remove
      </button>
    </div>
  ));

  const incompleteTaskCount = tasks.filter(task => !task.isCompleted).length;

  return (
    <>
      <h1>Daily Planner</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={newTask.taskName}
          onChange={(e) => setNewTask({ taskName: e.target.value, isCompleted: false })}
          placeholder="new task ..."
          className="task-input"
        />
        <button type="submit" className="save-btn">Save</button>
      </form>
      <p className="remaining-tasks">You have {incompleteTaskCount} tasks remaining</p>
      <div className="task-list">{taskList}</div>
    </>
  );
}

export default App;