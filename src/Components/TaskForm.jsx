import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [newTask, setNewTask] = useState({
    taskName: '',
    isCompleted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.taskName.trim() === '') return;
    onSubmit(newTask);
    setNewTask({ taskName: '', isCompleted: false });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={newTask.taskName}
        onChange={(e) => setNewTask({ taskName: e.target.value, isCompleted: false })}
        placeholder="new task ..."
        className="task-input"
      />
      <button type="submit" className="save-btn">
        Save
      </button>
    </form>
  );
};

export default TaskForm;