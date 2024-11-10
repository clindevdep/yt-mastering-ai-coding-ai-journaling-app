<template>
  <div>
    <v-form @submit.prevent="onSubmit" class="d-flex flex-column gap-4">
    <v-text-field
      v-model="title"
      :error-messages="errors.title"
      label="Entry Title"
      required
    ></v-text-field>
    <v-textarea
      v-model="content"
      :error-messages="errors.content"
      label="Entry Content"
      required
      auto-grow
      rows="4"
    ></v-textarea>
    <div>
      <v-btn 
        type="submit" 
        color="primary"
        :loading="isSubmitting"
      >
        Submit
      </v-btn>
    </div>
  </v-form>
  
  <v-snackbar
    v-model="showSuccess"
    color="success"
    timeout="3000"
    location="top"
  >
    Entry "{{ savedTitle }}" saved successfully!
  </v-snackbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useEntriesStore } from '@/stores/entries'

export default {
  name: 'EntryForm',
  setup() {
    const { handleSubmit, errors, resetForm } = useForm({
      validationSchema: {
        title: (value) => {
          if (!value || value.trim() === '') {
            return 'Title is required';
          }
          return true;
        },
        content: (value) => {
          if (!value || value.trim() === '') {
            return 'Content is required';
          }
          return true;
        }
      }
    })

    const { value: title } = useField('title')
    const { value: content } = useField('content')

    const entriesStore = useEntriesStore()
    
    const isSubmitting = ref(false)
    const showSuccess = ref(false)
    const savedTitle = ref('')

    // Handle form submission
    const submitForm = handleSubmit(async (values) => {
      try {
        isSubmitting.value = true
        const entry = entriesStore.addEntry(values.title, values.content)
        savedTitle.value = values.title
        showSuccess.value = true
        resetForm()
        return entry
      } catch (error) {
        console.error('Failed to save entry:', error)
        throw error
      } finally {
        isSubmitting.value = false
      }
    })

    return {
      title,
      content,
      errors,
      onSubmit: submitForm,
      isSubmitting,
      showSuccess,
      savedTitle
    }
  },
}
</script>
