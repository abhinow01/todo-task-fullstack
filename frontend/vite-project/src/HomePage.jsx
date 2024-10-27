import React from 'react';
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 h-80 relative flex flex-col items-center justify-center">
          <div className="absolute top-6 right-6 bg-blue-300 rounded-full w-12 h-12"></div>
          <div className="absolute top-1/4 left-6 w-12 h-12 text-white opacity-25">
            <div className="wavy-lines bg-blue-700"></div>
          </div>
          <div className="absolute bottom-6 right-6 w-12 h-12 text-white opacity-25">
            <div className="wavy-lines bg-blue-700"></div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">Manage What To Do</h2>
          <p className="text-gray-600 text-center mb-6">
            The best way to manage what you have to do, don’t forget your plans
          </p>
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200" onClick={()=>{navigate('/todo')}}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
