import React, { useState } from 'react';
import toast from 'react-hot-toast';

const TaskForm = ({ onTaskSubmit }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleInputChange = (e) => {
    setTaskContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (taskContent.trim().length > 3) {
      toast.success('Task added', { icon: '🦣' });
      onTaskSubmit({ content: taskContent });
      setTaskContent('');
    } else {
      toast.error('Task must be more than 3 characters', { icon: '🚨' });
    }
  };

  return (
    <form className="mt-4 flex items-center space-x-4" onSubmit={handleSubmit}>
      <input
        className="border rounded p-2 w-80"
        type="text"
        placeholder="Add a task"
        value={taskContent}
        onChange={handleInputChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Add
      </button>
    </form>
  );
};

export default TaskForm;
