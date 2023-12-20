<template>
  <div class="ml-96 flex flex-col gap-3">
    <div
      v-for="task in tasksStore.tasksSearch"
      :key="task.id"
      class="border border-light-gray rounded-lg w-80 bg-white dark:bg-dark-bg-black p-3 cursor-pointer border-l-4"
      :class="[
        {
          'border-l-green-400': task.completed,
          'border-l-yellow-400': task.inProgress,
          'border-l-blue-400': !task.inProgress && !task.completed
        }
      ]"
      @click="tasksStore.openModal(task)"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span>{{ task.name }}</span>
          <span class="text-xs">{{ task.description }}</span>
        </div>
        <div>
          <span class="block text-light-gray text-xs">{{ formatTimeYear(task.creationTime) }}</span>
          <span v-if="task.completed" class="p-1 rounded-2xl text-xs bg-green-400">{{
            $t('tasks.markCompleted')
          }}</span>
          <span v-else-if="task.inProgress" class="p-1 rounded-2xl text-xs bg-yellow-400">{{
            $t('tasks.markInProgress')
          }}</span>
          <span v-else class="p-1 rounded-2xl text-xs bg-blue-400">{{ $t('tasks.markNew') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTasksStore } from '../stores/TasksStore'

const tasksStore = useTasksStore()

const formatTimeYear = (timestamp) => {
  const date = new Date(timestamp)
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  return date.toLocaleString('uk-UA', options)
}
</script>
