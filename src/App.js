import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar.js';
import StickyWallView from './components/StickyWallView.js';
import CalendarView from './components/CalendarView.js';
import TodayView from './components/TodayView.js';
import UpcomingView from './components/UpcomingView.js';
import AddStickyPopup from './components/AddStickyPopup.js';
import ConfirmDeletePopup from './components/DeleteConfirmModal.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';

import './index.css';

const App = () => {
  // UI State
  const [currentView, setCurrentView] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [appError, setAppError] = useState(null);
  
  // Default data
  const defaultStickyNotes = [
    { id: 1, title: 'Social Media', content: '- Plan social content\n- Build content calendar\n- Plan promotion and distribution', color: 'bg-yellow-200' },
    { id: 2, title: 'Content Strategy', content: 'Would need time to get insights (goals, personas, budget, audits)', color: 'bg-blue-200' },
    { id: 3, title: 'Email A/B Tests', content: '- Subject lines\n- Sender\n- CTA\n- Sending times', color: 'bg-pink-200' },
    { id: 4, title: 'Banner Ads', content: 'Notes from the workshop:\n- Sizing matters\n- Choose distinctive imagery', color: 'bg-orange-200' },
    { id: 5, title: 'Meeting Prep', content: '- Review agenda\n- Prepare slides', color: 'bg-red-200' },
    { id: 6, title: 'New Campaign Ideas', content: 'Brainstorm campaign themes', color: 'bg-green-200' },
    { id: 7, title: 'Landing Page Feedback', content: 'Collect and compile comments from team', color: 'bg-purple-200' },
  ];

  const defaultTasks = [
    { id: 1, title: 'Research content ideas', list: 'Work', completed: false, date: new Date().toISOString() },
    { id: 2, title: 'Create database of authors', list: 'Work', completed: false, date: new Date().toISOString() },
    { id: 3, title: 'Renew driver\'s license', list: 'Personal', completed: false, date: new Date('2022-03-22').toISOString(), subtasks: 1 },
    { id: 4, title: 'Consult accountant', list: 'Personal', completed: false, date: new Date().toISOString() },
    { id: 5, title: 'Create job posting for SEO specialist', list: 'Work', completed: false, date: new Date(Date.now() + 86400000).toISOString() },
    { id: 6, title: 'Request design assets for landing page', list: 'Work', completed: false, date: new Date(Date.now() + 86400000).toISOString() },
    { id: 7, title: 'Print business card', list: 'Work', completed: false, date: new Date(Date.now() + 259200000).toISOString() },
  ];

  // App State with localStorage
  const [stickyNotes, setStickyNotes, removeStickyNotes, { error: stickyNotesError, isLoading: stickyNotesLoading }] = useLocalStorage('stickyNotes', defaultStickyNotes);
  const [tasks, setTasks, removeTasks, { error: tasksError, isLoading: tasksLoading }] = useLocalStorage('tasks', defaultTasks);
  const [calendarEvents, setCalendarEvents, removeCalendarEvents, { error: calendarError }] = useLocalStorage('calendarEvents', [
    { id: 1, title: 'Marketing Sprint', start: '09:00', end: '10:00', color: 'bg-blue-200' },
    { id: 2, title: 'Sales Meeting', start: '10:30', end: '11:30', color: 'bg-green-200' },
  ]);
  const [lists, setLists, removeLists, { error: listsError }] = useLocalStorage('lists', [
    { id: 1, name: 'Personal', count: 3, color: 'bg-red-500' },
    { id: 2, name: 'Work', count: 6, color: 'bg-blue-500' },
    { id: 3, name: 'List 1', count: 3, color: 'bg-yellow-500' },
  ]);
  const [tags, setTags, removeTags, { error: tagsError }] = useLocalStorage('tags', [
    { id: 1, name: 'Tag 1', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Tag 2', color: 'bg-pink-100 text-pink-800' },
  ]);
  const [noteCount, setNoteCount] = useLocalStorage('noteCount', 7);

  const stickyColors = useMemo(() => [
    'bg-yellow-200', 'bg-blue-200', 'bg-pink-200',
    'bg-orange-200', 'bg-red-200', 'bg-green-200', 'bg-purple-200',
  ], []);

  // Error handling
  const errors = [stickyNotesError, tasksError, calendarError, listsError, tagsError, appError].filter(Boolean);
  const hasErrors = errors.length > 0;
  const isLoading = stickyNotesLoading || tasksLoading;

  // Validate and sanitize data
  const validateTask = useCallback((task) => {
    if (!task || typeof task !== 'object') return false;
    if (!task.title || typeof task.title !== 'string') return false;
    if (typeof task.completed !== 'boolean') return false;
    return true;
  }, []);

  const validateStickyNote = useCallback((note) => {
    if (!note || typeof note !== 'object') return false;
    if (!note.title || typeof note.title !== 'string') return false;
    if (!note.content || typeof note.content !== 'string') return false;
    return true;
  }, []);

  // Enhanced error handling wrapper
  const withErrorHandling = useCallback((operation, errorMessage) => {
    return async (...args) => {
      try {
        setAppError(null);
        await operation(...args);
      } catch (error) {
        console.error(`${errorMessage}:`, error);
        setAppError(new Error(`${errorMessage}: ${error.message}`));
      }
    };
  }, []);

  // Enhanced handlers with validation and error handling
  const addNewStickyNote = useCallback(withErrorHandling(({ title, content }) => {
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required and must be a string');
    }
    if (!content || typeof content !== 'string') {
      throw new Error('Content is required and must be a string');
    }

    const color = stickyColors[noteCount % stickyColors.length];
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      color,
      createdAt: new Date().toISOString(),
    };

    if (!validateStickyNote(newNote)) {
      throw new Error('Invalid sticky note data');
    }
    
    setStickyNotes(prevNotes => [...prevNotes, newNote]);
    setNoteCount(prevCount => prevCount + 1);
    setShowAddModal(false);
  }, 'Error adding sticky note'), [stickyColors, noteCount, setStickyNotes, setNoteCount, validateStickyNote, withErrorHandling]);

  const requestDeleteStickyNote = useCallback((noteId) => {
    if (typeof noteId !== 'number' && typeof noteId !== 'string') {
      console.error('Invalid note ID for deletion');
      return;
    }
    setNoteToDelete(noteId);
    setShowConfirmDelete(true);
  }, []);

  const deleteStickyNote = useCallback(withErrorHandling(() => {
    if (noteToDelete === null) {
      throw new Error('No note selected for deletion');
    }
    
    setStickyNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDelete));
    setNoteToDelete(null);
    setShowConfirmDelete(false);
  }, 'Error deleting sticky note'), [noteToDelete, setStickyNotes, withErrorHandling]);

  const addNewTask = useCallback(withErrorHandling((taskData) => {
    let newTask;
    
    if (typeof taskData === 'string') {
      if (!taskData.trim()) {
        throw new Error('Task title cannot be empty');
      }
      newTask = {
        id: Date.now(),
        title: taskData.trim(),
        list: 'Work',
        completed: false,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
    } else if (taskData && typeof taskData === 'object') {
      if (!taskData.title || typeof taskData.title !== 'string') {
        throw new Error('Task title is required and must be a string');
      }
      newTask = {
        id: Date.now(),
        title: taskData.title.trim(),
        list: taskData.list || 'Work',
        completed: false,
        date: taskData.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        ...(taskData.subtasks && { subtasks: taskData.subtasks }),
      };
    } else {
      throw new Error('Invalid task data');
    }

    if (!validateTask(newTask)) {
      throw new Error('Invalid task data');
    }
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, 'Error adding task'), [setTasks, validateTask, withErrorHandling]);

  const toggleTask = useCallback(withErrorHandling((taskId) => {
    if (typeof taskId !== 'number' && typeof taskId !== 'string') {
      throw new Error('Invalid task ID');
    }
    
    setTasks(prevTasks => {
      const taskExists = prevTasks.some(task => task.id === taskId);
      if (!taskExists) {
        throw new Error('Task not found');
      }
      
      return prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    });
  }, 'Error toggling task'), [setTasks, withErrorHandling]);

  const deleteTask = useCallback(withErrorHandling((taskId) => {
    if (typeof taskId !== 'number' && typeof taskId !== 'string') {
      throw new Error('Invalid task ID');
    }
    
    setTasks(prevTasks => {
      const taskExists = prevTasks.some(task => task.id === taskId);
      if (!taskExists) {
        throw new Error('Task not found');
      }
      
      return prevTasks.filter(task => task.id !== taskId);
    });
  }, 'Error deleting task'), [setTasks, withErrorHandling]);

  const clearAppError = useCallback(() => {
    setAppError(null);
  }, []);

  const renderCurrentView = useCallback(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
      );
    }

    try {
      switch (currentView) {
        case 'sticky-wall':
          return (
            <StickyWallView
              stickyNotes={stickyNotes}
              addNewStickyNote={() => setShowAddModal(true)}
              deleteStickyNote={requestDeleteStickyNote}
            />
          );
        case 'calendar':
          return <CalendarView selectedDate={selectedDate} calendarEvents={calendarEvents} />;
        case 'today':
          return (
            <TodayView 
              tasks={tasks} 
              onToggleTask={toggleTask} 
              onAddTask={addNewTask} 
              onDeleteTask={deleteTask} 
            />
          );
        case 'upcoming':
          return (
            <UpcomingView 
              tasks={tasks} 
              onToggleTask={toggleTask} 
              onAddTask={addNewTask} 
              onDeleteTask={deleteTask} 
            />
          );
        default:
          return <div className="p-4 text-center text-gray-500">View not found</div>;
      }
    } catch (error) {
      console.error('Error rendering view:', error);
      return (
        <div className="p-4 text-center text-red-500">
          <p>Error loading view</p>
          <button 
            onClick={() => setCurrentView('upcoming')} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Upcoming
          </button>
        </div>
      );
    }
  }, [currentView, stickyNotes, selectedDate, calendarEvents, tasks, toggleTask, addNewTask, deleteTask, requestDeleteStickyNote, isLoading]);

  // Error display component
  const ErrorDisplay = ({ error, onDismiss }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2 flex justify-between items-center">
      <div>
        <strong>Error:</strong> {error.message}
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss} 
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ×
        </button>
      )}
    </div>
  );

  ErrorDisplay.propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
    onDismiss: PropTypes.func,
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        {/* Error display */}
        {hasErrors && (
          <div className="fixed top-4 right-4 z-50 max-w-md max-h-96 overflow-y-auto">
            {errors.map((error, index) => (
              <ErrorDisplay 
                key={index} 
                error={error} 
                onDismiss={error === appError ? clearAppError : null}
              />
            ))}
          </div>
        )}
        
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          lists={lists}
          tags={tags}
          tasks={tasks}
          stickyNotes={stickyNotes}
        />
        
        <div className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </div>

        {/* Modals */}
        <AddStickyPopup
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addNewStickyNote}
        />
        <ConfirmDeletePopup
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={deleteStickyNote}
        />
      </div>
    </ErrorBoundary>
  );
};

// PropTypes for main component
App.propTypes = {
  // This component currently doesn't accept any props
};

export default App;