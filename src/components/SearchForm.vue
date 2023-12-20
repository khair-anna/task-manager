<template>
  <div class="ml-64 p-5">
    <form class="relative" @submit.prevent>
      <img src="/svg/search.svg" alt="search" class="absolute top-4 left-3" />
      <input
        type="text"
        class="h-14 w-96 rounded-2xl py-1.5 pl-12 text-md dark:bg-dark-bg-black"
        :placeholder="$t('placeholders.search')"
        v-model="searchTask"
        @input="handleSearchInput"
      />
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/TasksStore'

const tasksStore = useTasksStore()

const searchTask = ref('')

const handleSearchInput = () => {
  if (!searchTask.value.trim()) {
    tasksStore.tasksSearch = []
    return
  }

  tasksStore.searchTask(searchTask.value)
}
</script>
