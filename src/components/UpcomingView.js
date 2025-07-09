// === File: components/UpcomingView.js ===
import React, { useState } from 'react';
import { Plus, ChevronRight, Calendar } from 'lucide-react';

const UpcomingView = ({ tasks, onToggleTask, onAddTask, onDeleteTask }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('today');

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

  const totalUpcoming = categorizedTasks.today.length + categorizedTasks.tomorrow.length + categorizedTasks.thisWeek.length;

  const TaskItem = ({ task, showDetails = false }) => (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg group">
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
                  task.list === 'Personal' ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                  {task.list}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );

  const AddTaskButton = ({ section, label = "Add New Task" }) => (
    <button 
      onClick={() => {
        setNewTaskSection(section);
        setShowAddModal(true);
      }}
      className="flex items-center space-x-2 py-3 px-4 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors"
    >
      <Plus size={16} />
      <span>{label}</span>
    </button>
  );

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      let taskDate = new Date();
      
      if (newTaskSection === 'tomorrow') {
        taskDate = new Date(today);
        taskDate.setDate(today.getDate() + 1);
      } else if (newTaskSection === 'thisWeek') {
        taskDate = new Date(today);
        taskDate.setDate(today.getDate() + 3); // 3 days from now
      }

      onAddTask({
        title: newTaskTitle,
        list: 'Work',
        date: taskDate
      });
      
      setNewTaskTitle('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Upcoming</h1>
        <span className="text-2xl font-semibold text-gray-900">{totalUpcoming}</span>
      </div>

      <div className="space-y-8">
        {/* Today Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Today</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <AddTaskButton section="today" />
            {categorizedTasks.today.length > 0 && (
              <div className="divide-y divide-gray-100">
                {categorizedTasks.today.map((task) => (
                  <TaskItem key={task.id} task={task} showDetails={true} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tomorrow Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Tomorrow</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <AddTaskButton section="tomorrow" />
            {categorizedTasks.tomorrow.length > 0 && (
              <div className="divide-y divide-gray-100">
                {categorizedTasks.tomorrow.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* This Week Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">This Week</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <AddTaskButton section="thisWeek" />
            {categorizedTasks.thisWeek.length > 0 && (
              <div className="divide-y divide-gray-100">
                {categorizedTasks.thisWeek.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
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

export default UpcomingView;