<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto">
        <h1 class="text-h4 mb-4">Journal Entries</h1>
        <EntryList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import EntryList from '@/components/EntryList.vue'
</script>
