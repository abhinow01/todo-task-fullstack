import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // New date state
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState('In Progress');

  // Populate fields if task prop is provided (edit mode)
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date); // Populate date if editing an existing task
      setStartTime(task.startTime);
      setEndTime(task.endTime);
      setStatus(task.status);
    }
  }, [task]);
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toISOString().split('T')[1].slice(0, 5);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { title, description, date, startTime, endTime, status };
    onSubmit(updatedTask); // Send updated task data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="time"
          className="w-full p-2 border rounded"
          value={startTime}
          min={date === today ? currentTime : ''}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Time</label>
        <input
          type="time"
          className="w-full p-2 border rounded"
          value={endTime}
          min={date === today ? currentTime : ''}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
