<template>
  <button
    type="submit"
    class="flex space-x-3 border-2 rounded-lg mx-auto text-xl bg-main-blue py-1 px-2 text-black dark:text-zinc-200 dark:border-0"
    :disabled="isLoading"
  >
    <LoadingSpinner v-if="isLoading" />
    <slot />
  </button>
</template>

<script setup>
import LoadingSpinner from '../components/LoadingSpinner.vue'

defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})
</script>
