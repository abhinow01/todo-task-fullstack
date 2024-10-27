// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Added startTime field
  endTime: { type: String, required: true },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
});

module.exports = mongoose.model('Task', taskSchema);
