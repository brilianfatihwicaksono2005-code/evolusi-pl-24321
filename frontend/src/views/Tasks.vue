<template>
  <div>
    <h1>Tasks List</h1>
    <router-link to="/">Back to Home</router-link>
    <div v-if="loading">Loading tasks...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.title }}</strong> - {{ task.status }}
        <p v-if="task.description">{{ task.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const apiUrl = import.meta.env.VITE_API_URL

onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/tasks`)
    tasks.value = response.data
  } catch (err) {
    error.value = 'Failed to load tasks'
  } finally {
    loading.value = false
  }
})
</script>
