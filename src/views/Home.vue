<template>
  <div class="home">
    <h1>Home Page</h1>
    <v-btn @click="counterStore.increment">Increment</v-btn>
    <v-btn @click="counterStore.decrement">Decrement</v-btn>
    <p>Count: {{ counterStore.count }}</p>
  </div>
</template>

<script>
import { useCounterStore } from '../stores/counter'

export default {
  name: 'Home',
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  }
}
</script>
