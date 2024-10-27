// services/taskService.js
const Task = require('../models/task')
exports.createTask = (taskData) => Task.create(taskData);

exports.getTasksByWeek = (weekStartDate) => {
  const start = new Date(weekStartDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return Task.find({ date: { $gte: start, $lt: end } });
};

exports.updateTask = (taskId, updateData) => 
  Task.findByIdAndUpdate(taskId, updateData, { new: true });

exports.deleteTask = (taskId) => Task.findByIdAndDelete(taskId);

exports.searchTasks = (keyword) => {
  const regex = new RegExp(keyword, 'i'); // case-insensitive search
  return Task.find({ $or: [{ title: regex }, { description: regex }] });
};
