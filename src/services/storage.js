/**
 * Storage service for managing localStorage operations
 */

const STORAGE_KEY = 'journal_entries';
const LAST_SYNC_KEY = 'last_sync_timestamp';

export class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Save entries to localStorage with timestamp
 * @param {Array} entries Array of entry objects to save
 * @throws {StorageError} If saving fails
 */
export function saveEntries(entries) {
  try {
    const timestamp = new Date().toISOString();
    const data = {
      entries,
      timestamp
    };
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem(LAST_SYNC_KEY, timestamp);
  } catch (error) {
    throw new StorageError(`Failed to save entries: ${error.message}`);
  }
}

/**
 * Load entries from localStorage
 * @returns {{ entries: Array, timestamp: string }} Object containing entries and last sync timestamp
 * @throws {StorageError} If loading fails
 */
export function loadEntries() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return { entries: [], timestamp: null };
    }
    const data = JSON.parse(serialized);
    return {
      entries: data.entries || [],
      timestamp: data.timestamp || localStorage.getItem(LAST_SYNC_KEY)
    };
  } catch (error) {
    throw new StorageError(`Failed to load entries: ${error.message}`);
  }
}

/**
 * Check if stored data is newer than current data
 * @param {string} currentTimestamp ISO timestamp string
 * @returns {boolean} True if stored data is newer
 */
export function hasNewerData(currentTimestamp) {
  try {
    const storedTimestamp = localStorage.getItem(LAST_SYNC_KEY);
    if (!storedTimestamp || !currentTimestamp) return false;
    return new Date(storedTimestamp) > new Date(currentTimestamp);
  } catch (error) {
    return false;
  }
}
