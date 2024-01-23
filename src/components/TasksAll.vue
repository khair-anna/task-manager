<template>
  <div class="grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 mt-16 px-5 gap-5" v-if="data?.length">
    <TasksList
      :tasks="tasks"
      :title="$t('titles.newTasks')"
      :borderLeftColor="`border-l-main-blue`"
      :status="$t('tasks.markNew')"
      :statusBgColor="`bg-blue-400`"
      :arrayLength="tasks.length"
      :arrayLengthBg="`border-blue-500 bg-blue-200 dark:bg-blue-900`"
    />
    <TasksList
      :tasks="tasksInProgress"
      :title="$t('titles.inProgress')"
      :borderLeftColor="`border-l-yellow-400`"
      :status="$t('tasks.markInProgress')"
      :statusBgColor="`bg-yellow-400`"
      :arrayLength="tasksInProgress.length"
      :arrayLengthBg="`border-yellow-500 bg-yellow-200 dark:bg-yellow-900`"
    />
    <TasksList
      :tasks="completedTasks"
      :title="$t('titles.completed')"
      :borderLeftColor="`border-l-green-400`"
      :status="$t('tasks.markCompleted')"
      :statusBgColor="`bg-green-400`"
      :arrayLength="completedTasks.length"
      :arrayLengthBg="`border-green-500 bg-green-200 dark:bg-green-900`"
    />
  </div>
  <div class="ml-72 mt-16 text-3xl" v-else>
    <h2>{{ $t('titles.noTask') }}</h2>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import TasksList from './TasksList.vue'

import loadTasks from '../queries/loadTasks'

const props = defineProps({
  searchTask: {
    type: String
  }
})

const { data } = loadTasks()

const tasks = computed(() => {
  if (props.searchTask) {
    return (
      data.value?.filter(
        (task) => !task.completed && !task.inProgress && task.name.includes(props.searchTask)
      ) || []
    )
  }
  return data.value?.filter((task) => !task.completed && !task.inProgress) || []
})

const tasksInProgress = computed(() => {
  if (props.searchTask) {
    return (
      data.value?.filter(
        (task) => !task.completed && task.inProgress && task.name.includes(props.searchTask)
      ) || []
    )
  }
  return data.value?.filter((task) => !task.completed && task.inProgress) || []
})

const completedTasks = computed(() => {
  if (props.searchTask) {
    return (
      data.value?.filter(
        (task) => task.completed && !task.inProgress && task.name.includes(props.searchTask)
      ) || []
    )
  }
  return data.value?.filter((task) => task.completed && !task.inProgress) || []
})
</script>
