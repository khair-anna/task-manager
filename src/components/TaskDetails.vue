<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-light-gray flex justify-center items-center modal"
  >
    <div
      class="border-4 rounded-xl w-80 sm:w-96 bg-white dark:bg-dark-bg-black p-3"
      :class="[
        {
          'flex justify-center items-center h-64': loadDeleting,
          'border-green-400': task.completed,
          'border-yellow-400': task.inProgress,
          'border-blue-400': !task.inProgress && !task.completed
        }
      ]"
    >
      <div class="flex space-x-3" v-if="loadDeleting">
        <span class="text-xl">Deleting</span>
        <LoadingSpinner />
      </div>
      <div v-else>
        <div class="flex justify-end gap-5">
          <button @click="startEditing(task)" v-if="!isEditing">
            <img src="/svg/edit-white.svg" alt="edit-white" v-if="isDark" />
            <img src="/svg/edit.svg" alt="edit" v-else />
          </button>
          <button @click="deleteTask(task.id)">
            <img src="/svg/delete-white.svg" alt="delete-white" v-if="isDark" />
            <img src="/svg/delete.svg" alt="delete" v-else />
          </button>
          <button @click="closeModal">
            <img src="/svg/close-white.svg" alt="close-white" v-if="isDark" />
            <img src="/svg/close.svg" alt="close" v-else />
          </button>
        </div>
        <div class="mt-4">
          <div v-if="isEditing">
            <form @submit.prevent="editTask">
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
                  class="flex justify-center items-center space-x-2 bg-main-blue px-2 rounded-lg text-white"
                  :disabled="loadEditing"
                >
                  <LoadingSpinner v-if="loadEditing" />
                  <span>{{ $t('buttons.confirm') }}</span>
                </button>
                <button
                  class="bg-light-gray px-2 h-10 rounded-lg text-white"
                  @click="cancelEdit(task)"
                >
                  {{ $t('buttons.cancel') }}
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <div class="mb-7">
              <h2 class="text-3xl break-words mb-4">{{ task.name }}</h2>
              <span class="block break-words text-lg">{{ task.description }}</span>
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
                  <span class="block text-right">{{ formatEndYear(task.endDate) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useTasksStore } from '../stores/TasksStore'
import { useDark } from '@vueuse/core'

import LoadingSpinner from './LoadingSpinner.vue'

import { formatTimeDate, formatTimeYear, formatEndYear } from '../formatTime/formatTime'
import { useAlertsStore } from '../stores/AlertsStore'
import { useEditTask } from '../mutations/editTask'
import { useDeleteTask } from '../mutations/deleteTask'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  task: {
    type: Object,
    default: () => {}
  },
  isEditing: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'closeEditing', 'openEditing'])

const tasksStore = useTasksStore()
const alertsStore = useAlertsStore()
const isDark = useDark()

const startEditing = (task) => {
  tasksStore.editingTask.id = task.id
  tasksStore.editingTask.name = task.name
  tasksStore.editingTask.description = task.description
  tasksStore.editingTask.endDate = task.endDate
  emit('openEditing')
}

const { mutateAsync: editTaskMutation, data, isLoading: loadEditing } = useEditTask()

const editTask = () => {
  editTaskMutation(data, {
    onSuccess: () => {
      tasksStore.editingTask.id = null
      tasksStore.editingTask.name = ''
      tasksStore.editingTask.description = ''
      tasksStore.editingTask.endDate = ''
      emit('closeEditing')
      emit('closeModal')
      alertsStore.addNotification('success', 'Task was successfully edited')
    }
  })
}

const cancelEdit = () => {
  emit('closeEditing')
  tasksStore.editingTask.name = ''
  tasksStore.editingTask.description = ''
  tasksStore.editingTask.endDate = ''
  emit('closeModal')
}

const { mutateAsync: deleteTaskMutation, isLoading: loadDeleting } = useDeleteTask()

const deleteTask = (taskId) => {
  deleteTaskMutation(taskId, {
    onSuccess: () => {
      emit('closeModal')
      alertsStore.addNotification('success', 'Task was successfully deleted')
    }
  })
}
</script>
