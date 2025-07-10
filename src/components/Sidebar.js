import React, { useState } from 'react';
import { Calendar, Plus, Search, ChevronRight, ChevronDown, Menu } from 'lucide-react';
import { FaCalendarDay } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import { RiStickyNoteFill } from "react-icons/ri";

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
  const [upcomingExpanded, setUpcomingExpanded] = useState(false);

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
  const tomorrowTasks = categorizedTasks.tomorrow;
  const thisWeekTasks = categorizedTasks.thisWeek;
  const totalUpcoming = todayTasks.length + tomorrowTasks.length + thisWeekTasks.length;

  const handleUpcomingClick = () => {
    setUpcomingExpanded(!upcomingExpanded);
    if (!upcomingExpanded) {
      setCurrentView('upcoming');
    }
  };

  const handleSubMenuClick = (view) => {
    setCurrentView(view);
  };

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
              {/* Upcoming Menu with Sub-items */}
              <li>
                <button
                  onClick={handleUpcomingClick}
                  className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between ${
                    (currentView === 'upcoming' || currentView === 'today' || currentView === 'tomorrow' || currentView === 'thisweek') ? 'bg-gray-200' : ''
                  }`}
                >
                  <span className="flex items-center">
                    {upcomingExpanded ? (
                      <ChevronDown size={16} className="mr-2" />
                    ) : (
                      <ChevronRight size={16} className="mr-2" />
                    )}
                    Upcoming
                  </span>
                  <span className="text-sm text-gray-500">{totalUpcoming}</span>
                </button>
                
                {/* Expandable Sub-menu */}
                {upcomingExpanded && (
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>
                      <button
                        onClick={() => handleSubMenuClick('today')}
                        className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between text-sm ${
                          currentView === 'today' ? 'bg-gray-300' : ''
                        }`}
                      >
                        <span className="flex items-center">
                          <FaCalendarDay className="w-3 h-3 mr-2"></FaCalendarDay>
                          Today
                        </span>
                        <span className="text-xs text-gray-500">{todayTasks.length}</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSubMenuClick('tomorrow')}
                        className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between text-sm ${
                          currentView === 'tomorrow' ? 'bg-gray-300' : ''
                        }`}
                      >
                        <span className="flex items-center">
                          <FaCalendarDays  className="w-3 h-3 mr-2"></FaCalendarDays>
                          Tomorrow
                        </span>
                        <span className="text-xs text-gray-500">{tomorrowTasks.length}</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSubMenuClick('thisweek')}
                        className={`w-full text-colored p-2 rounded hover:bg-gray-200 flex items-center justify-between text-sm ${
                          currentView === 'thisweek' ? 'bg-gray-300' : ''
                        }`}
                      >
                        <span className="flex items-center">
                          <FaRegCalendarDays  className="w-3 h-3 mr-2"></FaRegCalendarDays>
                          This week
                        </span>
                        <span className="text-xs text-gray-500">{thisWeekTasks.length}</span>
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* Calendar */}
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

              {/* Sticky Wall */}
              <li>
                <button
                  onClick={() => setCurrentView('sticky-wall')}
                  className={`w-full text-left p-2 rounded hover:bg-gray-200 flex items-center justify-between ${
                    currentView === 'sticky-wall' ? 'bg-gray-200' : ''
                  }`}
                >
                  <span className="flex items-center">
                    <RiStickyNoteFill  className="w-4 h-4 mr-2"></RiStickyNoteFill>
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
            <h3 className="text-sm font-2 text-gray-600 mb-3">TAGS</h3>
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