import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar.js';
import StickyWallView from './components/StickyWallView.js';
import CalendarView from './components/CalendarView.js';
import TodayView from './components/TodayView.js';
import TomorrowView from './components/TomorrowView.js';
import ThisWeekView from './components/ThisWeekView.js';
import UpcomingView from './components/UpcomingView.js';
import AddStickyPopup from './components/AddStickyPopup.js';
import EditStickyPopup from './components/EditStickyPopup.js';
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Local storage data
  const [stickyNotes, setStickyNotes] = useLocalStorage('stickyNotes', []);
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [calendarEvents, setCalendarEvents] = useLocalStorage('calendarEvents', []);
  const [lists, setLists] = useLocalStorage('lists', [
    { id: 1, name: 'Personal', count: 3, color: 'bg-red-500' },
    { id: 2, name: 'Work', count: 6, color: 'bg-blue-500' },
    { id: 3, name: 'List 1', count: 3, color: 'bg-yellow-500' },
  ]);
  const [tags, setTags] = useLocalStorage('tags', [
    { id: 1, name: 'Tag 1', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Tag 2', color: 'bg-pink-100 text-pink-800' },
  ]);

  // Group tasks for CalendarView
  const getDateString = (date) => date.toISOString().split('T')[0];
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const todayTasks = tasks.filter(task => getDateString(new Date(task.date)) === getDateString(today));
  const tomorrowTasks = tasks.filter(task => getDateString(new Date(task.date)) === getDateString(tomorrow));
  const weekTasks = tasks.filter(task => {
    const d = new Date(task.date);
    return d >= weekStart && d <= weekEnd;
  });
  const upcomingTasks = tasks.filter(task => new Date(task.date) > weekEnd);

  // Handlers for tasks
  const addNewTask = useCallback((title) => {
    const newTask = { id: Date.now(), title, list: 'Work', completed: false, date: new Date().toISOString() };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((taskId) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  }, [setTasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, [setTasks]);

  // Sticky notes handlers
  const addNewStickyNote = useCallback((note) => {
    const newNote = { ...note, id: Date.now(), createdAt: new Date().toISOString() };
    setStickyNotes(prev => [...prev, newNote]);
    setShowAddModal(false);
  }, [setStickyNotes]);

  const editStickyNote = useCallback((updatedNote) => {
    setStickyNotes(prev => prev.map(note => note.id === updatedNote.id ? updatedNote : note));
    setShowEditModal(false);
    setNoteToEdit(null);
  }, [setStickyNotes]);

  const requestEditStickyNote = useCallback((note) => {
    setNoteToEdit(note);
    setShowEditModal(true);
  }, []);

  const requestDeleteStickyNote = useCallback((noteId) => {
    setNoteToDelete(noteId);
    setShowConfirmDelete(true);
  }, []);

  const deleteStickyNote = useCallback(() => {
    setStickyNotes(prev => prev.filter(note => note.id !== noteToDelete));
    setShowConfirmDelete(false);
    setNoteToDelete(null);
  }, [noteToDelete, setStickyNotes]);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'calendar':
        return (
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            calendarEvents={calendarEvents}
            setCalendarEvents={setCalendarEvents}
            upcomingTasks={upcomingTasks}
            todayTasks={todayTasks}
            tomorrowTasks={tomorrowTasks}
            weekTasks={weekTasks}
            onDeleteTask={deleteTask}
          />
        );
      case 'sticky-wall':
        return (
          <StickyWallView
            stickyNotes={stickyNotes}
            addNewStickyNote={() => setShowAddModal(true)}
            deleteStickyNote={requestDeleteStickyNote}
            editStickyNote={requestEditStickyNote}
          />
        );
      case 'today':
        return <TodayView tasks={tasks} onToggleTask={toggleTask} onAddTask={addNewTask} onDeleteTask={deleteTask} />;
      case 'tomorrow':
        return <TomorrowView tasks={tasks} onToggleTask={toggleTask} onAddTask={addNewTask} onDeleteTask={deleteTask} />;
      case 'thisweek':
        return <ThisWeekView tasks={tasks} onToggleTask={toggleTask} onAddTask={addNewTask} onDeleteTask={deleteTask} />;
      case 'upcoming':
        return <UpcomingView tasks={tasks} onToggleTask={toggleTask} onAddTask={addNewTask} onDeleteTask={deleteTask} />;
      default:
        return <div className="p-4 text-center text-gray-500">View not found</div>;
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tasks={tasks}
          lists={lists}
          tags={tags}
          stickyNotes={stickyNotes}
        />
        <div className="flex-1 overflow-y-auto">
          {renderCurrentView()}
        </div>
        <AddStickyPopup
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addNewStickyNote}
        />
        <EditStickyPopup
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setNoteToEdit(null);
          }}
          onSave={editStickyNote}
          note={noteToEdit}
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

export default App;
