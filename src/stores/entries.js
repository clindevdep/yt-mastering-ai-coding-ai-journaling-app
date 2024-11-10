import { defineStore } from 'pinia'
import { createEntry } from '@/types/Entry'

/**
 * Store for managing journal entries
 */
export const useEntriesStore = defineStore('entries', {
  state: () => ({
    /** @type {import('@/types/Entry').Entry[]} */
    entries: []
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
    addEntry(title, content) {
      const entry = createEntry(title, content)
      this.entries.push(entry)
      return entry
    }
  }
})
