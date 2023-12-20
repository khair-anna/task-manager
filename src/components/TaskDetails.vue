<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-light-gray flex justify-center items-center modal"
  >
    <div
      class="border-4 rounded-xl w-96 bg-white dark:bg-dark-bg-black p-3"
      :class="[
        {
          'border-green-400': task.completed,
          'border-yellow-400': task.inProgress,
          'border-blue-400': !task.inProgress && !task.completed
        }
      ]"
    >
      <div class="flex justify-end gap-5">
        <button @click="startEditTask(task)">
          <img src="/svg/edit-white.svg" alt="edit-white" v-if="isDark" />
          <img src="/svg/edit.svg" alt="edit" v-else />
        </button>
        <button @click="deleteTask(task.id)">
          <img src="/svg/delete-white.svg" alt="delete-white" v-if="isDark" />
          <img src="/svg/delete.svg" alt="delete" v-else />
        </button>
        <button @click="tasksStore.closeModal">
          <img src="/svg/close-white.svg" alt="close-white" v-if="isDark" />
          <img src="/svg/close.svg" alt="close" v-else />
        </button>
      </div>
      <div class="mt-4">
        <div v-if="tasksStore.isEditing">
          <form @submit.prevent>
            <input
              v-model="tasksStore.editingTask.name"
              class="block text-2xl mb-3 h-10 w-60 px-3 rounded-lg dark:bg-zinc-700"
              required
            />
            <textarea
              v-model="tasksStore.editingTask.description"
              class="h-14 w-60 px-3 rounded-lg dark:bg-zinc-700"
              required
            ></textarea>
            <VueDatePicker
              v-model="tasksStore.editingTask.endDate"
              input-class-name="dark:bg-zinc-700 dark:text-white"
              :placeholder="$t('placeholders.changeEndDate')"
              text-input
            />
            <div class="flex gap-5 mt-3">
              <button
                type="submit"
                class="bg-main-blue px-2 h-10 rounded-lg text-white"
                @click="editTask"
              >
                {{ $t('buttons.confirm') }}
              </button>
              <button
                type="submit"
                class="bg-light-gray px-2 h-10 rounded-lg text-white"
                @click="tasksStore.cancelEdit(task)"
              >
                {{ $t('buttons.cancel') }}
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <div class="mb-7">
            <h2 class="text-3xl mb-4">{{ task.name }}</h2>
            <span class="block text-lg">{{ task.description }}</span>
          </div>
          <div>
            <div class="flex gap-8 items-center text-light-gray justify-end mb-3">
              <span>{{ $t('tasks.creationDate') }}</span>
              <div>
                <span class="block text-right">{{ formatTimeDate(task.creationTime) }}</span>
                <span class="block text-right text-xs">{{
                  formatTimeYear(task.creationTime)
                }}</span>
              </div>
            </div>
            <div class="flex gap-8 items-center text-gray-600 justify-end dark:text-gray-200">
              <span>{{ $t('tasks.endDate') }}</span>
              <div>
                <span class="block text-right">{{ formatEndDate(task.endDate) }}</span>
                <span class="block text-right text-xs">{{ formatEndYear(task.endDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTasksStore } from '../stores/TasksStore'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const tasksStore = useTasksStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  task: {
    type: Object,
    default: () => {}
  }
})

const formatTimeYear = (timestamp) => {
  const date = new Date(timestamp)
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
  return date.toLocaleString('uk-UA', options)
}

const formatTimeDate = (timestamp) => {
  const date = new Date(timestamp)
  const options = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Europe/Kiev' }
  return date.toLocaleString('uk-UA', options)
}

const formatEndDate = (timestamp) => {
  const date = timestamp.toDate()
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Europe/Kiev'
  }
  return date.toLocaleString('uk-UA', options)
}

const formatEndYear = (timestamp) => {
  const date = timestamp.toDate()
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleString('uk-UA', options)
}

const startEditTask = (task) => {
  tasksStore.openModal(task)
  tasksStore.startEditing(task)
}

const editTask = () => {
  tasksStore.editTask()
  tasksStore.closeModal()
}

const deleteTask = (taskId) => {
  tasksStore.deleteTask(taskId)
  tasksStore.closeModal()
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
