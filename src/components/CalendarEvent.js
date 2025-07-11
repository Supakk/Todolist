import React, { useState } from 'react';
import { Edit, Trash2, Clock, MapPin, Users, MoreHorizontal } from 'lucide-react';
import { COLORS } from './constants';

const CalendarEvent = ({ event, onEdit, onDelete, viewType }) => {
  const [showMenu, setShowMenu] = useState(false);
  const colorConfig = COLORS.find(c => c.name.toLowerCase() === event.color?.toLowerCase()) || COLORS[0];

  // Improved title validation and formatting
  const getValidTitle = (title) => {
    if (typeof title === 'string' && title.trim() !== '') {
      return title.trim();
    }
    return 'Untitled Event'; // Better fallback than "[Invalid Title]"
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const eventTitle = getValidTitle(event.title);

  if (event._type === 'task') {
    return (
      <div className="relative bg-gray-100 border-l-4 border-blue-300 p-3 rounded-r mb-2 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800 mr-2">{eventTitle}</h3>
            {event.list && (
              <span className={`ml-2 px-2 py-1 text-xs rounded-full text-white ${
                event.list === 'Personal' ? 'bg-red-500' : event.list === 'Work' ? 'bg-blue-500' : 'bg-yellow-500'
              }`}>
                {event.list}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {event.completed && <span className="text-green-500 text-xs font-semibold">Done</span>}
            <button
              onClick={() => onDelete(event)}
              className="p-1 rounded hover:bg-white hover:bg-opacity-50 text-red-500"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${colorConfig.bg} ${colorConfig.border} border-l-4 p-3 rounded-r mb-2 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className={`font-medium ${colorConfig.text} mr-2`}>{eventTitle}</h3>
            {event.category && (
              <span className="px-2 py-1 text-xs bg-white bg-opacity-50 rounded-full">
                {event.category}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Clock size={14} className="mr-1" />
            <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
          </div>
          {event.description && (
            <p className="text-sm text-gray-700 mb-2">{event.description}</p>
          )}
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            {event.location && (
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>{event.location}</span>
              </div>
            )}
            {event.attendees?.length > 0 && (
              <div className="flex items-center">
                <Users size={12} className="mr-1" />
                <span>{event.attendees.length} attendees</span>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded hover:bg-white hover:bg-opacity-50"
          >
            <MoreHorizontal size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-6 bg-white border rounded shadow-lg z-10 min-w-32">
              <button
                onClick={() => {
                  onEdit(event);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
              >
                <Edit size={14} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(event);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center text-red-600"
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;