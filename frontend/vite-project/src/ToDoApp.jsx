import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Header from './Header';
import WeekCalendar from './WeekCalendar';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;
const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date by default
  const [loading, setLoading] = useState(true);
  // Load initial data
  const fetchTasksByDate = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/api/tasks/week/${date}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect with proper dependency and cleanup
  useEffect(() => {
    let mounted = true;

    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/tasks/week/${selectedDate}`);
        console.log("==response==useeffect==" , response)
        if (mounted) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        if (mounted) {
          setTasks([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTasks();
    return () => {
      mounted = false;
    };
  }, [selectedDate, baseURL]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const addTask = async (newTask) => {
    try {
      await axios.post(`${baseURL}/api/tasks`, newTask);
      // Refetch tasks for the current date to ensure we have the latest data
      await fetchTasksByDate(selectedDate);
      setCurrentView('home');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.put(`${baseURL}/api/tasks/${taskId}`, updatedData);
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
      setCurrentView('home');
      // Refetch tasks to ensure consistency
      await fetchTasksByDate(selectedDate);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseURL}/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      // Refetch tasks to ensure consistency
      await fetchTasksByDate(selectedDate);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (taskId, updatedStatus) => {
    try {
      await updateTask(taskId, { status: updatedStatus });
      // Refetch tasks to ensure we have the latest data
      await fetchTasksByDate(selectedDate);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const toggleView = (view, task = null) => {
    setCurrentView(view);
    setEditingTask(task);
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
              <WeekCalendar 
                onDateChange={handleDateSelect} 
                selectedDate={selectedDate}
              />
              {loading ? (
                <div className="text-center py-4">Loading tasks...</div>
              ) : (
                <>
                  <TaskStats completedTasks={completedTasks} pendingTasks={pendingTasks} />
                  <div className='flex flex-row items-center justify-center'>
                    <div className="w-4/5 h-4 bg-blue-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${(completedTasks / (pendingTasks + completedTasks)) * 100 || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  {tasks.length > 0 ? (
                    <TaskList
                      tasks={tasks}
                      searchQuery={searchQuery}
                      deleteTask={deleteTask}
                      toggleView={toggleView}
                      updateTaskStatus={updateTaskStatus}
                    />
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No tasks for this date
                    </div>
                  )}
                </>
              )}
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
              task={editingTask}
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
