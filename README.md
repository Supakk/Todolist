# TodoList App

A modern todo list application built with React and Tailwind CSS featuring sticky notes, task management, and calendar views.

## Features

- **Sticky Wall**: Create and organize sticky notes with different colors
- **Task Management**: Add, edit, and track tasks with categories
- **Calendar View**: View tasks and events in a calendar format
- **Today View**: Focus on today's tasks
- **Upcoming View**: See tasks for today, tomorrow, and this week
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── CalendarEvent.js      # Calendar event component
│   ├── CalendarView.js       # Calendar view page
│   ├── Sidebar.js            # Navigation sidebar
│   ├── StickyNote.js         # Individual sticky note component
│   ├── StickyWallView.js     # Sticky wall page
│   ├── TaskItem.js           # Task item component
│   ├── TodayView.js          # Today's tasks page
│   └── UpcomingView.js       # Upcoming tasks page
├── App.js                    # Main app component
├── index.js                  # React app entry point
└── index.css                 # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Dependencies

- React 18.2.0
- Tailwind CSS 3.1.0
- Lucide React (for icons)

## Component Overview

### Main Components

- **App.js**: Main application component that manages state and routing
- **Sidebar.js**: Navigation sidebar with menu items, search, and settings
- **StickyWallView.js**: Grid view for sticky notes
- **TodayView.js**: Today's tasks with checkboxes and task management
- **UpcomingView.js**: Upcoming tasks organized by timeframe
- **CalendarView.js**: Calendar view with events and scheduling

### Sub-components

- **StickyNote.js**: Individual sticky note card
- **TaskItem.js**: Task item with checkbox, title, and metadata
- **CalendarEvent.js**: Calendar event display

## State Management

The app uses React's built-in state management with hooks:

- `useState` for component state
- Props drilling for state sharing between components
- Event handlers for state updates

## Styling

Built with Tailwind CSS for:
- Responsive design
- Component styling
- Utility-first approach
- Consistent color scheme and spacing

## Future Enhancements

- Local storage persistence
- Task editing and deletion
- Drag and drop functionality
- Task categories and filters
- Due date management
- Search functionality
- Dark mode support