import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from './Header';
import WeekCalendar from './WeekCalendar';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import axios from 'axios';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date by default
  // Load initial data
  useEffect(() => {
    fetchTasksByDate(selectedDate);
  }, [[selectedDate]]);

//   const fetchTasksByWeek = async () => {
//     try {
//       const today = new Date();
//       const formattedDate = today.toISOString().split('T')[0];
//       const response = await axios.get(`http://localhost:3000/api/tasks/week/${formattedDate}`);
//       setTasks(response.data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

const fetchTasksByDate = async (date) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/week/${date}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  const addTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setCurrentView('home')
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedData);
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
      setCurrentView('home')
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (taskId, updatedStatus) => {
    try {
      await updateTask(taskId, { status: updatedStatus });
      
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const toggleView = (view, task = null) => {
    setCurrentView(view);
    setEditingTask(task); // Set the task to edit
  };
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto md:px-4">
        <div className="md:max-w-md md:mx-auto">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {currentView === 'home' && (
            <>
              <WeekCalendar onDateChange={setSelectedDate}/>
              <TaskStats completedTasks={completedTasks} pendingTasks={pendingTasks} />
              <div className='flex flex-row items-center justify-center'>
              <div className="w-4/5 h-4 bg-blue-100 rounded-full ">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{
                  width: `${(completedTasks / (pendingTasks + completedTasks)) * 100 || 0}%`,
                }}
              />
            </div>
            </div>
              <TaskList
                tasks={tasks}
                searchQuery={searchQuery}
                deleteTask={deleteTask}
                toggleView={toggleView}
                updateTaskStatus={updateTaskStatus}
              />
              <button
                className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
                onClick={() => toggleView('newTask')}
              >
                <Plus className="w-6 h-6" />
              </button>
            </>
          )}
          {currentView === 'newTask' && (
            <TaskForm onSubmit={addTask} onCancel={() => toggleView('home')} />
          )}
          {currentView === 'editTask' && editingTask && (
            <TaskForm
              task={editingTask} // Pass the editing task data to the form
              onSubmit={(updatedData) => updateTask(editingTask._id, updatedData)}
              onCancel={() => toggleView('home')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
