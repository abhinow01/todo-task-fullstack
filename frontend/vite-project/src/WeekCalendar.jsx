import React, { useState } from 'react';


const WeekCalendar = ({ onDateChange, selectedDate }) => {
  // Function to get the current week's dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today.setDate(today.getDate() - currentDay));
    
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);
      const formattedDate = day.toISOString().split('T')[0];
      
      return {
        date: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
        isToday: new Date().toDateString() === day.toDateString(),
        formattedDate
      };
    });
  };

  const [weekDates] = useState(getCurrentWeekDates());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {/* Day headers */}
      {days.map((day) => (
        <div key={day} className="text-center font-medium p-2">
          {day}
        </div>
      ))}
      
      {/* Date buttons */}
      {weekDates.map((date) => (
        <button
          key={date.formattedDate}
          variant={selectedDate === date.formattedDate ? "default" : "outline"}
          className={`p-2 w-full ${
            date.isToday ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onDateChange(date.formattedDate)}
        >
          {date.date}
        </button>
      ))}
    </div>
  );
};
export default WeekCalendar