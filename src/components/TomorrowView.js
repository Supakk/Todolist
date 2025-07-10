import React, { useState } from 'react';
import { Plus, ChevronRight, Calendar, Trash2 } from 'lucide-react';

const TomorrowView = ({ tasks, onToggleTask, onAddTask, onDeleteTask }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // กรองเฉพาะ tasks ที่เป็นวันพรุ่งนี้
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const tomorrowTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === tomorrow.toDateString();
  });

  const TaskItem = ({ task, showDetails = true }) => (
    <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggleTask(task.id)}
          className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 transition-colors"
        >
          {task.completed && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
        </button>
        <div>
          <span className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
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

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask({
        title: newTaskTitle,
        list: 'Work',
        date: tomorrow
      });
      
      setNewTaskTitle('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tomorrow <span className="text-gray-500">{tomorrowTasks.length}</span></h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add New Task
        </button>
      </div>
      
      <div className="space-y-3">
        {tomorrowTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks scheduled for tomorrow</p>
          </div>
        ) : (
          tomorrowTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Task for Tomorrow</h3>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask();
                }
              }}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTaskTitle.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TomorrowView;