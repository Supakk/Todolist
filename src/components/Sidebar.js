import React from 'react';
import { Calendar, Plus, Search, ChevronRight, Menu } from 'lucide-react';

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  currentView, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery, 
  lists, 
  tags,
  tasks,
  stickyNotes
}) => {
  // ใช้ logic เดียวกับ UpcomingView
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const thisWeekEnd = new Date(today);
  thisWeekEnd.setDate(today.getDate() + 7);

  const categorizedTasks = {
    today: tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === today.toDateString();
    }),
    tomorrow: tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === tomorrow.toDateString();
    }),
    thisWeek: tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate > tomorrow && taskDate <= thisWeekEnd;
    })
  };

  const todayTasks = categorizedTasks.today;
  const totalUpcoming = categorizedTasks.today.length + categorizedTasks.tomorrow.length + categorizedTasks.thisWeek.length;

  return (
  <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-100 h-screen p-4 transition-all duration-300`}>
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <Menu size={20} />
      </button>
      {sidebarOpen && <span className="text-xl font-semibold">Menu</span>}
    </div>

    {sidebarOpen && (
      <>
        <div className="mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">TASKS</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentView('upcoming')}
                className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between ${
                  currentView === 'upcoming' ? 'bg-gray-200' : ''
                }`}
              >
                <span className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Upcoming
                </span>
                <span className="text-sm text-gray-500">{totalUpcoming}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('today')}
                className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between ${
                  currentView === 'today' ? 'bg-gray-200' : ''
                }`}
              >
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                  Today
                </span>
                <span className="text-sm text-gray-500">{todayTasks.length}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('calendar')}
                className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center ${
                  currentView === 'calendar' ? 'bg-gray-200' : ''
                }`}
              >
                <Calendar size={16} className="mr-2" />
                Calendar
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('sticky-wall')}
                className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between ${
                  currentView === 'sticky-wall' ? 'bg-gray-200' : ''
                }`}
              >
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
                  Sticky Wall
                </span>
                <span className="text-sm text-gray-500">{stickyNotes.length}</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">LISTS</h3>
          <ul className="space-y-2">
            {lists.map(list => (
              <li key={list.id}>
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-200">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${list.color} rounded-full mr-3`}></div>
                    <span>{list.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{list.count}</span>
                </div>
              </li>
            ))}
            <li>
              <button className="w-full text-left p-2 rounded hover:bg-gray-200 flex items-center text-gray-600">
                <Plus size={16} className="mr-2" />
                Add New List
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">TAGS</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag.id} className={`px-2 py-1 text-xs rounded ${tag.color}`}>
                {tag.name}
              </span>
            ))}
            <button className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              + Add Tag
            </button>
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default Sidebar;