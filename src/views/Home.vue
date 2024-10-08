<template>
  <div class="home">
    <h1>Home Page</h1>
    <v-btn @click="counterStore.increment">Increment</v-btn>
    <v-btn @click="counterStore.decrement">Decrement</v-btn>
    <p>Count: {{ counterStore.count }}</p>
    
    <h2>Create New Entry</h2>
    <EntryForm />
    
    <h2>Sample Data</h2>
    <v-btn @click="fetchData">Fetch Data</v-btn>
    <v-list v-if="posts.length">
      <v-list-item v-for="post in posts" :key="post.id">
        {{ post.title }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
import EntryForm from '../components/EntryForm.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    EntryForm,
  },
  setup() {
    const counterStore = useCounterStore()
    const posts = ref([])

    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        posts.value = response.data.slice(0, 5) // Get first 5 posts
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    return { 
      counterStore,
      posts,
      fetchData
    }
  }
}
</script>
