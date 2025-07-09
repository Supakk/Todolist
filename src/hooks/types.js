import PropTypes from 'prop-types';

// Common PropTypes definitions
export const TaskPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  list: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  date: PropTypes.string,
  subtasks: PropTypes.number,
  createdAt: PropTypes.string,
});

export const StickyNotePropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
});

export const ListPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  color: PropTypes.string,
});

export const TagPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
});

export const CalendarEventPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  color: PropTypes.string,
  date: PropTypes.string,
});

export const ErrorPropType = PropTypes.shape({
  message: PropTypes.string.isRequired,
  name: PropTypes.string,
  stack: PropTypes.string,
});

// Common function prop types
export const HandlerPropTypes = {
  onToggleTask: PropTypes.func,
  onAddTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onDeleteStickyNote: PropTypes.func,
  onAddStickyNote: PropTypes.func,
  onEditStickyNote: PropTypes.func,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

// View prop types
export const ViewPropTypes = {
  currentView: PropTypes.oneOf(['sticky-wall', 'calendar', 'today', 'upcoming']),
  selectedDate: PropTypes.instanceOf(Date),
  searchQuery: PropTypes.string,
  sidebarOpen: PropTypes.bool,
};

// Modal prop types
export const ModalPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

// Array prop types
export const ArrayPropTypes = {
  tasks: PropTypes.arrayOf(TaskPropType),
  stickyNotes: PropTypes.arrayOf(StickyNotePropType),
  lists: PropTypes.arrayOf(ListPropType),
  tags: PropTypes.arrayOf(TagPropType),
  calendarEvents: PropTypes.arrayOf(CalendarEventPropType),
};

// Default props
export const DefaultProps = {
  tasks: [],
  stickyNotes: [],
  lists: [],
  tags: [],
  calendarEvents: [],
  showDetails: true,
  sidebarOpen: true,
  searchQuery: '',
  currentView: 'upcoming',
};