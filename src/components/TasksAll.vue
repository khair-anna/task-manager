<template>
  <div class="grid grid-cols-3 ml-64 mt-16 px-5 gap-5" v-if="tasksStore.tasksAll.length !== 0">
    <TasksList
      :tasks="tasksStore.tasks"
      :title="$t('titles.newTasks')"
      :borderLeftColor="`border-l-main-blue`"
      :status="$t('tasks.markNew')"
      :statusBgColor="`bg-blue-400`"
      :arrayLength="tasksStore.tasks.length"
      :arrayLengthBg="`border-blue-500 bg-blue-200 dark:bg-blue-900`"
    />
    <TasksList
      :tasks="tasksStore.tasksInProgress"
      :title="$t('titles.inProgress')"
      :borderLeftColor="`border-l-yellow-400`"
      :status="$t('tasks.markInProgress')"
      :statusBgColor="`bg-yellow-400`"
      :arrayLength="tasksStore.tasksInProgress.length"
      :arrayLengthBg="`border-yellow-500 bg-yellow-200 dark:bg-yellow-900`"
    />
    <TasksList
      :tasks="tasksStore.completedTasks"
      :title="$t('titles.completed')"
      :borderLeftColor="`border-l-green-400`"
      :status="$t('tasks.markCompleted')"
      :statusBgColor="`bg-green-400`"
      :arrayLength="tasksStore.completedTasks.length"
      :arrayLengthBg="`border-green-500 bg-green-200 dark:bg-green-900`"
    />
  </div>
  <div class="ml-72 mt-16 text-3xl" v-else>
    <h2>{{ $t('titles.noTask') }}</h2>
  </div>
</template>

<script setup>
import TasksList from './TasksList.vue'
import { useTasksStore } from '../stores/TasksStore'

const tasksStore = useTasksStore()
</script>
