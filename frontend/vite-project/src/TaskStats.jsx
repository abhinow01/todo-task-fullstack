import React from 'react';

const TaskStats = ({ completedTasks, pendingTasks }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span>Task Complete</span>
        </div>
        <div className="text-2xl font-bold">{completedTasks}</div>
        <div className="text-sm text-gray-500">This Week</div>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span>Task Pending</span>
        </div>
        <div className="text-2xl font-bold">{pendingTasks}</div>
        <div className="text-sm text-gray-500">This Week</div>
      </div>
    </div>
  );
};

export default TaskStats;
