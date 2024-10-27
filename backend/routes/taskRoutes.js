// routes/taskRoutes.js
const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', taskController.createTask);
router.get('/tasks/week/:weekStartDate', taskController.getTasksByWeek);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.get('/tasks/search', taskController.searchTasks);

module.exports = router;
