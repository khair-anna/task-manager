<template>
  <input
    :type="type"
    :name="name"
    :placeholder="placeholder"
    class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <span v-for="error in errors" :key="error.$uid" class="text-sm text-red-600 -mt-4">{{
    error.$message
  }}</span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    default: () => []
  }
})
</script>
