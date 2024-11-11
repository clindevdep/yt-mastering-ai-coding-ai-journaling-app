import { defineStore } from 'pinia'
import { createEntry } from '@/types/Entry'
import { loadEntries, saveEntries, StorageError } from '@/services/storage'

/**
 * Store for managing journal entries
 */
export const useEntriesStore = defineStore('entries', {
  state: () => ({
    /** @type {import('@/types/Entry').Entry[]} */
    entries: [],
    error: null
  }),

  getters: {
    /**
     * Get all entries sorted by timestamp (newest first)
     * @returns {import('@/types/Entry').Entry[]}
     */
    getAllEntries: (state) => {
      return [...state.entries].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      )
    }
  },

  actions: {
    /**
     * Add a new entry to the store
     * @param {string} title - Entry title
     * @param {string} content - Entry content
     * @returns {import('@/types/Entry').Entry} The created entry
     */
    /**
     * Initialize store by loading entries from storage
     */
    initializeStore() {
      try {
        this.entries = loadEntries()
        this.error = null
      } catch (error) {
        console.error('Failed to load entries:', error)
        this.error = error.message
      }
    },

    /**
     * Add a new entry to the store and persist to storage
     * @param {string} title - Entry title
     * @param {string} content - Entry content
     * @returns {import('@/types/Entry').Entry} The created entry
     */
    addEntry(title, content) {
      const entry = createEntry(title, content)
      this.entries.push(entry)
      
      try {
        saveEntries(this.entries)
        this.error = null
      } catch (error) {
        console.error('Failed to save entry:', error)
        this.error = error.message
      }

      return entry
    }
  }
})
