<template>
  <div>
    <div class="p-7">
      <form class="relative" @submit.prevent>
        <img src="/svg/search.svg" alt="search" class="absolute top-4 left-3" />
        <input
          type="text"
          class="h-14 sm:w-96 rounded-2xl py-1.5 pl-12 text-md dark:bg-dark-bg-black"
          :placeholder="$t('placeholders.search')"
          v-model="taskSearch"
        />
      </form>
    </div>
    <div v-if="isSearching">
      <TasksAll :searchTask="taskSearch" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TasksAll from './TasksAll.vue'
import { watch } from 'vue'

defineProps({
  isSearching: {
    type: Boolean
  }
})

const emit = defineEmits(['startSearch', 'closeSearch'])

const taskSearch = ref('')

watch(taskSearch, (newValue) => {
  if (newValue.length === 0) {
    emit('closeSearch')
  }
  if (newValue.length !== 0) {
    emit('startSearch')
  }
})
</script>
