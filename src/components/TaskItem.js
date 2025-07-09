import React from 'react';
import PropTypes from 'prop-types';
import { Trash2, ChevronRight } from 'lucide-react';

const TaskItem = ({ task, onToggle, showDetails = true, onDelete }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="flex items-center flex-1">
      {onToggle && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
      )}
      <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
        {task.title}
      </span>
      {showDetails && task.subtasks && (
        <span className="ml-2 text-sm text-gray-500">
          {task.subtasks} Subtasks
        </span>
      )}
      {showDetails && task.list && (
        <span className={`ml-2 px-2 py-1 text-xs rounded ${
          task.list === 'Personal' ? 'bg-red-100 text-red-800' :
          task.list === 'Work' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {task.list}
        </span>
      )}
    </div>
    <div className="flex items-center space-x-2">
      {onDelete && (
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 p-1 rounded"
          aria-label="Delete task"
        >
          <Trash2 size={14} />
        </button>
      )}
      <ChevronRight size={16} className="text-gray-400" />
    </div>
  </div>
);

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    list: PropTypes.string,
    subtasks: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func,
  showDetails: PropTypes.bool,
  onDelete: PropTypes.func,
};

TaskItem.defaultProps = {
  onToggle: null,
  showDetails: true,
  onDelete: null,
};

export default TaskItem;