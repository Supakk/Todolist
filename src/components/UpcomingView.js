// === File: components/UpcomingView.js ===
import React, { useState } from 'react';
import { Plus, ChevronRight, Calendar } from 'lucide-react';
import AddTaskModal from './AddTaskModel';

const UpcomingView = ({ tasks, onToggleTask, onAddTask, onDeleteTask, lists = [], tags = [] }) => {
  const [showAddModal, setShowAddModal] = useState(false);
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
          <span className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>{typeof task.title === 'string' ? task.title : (console.warn('Invalid title for task', task), '[Invalid Title]')}</span>
          {showDetails && (
            <div className="flex items-center space-x-2 mt-1">
              {task.date && (<><Calendar size={12} className="text-gray-400" /><span className="text-xs text-gray-500">{new Date(task.date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span></>)}
              {task.subtasks && (<span className="text-xs text-gray-500">{task.subtasks} Subtasks</span>)}
              {task.list && (<span className={`text-xs px-2 py-1 rounded text-white ${task.list === 'Personal' ? 'bg-red-500' : 'bg-blue-500'}`}>{task.list}</span>)}
              {task.tags && task.tags.length > 0 && (<span className="flex flex-wrap gap-1">{task.tags.map(tag => <span key={tag} className="text-xs px-1 py-0.5 rounded bg-blue-100 text-blue-800">{tag}</span>)}</span>)}
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

  const handleAddTask = (title, section, list, tagsArr) => {
    onAddTask(title, section, list, tagsArr);
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

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTask}
        section={newTaskSection}
        lists={lists}
        tags={tags}
      />
    </div>
  );
};

export default UpcomingView;