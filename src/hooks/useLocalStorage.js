import { useState } from 'react';

/**
 * Sync state to local storage so that it persists through a page refresh.
 * Usage is similar to useState except we pass in a local storage key so that
 * we can default to that value on page load instead of the specified initial value.
 *
 * Hook taken from https://usehooks.com/useLocalStorage/
 * @param {string} key
 * @param {string|object} initialValue
 * @returns {(string|setValue)[]}
 * @example
 * function App() {
 *   // Similar to useState but first arg is key to the value in local storage.
 *   const [name, setName] = useLocalStorage('name', 'Bob');
 *
 *   return (
 *     <div>
 *       <input
 *         type="text"
 *         placeholder="Enter your name"
 *         value={name}
 *         onChange={e => setName(e.target.value)}
 *       />
 *     </div>
 *   );
 * }
 */

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage
