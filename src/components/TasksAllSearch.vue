<template>
  <div
    class="grid grid-cols-3 ml-64 mt-16 px-5 gap-5"
    v-if="tasksAllSearch && tasksAllSearch.length !== 0"
  >
    <TasksList
      :tasks="tasksSearch"
      :title="$t('titles.newTasks')"
      :borderLeftColor="`border-l-main-blue`"
      :status="$t('tasks.markNew')"
      :statusBgColor="`bg-blue-400`"
      :arrayLength="tasksSearch.length"
      :arrayLengthBg="`border-blue-500 bg-blue-200 dark:bg-blue-900`"
    />
    <TasksList
      :tasks="tasksInProgressSearch"
      :title="$t('titles.inProgress')"
      :borderLeftColor="`border-l-yellow-400`"
      :status="$t('tasks.markInProgress')"
      :statusBgColor="`bg-yellow-400`"
      :arrayLength="tasksInProgressSearch.length"
      :arrayLengthBg="`border-yellow-500 bg-yellow-200 dark:bg-yellow-900`"
    />
    <TasksList
      :tasks="completedTasksSearch"
      :title="$t('titles.completed')"
      :borderLeftColor="`border-l-green-400`"
      :status="$t('tasks.markCompleted')"
      :statusBgColor="`bg-green-400`"
      :arrayLength="completedTasksSearch.length"
      :arrayLengthBg="`border-green-500 bg-green-200 dark:bg-green-900`"
    />
  </div>
  <div class="ml-72 mt-16 text-3xl" v-else>
    <h2>
      {{ $t('titles.noSearchTask') }} <span class="text-4xl text-red-400">"{{ searchTask }}"</span>
    </h2>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TasksList from './TasksList.vue'
import { useTasksStore } from '../stores/TasksStore'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  searchTask: {
    type: String
  }
})

const tasksStore = useTasksStore()

const tasksSearch = computed(() => {
  if (!props.searchTask.trim()) {
    return
  }
  return tasksStore.tasks.filter((task) => task.name.includes(props.searchTask))
})

const tasksInProgressSearch = computed(() => {
  if (!props.searchTask.trim()) {
    return
  }
  return tasksStore.tasksInProgress.filter((task) => task.name.includes(props.searchTask))
})

const completedTasksSearch = computed(() => {
  if (!props.searchTask.trim()) {
    return
  }
  return tasksStore.completedTasks.filter((task) => task.name.includes(props.searchTask))
})

const tasksAllSearch = computed(() => {
  if (!props.searchTask.trim()) {
    return
  }
  return tasksStore.tasksAll.filter((task) => task.name.includes(props.searchTask))
})
</script>
