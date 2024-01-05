<template>
  <div class="ml-64 p-5">
    <form class="relative" @submit.prevent>
      <img src="/svg/search.svg" alt="search" class="absolute top-4 left-3" />
      <input
        type="text"
        class="h-14 w-96 rounded-2xl py-1.5 pl-12 text-md dark:bg-dark-bg-black"
        :placeholder="$t('placeholders.search')"
        v-model="taskSearch"
      />
    </form>
  </div>
  <div v-if="isSearching">
    <Suspense>
      <TasksAllSearch :searchTask="taskSearch" />
      <template #fallback>
        <TasksAllSceleton />
      </template>
    </Suspense>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TasksAllSearch from './TasksAllSearch.vue'
import TasksAllSceleton from './sceleton/TasksAllSceleton.vue'
import { watch } from 'vue'

const taskSearch = ref('')

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isSearching: {
    type: Boolean
  },
  startSearch: {
    type: Function
  },
  closeSearch: {
    type: Function
  }
})

watch(taskSearch, (newValue) => {
  if (newValue.length === 0) {
    props.closeSearch()
  }
  if (newValue.length !== 0) {
    props.startSearch()
  }
})
</script>
