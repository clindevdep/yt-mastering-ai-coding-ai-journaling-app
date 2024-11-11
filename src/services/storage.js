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

// Default warning threshold (80% of quota)
const WARNING_THRESHOLD = 0.8;

/**
 * Calculate the size of data in bytes
 * @param {*} data Data to measure
 * @returns {number} Size in bytes
 */
function getDataSize(data) {
  return new Blob([JSON.stringify(data)]).size;
}

/**
 * Check available localStorage space
 * @returns {{ available: number, total: number }} Available and total space in bytes
 * @throws {StorageError} If quota info cannot be determined
 */
export function checkStorageQuota() {
  try {
    const testKey = '__quota_test__';
    let total = 5 * 1024 * 1024; // Default 5MB estimate for localStorage
    let used = 0;
    
    // Calculate used space
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += getDataSize(localStorage[key]);
      }
    }
    
    // Estimate total by trying to fill storage
    try {
      let testData = 'x';
      while (true) {
        localStorage.setItem(testKey, testData);
        testData += testData;
      }
    } catch (e) {
      total = used + getDataSize(localStorage.getItem(testKey));
      localStorage.removeItem(testKey);
    }
    
    return {
      available: total - used,
      total
    };
  } catch (error) {
    throw new StorageError(`Failed to check storage quota: ${error.message}`);
  }
}

/**
 * Check if storage usage is near limit
 * @param {number} requiredBytes Additional bytes needed
 * @returns {boolean} True if usage would exceed warning threshold
 */
export function isQuotaNearLimit(requiredBytes = 0) {
  try {
    const { available, total } = checkStorageQuota();
    const remainingRatio = (available - requiredBytes) / total;
    return remainingRatio < (1 - WARNING_THRESHOLD);
  } catch (error) {
    return false; // Fail safe if we can't determine
  }
}

/**
 * Calculate required space for entries
 * @param {Array} entries Array of entries to calculate size for
 * @returns {number} Required space in bytes
 */
export function calculateRequiredSpace(entries) {
  return getDataSize({
    entries,
    timestamp: new Date().toISOString()
  });
}

/**
 * Save entries to localStorage with timestamp
 * @param {Array} entries Array of entry objects to save
 * @throws {StorageError} If saving fails
 */
export function saveEntries(entries) {
  try {
    const requiredSpace = calculateRequiredSpace(entries);
    const { available } = checkStorageQuota();
    
    if (requiredSpace > available) {
      throw new StorageError('Storage quota exceeded');
    }
    
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
