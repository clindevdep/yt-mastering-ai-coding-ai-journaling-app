<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>AI Brainstorming App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/entries" text>Entries</v-btn>
      <v-btn to="/about" text>About</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useEntriesStore } from '@/stores/entries'

export default {
  name: 'App',
  setup() {
    const entriesStore = useEntriesStore()
    entriesStore.initializeStore()
  }
}
</script>
