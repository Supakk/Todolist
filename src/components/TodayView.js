import React, { useState } from 'react';
import { Plus, ChevronRight, Calendar, Trash2 } from 'lucide-react';
import AddTaskModal from './AddTaskModel';

const TodayView = ({ tasks, onToggleTask, onAddTask, onDeleteTask }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // กรองเฉพาะ tasks ที่เป็นวันนี้
  const today = new Date();
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === today.toDateString();
  });

  const getValidTitle = (title) => {
    if (typeof title === 'string' && title.trim() !== '') {
      return title.trim();
    }
    return 'Untitled Task';
  };

  const TaskItem = ({ task, showDetails = true }) => (
    <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow hover:shadow-md group">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggleTask(task.id)}
          className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 transition-colors"
        >
          {task.completed && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
        </button>
        <div>
          <span className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {getValidTitle(task.title)}
          </span>
          {showDetails && (
            <div className="flex items-center space-x-2 mt-1">
              {task.date && (
                <>
                  <Calendar size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(task.date).toLocaleDateString('th-TH', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: '2-digit' 
                    })}
                  </span>
                </>
              )}
              {task.subtasks && (
                <span className="text-xs text-gray-500">{task.subtasks} Subtasks</span>
              )}
              {task.list && (
                <span className={`text-xs px-2 py-1 rounded text-white ${
                  task.list === 'Personal' ? 'bg-red-500' : 
                  task.list === 'Work' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }`}>
                  {task.list}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {task.completed && (
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        )}
        <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );

  const handleAddTask = (title) => {
    if (title && title.trim()) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      onAddTask({
        title: title.trim(),
        list: 'Work',
        date: todayStart.toISOString()
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Today <span className="text-gray-500">{todayTasks.length}</span></h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Task
        </button>
      </div>
      
      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks scheduled for today</p>
          </div>
        ) : (
          todayTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTask}
        section="today"
      />
    </div>
  );
};

export default TodayView;