<template>
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
      <v-btn type="submit" color="primary">Submit</v-btn>
    </div>
  </v-form>
</template>

<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

export default {
  name: 'EntryForm',
  setup() {
    const { handleSubmit, errors } = useForm({
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

    const onSubmit = handleSubmit((values) => {
      console.log('Form submitted:', values)
      // Here you would typically send the data to your API
    })

    return {
      title,
      content,
      errors,
      onSubmit,
    }
  },
}
</script>
