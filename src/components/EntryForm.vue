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
import * as yup from 'yup'

export default {
  name: 'EntryForm',
  setup() {
    const schema = yup.object({
      title: yup.string().required('Title is required'),
    })

    const { handleSubmit, errors } = useForm({
      validationSchema: schema,
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
