/**
 * Storage service for managing localStorage operations
 */

const STORAGE_KEY = 'journal_entries';

export class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Save entries to localStorage
 * @param {Array} entries Array of entry objects to save
 * @throws {StorageError} If saving fails
 */
export function saveEntries(entries) {
  try {
    const serialized = JSON.stringify(entries);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    throw new StorageError(`Failed to save entries: ${error.message}`);
  }
}

/**
 * Load entries from localStorage
 * @returns {Array} Array of entry objects
 * @throws {StorageError} If loading fails
 */
export function loadEntries() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : [];
  } catch (error) {
    throw new StorageError(`Failed to load entries: ${error.message}`);
  }
}
