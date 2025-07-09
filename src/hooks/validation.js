/**
 * Validation utilities for data integrity
 */

// Basic validation functions
export const isValidString = (value, minLength = 1) => {
  return typeof value === 'string' && value.trim().length >= minLength;
};

export const isValidNumber = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
};

export const isValidId = (value) => {
  return (typeof value === 'string' && value.trim().length > 0) || 
         (typeof value === 'number' && value > 0);
};

export const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const isValidColor = (value) => {
  if (!isValidString(value)) return false;
  // Check if it's a valid Tailwind color class or CSS color
  const colorPattern = /^(bg-|text-|border-)?(\w+-)?\w+(-\d+)?$|^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(|^rgba\(/;
  return colorPattern.test(value);
};

// Entity validation functions
export const validateTask = (task) => {
  const errors = [];
  
  if (!task || typeof task !== 'object') {
    errors.push('Task must be an object');
    return { isValid: false, errors };
  }

  if (!isValidId(task.id)) {
    errors.push('Task ID is required and must be a valid string or number');
  }

  if (!isValidString(task.title)) {
    errors.push('Task title is required and must be a non-empty string');
  }

  if (task.title && task.title.length > 200) {
    errors.push('Task title must be less than 200 characters');
  }

  if (typeof task.completed !== 'boolean') {
    errors.push('Task completed status must be a boolean');
  }

  if (task.date && !isValidDate(task.date)) {
    errors.push('Task date must be a valid date string');
  }

  if (task.list && !isValidString(task.list)) {
    errors.push('Task list must be a non-empty string');
  }

  if (task.subtasks && !isValidNumber(task.subtasks, 0)) {
    errors.push('Task subtasks must be a non-negative number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStickyNote = (note) => {
  const errors = [];
  
  if (!note || typeof note !== 'object') {
    errors.push('Sticky note must be an object');
    return { isValid: false, errors };
  }

  if (!isValidId(note.id)) {
    errors.push('Sticky note ID is required and must be a valid string or number');
  }

  if (!isValidString(note.title)) {
    errors.push('Sticky note title is required and must be a non-empty string');
  }

  if (note.title && note.title.length > 100) {
    errors.push('Sticky note title must be less than 100 characters');
  }

  if (!isValidString(note.content)) {
    errors.push('Sticky note content is required and must be a non-empty string');
  }

  if (note.content && note.content.length > 1000) {
    errors.push('Sticky note content must be less than 1000 characters');
  }

  if (!isValidColor(note.color)) {
    errors.push('Sticky note color must be a valid color string');
  }

  if (note.createdAt && !isValidDate(note.createdAt)) {
    errors.push('Sticky note creation date must be a valid date string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateList = (list) => {
  const errors = [];
  
  if (!list || typeof list !== 'object') {
    errors.push('List must be an object');
    return { isValid: false, errors };
  }

  if (!isValidId(list.id)) {
    errors.push('List ID is required and must be a valid string or number');
  }

  if (!isValidString(list.name)) {
    errors.push('List name is required and must be a non-empty string');
  }

  if (list.name && list.name.length > 50) {
    errors.push('List name must be less than 50 characters');
  }

  if (list.count !== undefined && !isValidNumber(list.count, 0)) {
    errors.push('List count must be a non-negative number');
  }

  if (list.color && !isValidColor(list.color)) {
    errors.push('List color must be a valid color string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTag = (tag) => {
  const errors = [];
  
  if (!tag || typeof tag !== 'object') {
    errors.push('Tag must be an object');
    return { isValid: false, errors };
  }

  if (!isValidId(tag.id)) {
    errors.push('Tag ID is required and must be a valid string or number');
  }

  if (!isValidString(tag.name)) {
    errors.push('Tag name is required and must be a non-empty string');
  }

  if (tag.name && tag.name.length > 30) {
    errors.push('Tag name must be less than 30 characters');
  }

  if (tag.color && !isValidColor(tag.color)) {
    errors.push('Tag color must be a valid color string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCalendarEvent = (event) => {
  const errors = [];
  
  if (!event || typeof event !== 'object') {
    errors.push('Calendar event must be an object');
    return { isValid: false, errors };
  }

  if (!isValidId(event.id)) {
    errors.push('Calendar event ID is required and must be a valid string or number');
  }

  if (!isValidString(event.title)) {
    errors.push('Calendar event title is required and must be a non-empty string');
  }

  if (event.title && event.title.length > 100) {
    errors.push('Calendar event title must be less than 100 characters');
  }

  if (!isValidString(event.start)) {
    errors.push('Calendar event start time is required and must be a non-empty string');
  }

  if (!isValidString(event.end)) {
    errors.push('Calendar event end time is required and must be a non-empty string');
  }

  // Validate time format (HH:MM)
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (event.start && !timePattern.test(event.start)) {
    errors.push('Calendar event start time must be in HH:MM format');
  }

  if (event.end && !timePattern.test(event.end)) {
    errors.push('Calendar event end time must be in HH:MM format');
  }

  if (event.color && !isValidColor(event.color)) {
    errors.push('Calendar event color must be a valid color string');
  }

  if (event.date && !isValidDate(event.date)) {
    errors.push('Calendar event date must be a valid date string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Array validation functions
export const validateArray = (array, validator, arrayName = 'Array') => {
  const errors = [];
  
  if (!Array.isArray(array)) {
    errors.push(`${arrayName} must be an array`);
    return { isValid: false, errors };
  }

  array.forEach((item, index) => {
    const validation = validator(item);
    if (!validation.isValid) {
      errors.push(`${arrayName}[${index}]: ${validation.errors.join(', ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitization functions
export const sanitizeString = (value, maxLength = 1000) => {
  if (typeof value !== 'string') return '';
  return value.trim().substring(0, maxLength);
};

export const sanitizeTask = (task) => {
  if (!task || typeof task !== 'object') return null;
  
  return {
    id: task.id,
    title: sanitizeString(task.title, 200),
    list: task.list ? sanitizeString(task.list, 50) : 'Work',
    completed: Boolean(task.completed),
    date: task.date || new Date().toISOString(),
    subtasks: task.subtasks ? Math.max(0, Number(task.subtasks)) : undefined,
    createdAt: task.createdAt || new Date().toISOString(),
  };
};

export const sanitizeStickyNote = (note) => {
  if (!note || typeof note !== 'object') return null;
  
  return {
    id: note.id,
    title: sanitizeString(note.title, 100),
    content: sanitizeString(note.content, 1000),
    color: note.color || 'bg-yellow-200',
    createdAt: note.createdAt || new Date().toISOString(),
  };
};

// Utility function to get validation summary
export const getValidationSummary = (validationResults) => {
  const allErrors = validationResults.flatMap(result => result.errors);
  return {
    isValid: validationResults.every(result => result.isValid),
    errorCount: allErrors.length,
    errors: allErrors
  };
};