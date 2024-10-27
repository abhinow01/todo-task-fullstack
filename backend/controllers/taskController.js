// controllers/taskController.js
const TaskService = require('../services/taskService');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.log("error create task "  , error )
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by week
exports.getTasksByWeek = async (req, res) => {
  try {
    const tasks = await TaskService.getTasksByWeek(req.params.weekStartDate);
    res.status(200).json(tasks);
  } catch (error) {
    console.log("fetch tasks error " , error)
    res.status(500).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await TaskService.deleteTask(req.params.id);
    res.status(204).send().json({message : "deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search tasks
exports.searchTasks = async (req, res) => {
  try {
    const tasks = await TaskService.searchTasks(req.query.keyword);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
