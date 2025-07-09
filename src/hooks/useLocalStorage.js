import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with error handling and type safety
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if localStorage is empty
 * @returns {[any, Function, Function, {error: Error|null, isLoading: boolean}]}
 */
export const useLocalStorage = (key, initialValue) => {
  // Validate key parameter
  if (!key || typeof key !== 'string') {
    throw new Error('useLocalStorage: key must be a non-empty string');
  }

  // State for error handling
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage availability
  const isLocalStorageAvailable = () => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      // Test if localStorage is actually writable
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Initialize state with localStorage value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      setIsLoading(true);
      
      if (!isLocalStorageAvailable()) {
        console.warn(`localStorage is not available for key "${key}", using initial value`);
        setIsLoading(false);
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        setIsLoading(false);
        return initialValue;
      }

      const parsedValue = JSON.parse(item);
      
      // Validate parsed value structure if initialValue has a specific structure
      if (initialValue !== null && typeof initialValue === 'object' && Array.isArray(initialValue)) {
        if (!Array.isArray(parsedValue)) {
          console.warn(`Expected array for key "${key}", got ${typeof parsedValue}. Using initial value.`);
          setIsLoading(false);
          return initialValue;
        }
      }

      setIsLoading(false);
      return parsedValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setError(error);
      setIsLoading(false);
      return initialValue;
    }
  });

  // Save value to localStorage
  const setValue = useCallback((value) => {
    try {
      setError(null);
      
      if (!isLocalStorageAvailable()) {
        console.warn(`localStorage is not available for key "${key}", value not persisted`);
        setStoredValue(value);
        return;
      }

      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate that value can be serialized
      let serializedValue;
      try {
        serializedValue = JSON.stringify(valueToStore);
      } catch (serializationError) {
        throw new Error(`Cannot serialize value for key "${key}": ${serializationError.message}`);
      }
      
      // Check if serialized value is too large (approximate 5MB limit)
      if (serializedValue.length > 5 * 1024 * 1024) {
        throw new Error(`Value too large for localStorage key "${key}"`);
      }
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      setError(error);
      
      // Handle specific error types
      if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
        console.warn(`localStorage quota exceeded for key "${key}"`);
        // Try to clear some space by removing old items
        try {
          const keys = Object.keys(window.localStorage);
          keys.forEach(storageKey => {
            if (storageKey.startsWith('temp_') || storageKey.startsWith('cache_')) {
              window.localStorage.removeItem(storageKey);
            }
          });
        } catch (clearError) {
          console.error('Failed to clear localStorage:', clearError);
        }
      }
    }
  }, [key, storedValue]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setError(null);
      
      if (isLocalStorageAvailable()) {
        window.localStorage.removeItem(key);
      }
      
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      setError(error);
    }
  }, [key, initialValue]);

  // Clear specific error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setError(null);
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}" from storage event:`, error);
          setError(error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  return [
    storedValue, 
    setValue, 
    removeValue, 
    { 
      error, 
      isLoading, 
      clearError,
      isAvailable: isLocalStorageAvailable()
    }
  ];
};