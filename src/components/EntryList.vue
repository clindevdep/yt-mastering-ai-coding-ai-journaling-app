<template>
  <v-list v-if="entries.length > 0">
    <v-list-item
      v-for="entry in sortedEntries"
      :key="entry.id"
      :title="entry.title"
      :subtitle="formatDate(entry.timestamp)"
    >
    </v-list-item>
  </v-list>
  <v-card v-else class="pa-4 text-center">
    <v-card-text>
      No journal entries yet. Create your first entry to get started!
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useEntriesStore } from '@/stores/entries'

const store = useEntriesStore()

const entries = computed(() => store.entries)

const sortedEntries = computed(() => {
  return [...entries.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
