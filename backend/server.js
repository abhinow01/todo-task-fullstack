// server.js
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();
app.use(cors())
// Middleware
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
