import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, User } from 'lucide-react';
import AddEventModal from './AddEventModal';
import ConfirmDeletePopup from './DeleteConfirmModal';

const CalendarView = ({
  selectedDate,
  setSelectedDate,
  calendarEvents = [],
  setCalendarEvents,
  upcomingTasks = [],
  todayTasks = [],
  tomorrowTasks = [],
  weekTasks = [],
  onDeleteTask
}) => {
  const [viewType, setViewType] = useState('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Helper: get events for a specific date
  const getEventsForDate = (date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Time slots for day view
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    const time12 = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
    timeSlots.push({ hour, time12, time24: `${hour.toString().padStart(2, '0')}:00` });
  }

  // Navigation
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Helper function to get relative day text
  const getRelativeDayText = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Mini calendar for sidebar
  const renderMiniCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1);
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-1">
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setSelectedDate(newDate);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setSelectedDate(newDate);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="text-center text-gray-500 p-1 font-medium">
              {day}
            </div>
          ))}
          {days.map((date, idx) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isCurrentMonth = date.getMonth() === month;
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`p-1 text-center rounded hover:bg-gray-100 transition-colors ${
                  isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' :
                  isToday ? 'bg-gray-900 text-white' :
                  !isCurrentMonth ? 'text-gray-400' : 'text-gray-700'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Day view
  const renderDayView = () => (
    <div className="flex-1 overflow-auto bg-white">
      <div className="min-h-full">
        <div className="relative">
          {timeSlots.map(slot => (
            <div key={slot.hour} className="flex border-b border-gray-100" style={{ minHeight: '60px' }}>
              <div className="w-16 flex-shrink-0 text-xs text-gray-500 p-2 text-right">
                {slot.hour === 0 ? '' : slot.time12}
              </div>
              <div className="flex-1 relative border-l border-gray-100">
                {/* Events positioned absolutely */}
                {getEventsForDate(selectedDate)
                  .filter(event => {
                    const eventHour = parseInt(event.start?.split(':')[0] || '0');
                    const eventPeriod = event.start?.includes('PM') ? 'PM' : 'AM';
                    const hour24 = eventPeriod === 'PM' && eventHour !== 12 ? eventHour + 12 : 
                                   eventPeriod === 'AM' && eventHour === 12 ? 0 : eventHour;
                    return hour24 === slot.hour;
                  })
                  .map(event => (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 bg-blue-100 border border-blue-300 rounded p-1 text-xs cursor-pointer hover:bg-blue-200 transition-colors"
                      style={{ 
                        top: '4px',
                        height: '48px',
                        zIndex: 1
                      }}
                      onClick={() => {}}
                    >
                      <div className="font-medium text-blue-800">{event.title}</div>
                      <div className="text-blue-600">{event.start}</div>
                    </div>
                  ))}
                {/* Tasks for this hour (if you want to show tasks in the grid, add similar logic here) */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => navigateDate(-1)}
              className="p-2 hover:bg-gray-100 rounded"
              title="Previous day"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded min-w-[80px]"
            >
              {getRelativeDayText(selectedDate)}
            </button>
            <button 
              onClick={() => navigateDate(1)}
              className="p-2 hover:bg-gray-100 rounded"
              title="Next day"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <select 
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Day view</option>
            <option value="week">Week view</option>
            <option value="month">Month view</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={16} className="mr-2" /> Add Event
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          {renderMiniCalendar()}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <User size={16} />
              <span>My calendars</span>
            </div>
            <div className="pl-6 space-y-1">
              <div className="flex items-center gap-2 text-sm p-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Personal</span>
              </div>
              <div className="flex items-center gap-2 text-sm p-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Work</span>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar content */}
        <div className="flex-1 flex">
          {viewType === 'day' && renderDayView()}
          {/* You can implement week and month views similarly, using getItemsForDate for each day */}
        </div>
      </div>
      <AddEventModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditEvent(null); }}
        onAdd={(event) => setCalendarEvents([...calendarEvents, event])}
        editEvent={editEvent}
      />
      <ConfirmDeletePopup
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (itemToDelete) {
            setCalendarEvents(prev => prev.filter(e => e.id !== itemToDelete.id));
            setShowDeleteModal(false);
            setItemToDelete(null);
          }
        }}
      />
    </div>
  );
};

export default CalendarView;