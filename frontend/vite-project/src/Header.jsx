import React from 'react';
import { Search, ChevronLeft, Settings, Bell } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, currentView, setCurrentView }) => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between p-4">
            {currentView !== 'home' && (
              <button onClick={() => setCurrentView('home')} className="p-2">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1 mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a task"
                  className="w-full p-2 pr-10 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
            {currentView === 'home' && (
              <div className="flex gap-4">
                <Settings className="w-6 h-6 text-gray-600" />
                <Bell className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
