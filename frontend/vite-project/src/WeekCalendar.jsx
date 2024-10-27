import React, { useState } from 'react';

const WeekCalendar = ({ onDateChange }) => {
  // Function to get the current week's dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - currentDay)); // Start on Sunday

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index); // Increment to get each day of the week
      return {
        date: day.getDate(),
        month: day.getMonth() + 1, // Month is 0-indexed
        year: day.getFullYear(),
        isToday: new Date().toDateString() === day.toDateString(),
        formattedDate: day.toISOString().split('T')[0], // For API and display
      };
    });
  };

  const [weekDates] = useState(getCurrentWeekDates());

  return (
    <div className="bg-white p-4">
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-sm text-gray-500">
            {day}
          </div>
        ))}
        {weekDates.map((date, index) => (
          <button
            key={index}
            className={`text-sm p-2 rounded-lg w-full ${
              date.isToday ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => onDateChange(date.formattedDate)} // Call onDateChange with the selected date
          >
            {date.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
