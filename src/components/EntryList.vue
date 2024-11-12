<template>
  <v-list v-if="entries.length > 0" class="rounded">
    <v-list-item
      v-for="entry in sortedEntries"
      :key="entry.id"
      :title="entry.title"
      :subtitle="formatDate(entry.timestamp)"
      @click="togglePreview(entry)"
      :active="selectedEntry?.id === entry.id"
      class="entry-item"
    >
      <template v-slot:append>
        <v-icon>{{ selectedEntry?.id === entry.id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </template>
    </v-list-item>
    <v-expand-transition>
      <v-card v-if="selectedEntry" class="mx-2 mx-sm-4 mb-4">
        <v-card-text>
          {{ previewContent }}
          <v-btn
            v-if="selectedEntry.content.length > 200"
            variant="text"
            color="primary"
            class="mt-2"
            @click="showFullContent = !showFullContent"
          >
            {{ showFullContent ? 'Show Less' : 'Show More' }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-list>
  <v-card v-else class="pa-4 text-center">
    <v-card-text>
      No journal entries yet. Create your first entry to get started!
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useEntriesStore } from '@/stores/entries'

const store = useEntriesStore()

const entries = computed(() => store.entries)

const sortedEntries = computed(() => {
  return [...entries.value].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )
})

const selectedEntry = ref(null)
const showFullContent = ref(false)

const previewContent = computed(() => {
  if (!selectedEntry.value) return ''
  const content = selectedEntry.value.content
  if (showFullContent.value) return content
  return content.length > 200 ? content.slice(0, 200) + '...' : content
})

function togglePreview(entry) {
  if (selectedEntry.value?.id === entry.id) {
    selectedEntry.value = null
    showFullContent.value = false
  } else {
    selectedEntry.value = entry
    showFullContent.value = false
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.entry-item {
  min-height: 48px; /* Minimum touch target size */
}

/* Only show hover effect on devices that support hover */
@media (hover: hover) {
  .entry-item:hover {
    background-color: rgba(var(--v-theme-primary), 0.05);
    cursor: pointer;
  }
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .v-list-item__content {
    padding: 8px 0;
  }
  
  .v-list-item__title {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  .v-list-item__subtitle {
    font-size: 0.875rem;
  }
}
</style>
