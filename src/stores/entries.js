import { defineStore } from 'pinia'
import { createEntry } from '@/types/Entry'
import { loadEntries, saveEntries, hasNewerData, StorageError } from '@/services/storage'

/**
 * Store for managing journal entries
 */
export const useEntriesStore = defineStore('entries', {
  state: () => ({
    /** @type {import('@/types/Entry').Entry[]} */
    entries: [],
    error: null,
    lastSyncTimestamp: null
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
     * Initialize store by loading entries from storage
     */
    initializeStore() {
      try {
        const { entries, timestamp } = loadEntries()
        this.entries = Array.isArray(entries) ? [...entries] : []
        this.lastSyncTimestamp = timestamp
        this.error = null
        
        // Set up automatic sync
        this.$subscribe((mutation, state) => {
          if (mutation.type.startsWith('entries')) {
            this.syncToStorage()
          }
        })
      } catch (error) {
        console.error('Failed to load entries:', error)
        this.error = error.message
      }
    },

    /**
     * Sync current state to storage
     */
    syncToStorage() {
      try {
        // Check for newer data in storage
        if (hasNewerData(this.lastSyncTimestamp)) {
          const { entries: storedEntries } = loadEntries()
          // Merge changes, keeping newer versions of entries
          this.entries = this.mergeEntries(this.entries, storedEntries)
        }
        
        saveEntries(this.entries)
        this.error = null
      } catch (error) {
        console.error('Failed to sync entries:', error)
        this.error = error.message
      }
    },

    /**
     * Merge two sets of entries, keeping newer versions
     * @param {Array} current Current entries
     * @param {Array} stored Stored entries
     * @returns {Array} Merged entries
     */
    mergeEntries(current, stored) {
      const entriesMap = new Map()
      
      // Index all entries by ID
      current.forEach(entry => {
        entriesMap.set(entry.id, entry)
      })
      
      // Update with stored entries if they're newer
      stored.forEach(storedEntry => {
        const existingEntry = entriesMap.get(storedEntry.id)
        if (!existingEntry || new Date(storedEntry.timestamp) > new Date(existingEntry.timestamp)) {
          entriesMap.set(storedEntry.id, storedEntry)
        }
      })
      
      return Array.from(entriesMap.values())
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
      this.syncToStorage()
      return entry
    }
  }
})
