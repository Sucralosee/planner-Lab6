import React from 'react';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={onToggle}
        className="checkbox"
        disabled={task.isCompleted} // Disable checkbox when task is completed
      />
      <p style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
        {task.taskName}
      </p>
      <button className="remove-btn" onClick={onDelete}>
        Remove
      </button>
    </div>
  );
};

export default Task;