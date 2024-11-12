import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useEntriesStore } from './stores/entries'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
const app = createApp(App)

app.use(vuetify).use(router).use(pinia)

// Initialize the entries store
const entriesStore = useEntriesStore(pinia)
entriesStore.initializeStore()

app.mount('#app')
