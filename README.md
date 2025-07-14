# TodoList App

A modern, feature-rich todo list and sticky notes application built with React and Tailwind CSS. It offers task management, sticky notes, calendar and agenda views, and local storage persistence—all in a responsive, user-friendly interface.

## Features

- **Sticky Wall**: Create, edit, and organize colorful sticky notes
- **Task Management**: Add, edit, complete, and delete tasks with lists and tags
- **Calendar View**: Visualize tasks and events in a calendar (day/week/month) format
- **Today, Tomorrow, This Week, Upcoming Views**: Focused agenda views for efficient planning
- **Sidebar Navigation**: Quick access to all views, lists, tags, and search
- **Local Storage Persistence**: All data is saved in your browser
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessible UI**: Keyboard and screen reader friendly

## Project Structure

```
Todolist/
├── public/                # Static assets and index.html
├── src/
│   ├── components/        # All React components (Sidebar, StickyWallView, CalendarView, etc.)
│   ├── hooks/             # Custom React hooks (useLocalStorage, validation, etc.)
│   ├── App.js             # Main app component and routing
│   ├── index.js           # React entry point
│   └── index.css          # Tailwind CSS imports
├── package.json           # Project metadata and dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (v6+) or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Todolist
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
# or
yarn build
```
The optimized build will be in the `build/` directory.

### Run Tests
```bash
npm test
# or
yarn test
```

## Main Dependencies
- **React** (18.x)
- **Tailwind CSS** (3.x)
- **Lucide React** and **react-icons** (icon libraries)
- **dayjs** (date utilities)
- **jspdf** (PDF export, if used)

## Component & Feature Overview

- **App.js**: Main application logic, state management, and view routing
- **Sidebar.js**: Navigation, search, lists, and tags management
- **StickyWallView.js**: Grid of sticky notes with add/edit/delete
- **TodayView.js, TomorrowView.js, ThisWeekView.js, UpcomingView.js**: Task lists filtered by date
- **CalendarView.js**: Calendar with event and task integration
- **Add/Edit Modals**: For tasks, events, and sticky notes
- **useLocalStorage.js**: Custom hook for persistent state
- **ErrorBoundary.js**: Catches and displays UI errors

## State Management & Persistence
- Uses React hooks (`useState`, `useCallback`)
- All tasks, notes, lists, tags, and events are persisted in browser localStorage via a custom hook
- No backend required—your data stays on your device

## Styling & Configuration
- **Tailwind CSS** for all styling (see `tailwind.config.js`)
- **PostCSS** for CSS processing (see `postcss.config.js`)
- Responsive and accessible design principles

## Customization
- Edit `tailwind.config.js` to adjust theme/colors
- Add new components or hooks in `src/components` or `src/hooks`

## Future Enhancements
- Drag-and-drop for tasks and notes
- Task categories, filters, and advanced search
- Due date reminders and notifications
- Dark mode support
- Data export/import

---

**Enjoy your productive day with TodoList App!**