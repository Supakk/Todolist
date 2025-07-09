import React from 'react';

const CalendarEvent = ({ event }) => (
  <div className="flex items-center mb-4">
    <div className="w-16 text-sm text-gray-600 mr-4">
      {event.start}<br />AM
    </div>
    <div className={`flex-1 ${event.color} p-3 rounded`}>
      {event.title}
    </div>
  </div>
);

export default CalendarEvent;