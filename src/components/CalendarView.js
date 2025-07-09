import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarEvent from './CalendarEvent';

const CalendarView = ({ selectedDate, calendarEvents }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button>
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">{formatDate(selectedDate)}</h1>
          <button>
            <ChevronRight size={20} />
          </button>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Event
        </button>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button className="px-3 py-1 bg-gray-200 rounded">Day</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded">Week</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded">Month</button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold">WEDNESDAY</h2>
        </div>
        <div className="p-4">
          {calendarEvents.map(event => (
            <CalendarEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;