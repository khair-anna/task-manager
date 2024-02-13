<template>
  <div>
    <LayoutDefault>
      <SearchTasks
        class="xl:ml-64"
        @startSearch="startSearch"
        @closeSearch="closeSearch"
        :isSearching="isSearching"
      />
      <div v-if="!isSearching" class="xl:ml-64">
        <TaskForm />
        <TasksAllSceleton v-if="isLoading" />
        <TasksAll />
      </div>
    </LayoutDefault>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LayoutDefault from '../components/LayoutDefault.vue'
import TaskForm from '../components/TaskForm.vue'
import TasksAll from '../components/TasksAll.vue'
import TasksAllSceleton from '../components/sceleton/TasksAllSceleton.vue'
import SearchTasks from '../components/SearchTasks.vue'

import loadTasks from '../queries/loadTasks'

const { isLoading } = loadTasks()

const isSearching = ref(false)

const startSearch = () => {
  isSearching.value = true
}

const closeSearch = () => {
  isSearching.value = false
}
</script>
