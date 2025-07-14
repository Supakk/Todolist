import React, { useState } from 'react';
import { Calendar, Plus, Search, ChevronRight, ChevronDown, Menu, X, Check, Hash, Trash2, AlertTriangle } from 'lucide-react';
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
  setLists,
  tags,
  setTags,
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

  // Responsive sidebar classes
  const sidebarBase = 'bg-gray-100 h-screen p-4 transition-all duration-300 z-40';
  const sidebarDesktop = `${sidebarOpen ? 'w-64' : 'w-16'} hidden sm:block`;
  const sidebarMobile = `fixed top-0 left-0 w-64 h-full block sm:hidden transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded shadow sm:hidden"
        onClick={() => setSidebarOpen(true)}
        style={{ display: sidebarOpen ? 'none' : 'block' }}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar for mobile */}
      <div className={`${sidebarBase} ${sidebarMobile}`}> 
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-200 rounded sm:hidden"
            aria-label="Close sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="text-xl font-semibold">Menu</span>
        </div>
        {/* Sidebar content */}
        <SidebarContent
          sidebarOpen={sidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          lists={lists}
          setLists={setLists}
          tags={tags}
          setTags={setTags}
          tasks={tasks}
          stickyNotes={stickyNotes}
          upcomingExpanded={upcomingExpanded}
          setUpcomingExpanded={setUpcomingExpanded}
          handleUpcomingClick={handleUpcomingClick}
          handleSubMenuClick={handleSubMenuClick}
          todayTasks={todayTasks}
          tomorrowTasks={tomorrowTasks}
          thisWeekTasks={thisWeekTasks}
          totalUpcoming={totalUpcoming}
        />
      </div>

      {/* Sidebar for desktop */}
      <div className={`${sidebarBase} ${sidebarDesktop}`}> 
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-200 rounded"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          {sidebarOpen && <span className="text-xl font-semibold">Menu</span>}
        </div>
        {/* Sidebar content */}
        <SidebarContent
          sidebarOpen={sidebarOpen}
          isCollapsed={!sidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          lists={lists}
          setLists={setLists}
          tags={tags}
          setTags={setTags}
          tasks={tasks}
          stickyNotes={stickyNotes}
          upcomingExpanded={upcomingExpanded}
          setUpcomingExpanded={setUpcomingExpanded}
          handleUpcomingClick={handleUpcomingClick}
          handleSubMenuClick={handleSubMenuClick}
          todayTasks={todayTasks}
          tomorrowTasks={tomorrowTasks}
          thisWeekTasks={thisWeekTasks}
          totalUpcoming={totalUpcoming}
        />
      </div>
    </>
  );
};

// Extract sidebar content to a separate component for reuse
const SidebarContent = ({
  sidebarOpen,
  isCollapsed,
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  lists,
  setLists,
  tags,
  setTags,
  tasks,
  stickyNotes,
  upcomingExpanded,
  setUpcomingExpanded,
  handleUpcomingClick,
  handleSubMenuClick,
  todayTasks,
  tomorrowTasks,
  thisWeekTasks,
  totalUpcoming
}) => {
  if (isCollapsed) {
    // Render nothing when collapsed (no icons, no buttons)
    return <div className="mt-4"></div>;
  }
  return (
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

      {/* Lists Section */}
      <Lists lists={lists} setLists={setLists} searchQuery={searchQuery} />

      {/* Tags Section */}
      <Tags tags={tags} setTags={setTags} searchQuery={searchQuery} />
    </>
  );
};

// Enhanced Lists Component with improved UI
const Lists = ({ lists, setLists, searchQuery }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const colorOptions = [
    { value: '#3b82f6', name: 'Blue' },
    { value: '#ef4444', name: 'Red' },
    { value: '#10b981', name: 'Green' },
    { value: '#f59e0b', name: 'Yellow' },
    { value: '#8b5cf6', name: 'Purple' },
    { value: '#ec4899', name: 'Pink' },
    { value: '#06b6d4', name: 'Cyan' },
    { value: '#84cc16', name: 'Lime' }
  ];

  const handleAddList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName.trim(),
        color: selectedColor,
        taskCount: 0
      };
      setLists([...lists, newList]);
      setNewListName('');
      setSelectedColor('#3b82f6');
      setShowAddForm(false);
    }
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
    setShowDeleteConfirm(null);
  };

  const handleCancel = () => {
    setNewListName('');
    setSelectedColor('#3b82f6');
    setShowAddForm(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddList();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Filter lists by search query
  const filteredLists = searchQuery
    ? lists.filter(list => list.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : lists;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">LISTS</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Add new list"
        >
          <Plus size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Add List Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-3">
            <input
              type="text"
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Choose color</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color.value ? 'border-gray-400 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddList}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
            >
              <Check size={14} />
              Add
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center gap-1"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-lg font-semibold">Delete List</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{showDeleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteList(showDeleteConfirm.id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lists */}
      <ul className="space-y-1">
        {filteredLists.map((list) => (
          <li key={list.id}>
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-200 group">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: list.color }}
                />
                <span className="text-sm truncate">{list.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{list.taskCount || 0}</span>
                <button
                  onClick={() => setShowDeleteConfirm(list)}
                  className="p-1 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete list"
                >
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Enhanced Tags Component with improved UI
const Tags = ({ tags, setTags, searchQuery }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const colorOptions = [
    { value: '#3b82f6', name: 'Blue' },
    { value: '#ef4444', name: 'Red' },
    { value: '#10b981', name: 'Green' },
    { value: '#f59e0b', name: 'Yellow' },
    { value: '#8b5cf6', name: 'Purple' },
    { value: '#ec4899', name: 'Pink' },
    { value: '#06b6d4', name: 'Cyan' },
    { value: '#84cc16', name: 'Lime' }
  ];

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: Date.now(),
        name: newTagName.trim(),
        color: selectedColor,
        taskCount: 0
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setSelectedColor('#3b82f6');
      setShowAddForm(false);
    }
  };

  const handleDeleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    setShowDeleteConfirm(null);
  };

  const handleCancel = () => {
    setNewTagName('');
    setSelectedColor('#3b82f6');
    setShowAddForm(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Filter tags by search query
  const filteredTags = searchQuery
    ? tags.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : tags;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">TAGS</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Add new tag"
        >
          <Plus size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Add Tag Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Choose color</p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color.value ? 'border-gray-400 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddTag}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
            >
              <Check size={14} />
              Add
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center gap-1"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-lg font-semibold">Delete Tag</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "#{showDeleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTag(showDeleteConfirm.id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      <ul className="space-y-1">
        {filteredTags.map((tag) => (
          <li key={tag.id}>
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-200 group">
              <div className="flex items-center">
                <Hash size={12} className="mr-2 text-gray-400" />
                <span 
                  className="text-sm font-medium px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">{tag.taskCount || 0}</span>
                <button
                  onClick={() => setShowDeleteConfirm(tag)}
                  className="p-1 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete tag"
                >
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;