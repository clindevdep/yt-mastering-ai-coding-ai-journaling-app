<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="title"
      :error-messages="errors.title"
      label="Entry Title"
      required
    ></v-text-field>
    <v-btn type="submit" color="primary">Submit</v-btn>
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
        }
      }
    })

    const { value: title } = useField('title')

    const onSubmit = handleSubmit((values) => {
      console.log('Form submitted:', values)
      // Here you would typically send the data to your API
    })

    return {
      title,
      errors,
      onSubmit,
    }
  },
}
</script>
