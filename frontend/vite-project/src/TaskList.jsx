import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const TaskList = ({ tasks, searchQuery, deleteTask, toggleView, updateTaskStatus }) => {
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCompletion = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      const updatedStatus = task.status === 'Completed' ? 'In Progress' : 'Completed';
      updateTaskStatus(taskId, updatedStatus);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Tasks Today</h2>
        <button className="text-blue-500" onClick={() => toggleView('allTasks')}>
          View All
        </button>
      </div>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === 'Completed'}
                onChange={() => handleToggleCompletion(task._id)}
                className="w-5 h-5 rounded-md border-2 border-blue-500"
              />
              <div className={`${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">
                  {task.startTime} - {task.endTime}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => deleteTask(task._id)}>
                <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
              </button>
              <button onClick={() => toggleView('editTask', task)}>
                <Edit2 className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
