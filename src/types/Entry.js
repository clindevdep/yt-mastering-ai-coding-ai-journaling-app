/**
 * Entry type definition and utilities
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a new journal entry
 * @param {string} title - Entry title
 * @param {string} content - Entry content
 * @returns {Entry} New entry object
 */
export function createEntry(title, content) {
  return {
    id: generateId(),
    title,
    content,
    timestamp: formatTimestamp(new Date())
  };
}

/**
 * Generates a unique ID for an entry
 * @returns {string} Unique ID
 */
function generateId() {
  return uuidv4();
}

/**
 * Formats a date into ISO string
 * @param {Date} date - Date to format
 * @returns {string} Formatted timestamp
 */
function formatTimestamp(date) {
  return date.toISOString();
}

/**
 * @typedef {Object} Entry
 * @property {string} id - Unique identifier
 * @property {string} title - Entry title
 * @property {string} content - Entry content
 * @property {string} timestamp - Creation timestamp in ISO format
 */
