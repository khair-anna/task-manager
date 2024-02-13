<template>
  <div>
    <div class="flex items-center gap-14 mb-5">
      <h2 class="text-3xl">{{ title }}</h2>
      <span
        class="flex justify-center items-center w-10 h-10 rounded-lg border"
        :class="arrayLengthBg"
        >{{ arrayLength }}</span
      >
    </div>
    <div class="flex lg:flex-col gap-5 w-screen lg:w-full overflow-x-auto">
      <div
        class="menu relative border border-light-gray border-l-4 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3 w-80 2xl:w-96"
        :class="borderLeftColor"
        v-for="(task, index) in tasks"
        :key="task.id"
      >
        <div class="flex justify-end">
          <button @click="toggleMenu(index)">
            <img src="/svg/menu-white.svg" alt="menu-white" v-if="isDark" />
            <img src="/svg/menu.svg" alt="menu" v-else />
          </button>
        </div>
        <div
          ref="menu"
          v-on-click-outside="closeMenu"
          v-if="isMenuOpen === index"
          class="absolute right-0 w-36 rounded-md border bg-white dark:bg-zinc-700"
        >
          <button
            class="flex w-full px-2 py-1 text-sm hover:bg-gray-100 hover:rounded-t-md dark:hover:bg-zinc-500"
            @click="startEditing(task)"
          >
            {{ $t('buttons.edit') }}
          </button>
          <button
            class="flex justify-between items-center w-full px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
            @click="addTaskInProgress(task.id)"
            v-if="status !== `In Progress` && status !== `Completed`"
          >
            <span>{{ $t('buttons.inProgress') }} </span>
            <LoadingSpinner v-if="loadInProgress" />
          </button>
          <button
            class="flex justify-between items-center w-full px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
            @click="completeTask(task.id)"
            v-if="status !== `Completed`"
          >
            <span>{{ $t('buttons.complete') }} </span>
            <LoadingSpinner v-if="loadCompleting" />
          </button>
          <button
            class="flex justify-between items-center w-full px-2 py-1 text-sm hover:bg-gray-100 relative dark:hover:bg-zinc-500"
            @click="isAssignOpen = !isAssignOpen"
            v-if="status !== `In Progress` && status !== `Completed`"
          >
            <span>{{ $t('buttons.assign') }}</span>
            <LoadingSpinner v-if="loadAssigning" />
          </button>
          <select
            v-model="selectedMember"
            @change="assignTask(task.id, selectedMember)"
            v-if="isAssignOpen"
            class="absolute z-10 top-24 left-8 rounded-md border dark:bg-zinc-700"
          >
            <option value="">{{ $t('texts.selectMember') }}</option>
            <option v-for="member in data" :key="member.uid" :value="member">
              {{ member.username }}
            </option>
          </select>
        </div>
        <div @click="openModal(task)" class="cursor-pointer">
          <span class="block text-2xl mb-3">{{ task.name }}</span>
          <span class="block overflow-hidden text-ellipsis whitespace-nowrap mb-7 w-72">{{
            task.description
          }}</span>
          <span class="block mb-3"
            >{{ $t('tasks.createdBy') }}
            <span class="py-1 px-3 rounded-2xl bg-emerald-400 dark:bg-emerald-900 text-sm">{{
              task.createdByUsername
            }}</span></span
          >
          <span class="block"
            >{{ $t('tasks.assignedTo') }}
            <span
              class="py-1 px-3 rounded-2xl text-sm"
              :class="[
                {
                  'bg-emerald-400': task.assignedToId === usersStore.userId,
                  'dark:bg-emerald-900': task.assignedToId === usersStore.userId,
                  'bg-lime-300': task.assignedToId !== usersStore.userId,
                  'dark:bg-lime-800': task.assignedToId !== usersStore.userId
                }
              ]"
              >{{ task.assignedToUsername }}</span
            ></span
          >
        </div>
        <div class="flex justify-between">
          <span class="py-1 px-2 rounded-2xl text-xs self-end" :class="statusBgColor">{{
            status
          }}</span>
          <div>
            <div class="flex gap-8 items-center text-light-gray justify-between mb-3">
              <span>{{ $t('tasks.creationDate') }}</span>
              <div>
                <span class="block text-right">{{ formatTimeDate(task.creationTime) }}</span>
                <span class="block text-right text-xs">{{
                  formatTimeYear(task.creationTime)
                }}</span>
              </div>
            </div>
            <div class="flex gap-8 items-center text-gray-600 justify-between dark:text-gray-200">
              <span>{{ $t('tasks.endDate') }}</span>
              <div>
                <span class="block text-right">{{ formatEndYear(task.endDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <TaskDetails
        :task="selectedTask"
        :is-editing="isEditing"
        @close-modal="closeModal"
        @close-editing="closeEditing"
        @open-editing="openEditing"
        v-if="isModalOpen"
      >
      </TaskDetails>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useTasksStore } from '../stores/TasksStore'
import { useUsersStore } from '../stores/UsersStore'
import { useAlertsStore } from '../stores/AlertsStore'
import { useDark } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

import TaskDetails from './TaskDetails.vue'
import LoadingSpinner from './LoadingSpinner.vue'

import { formatTimeDate, formatTimeYear, formatEndYear } from '../formatTime/formatTime'

import { useAddTaskInProgress } from '../mutations/addTaskinProgress'
import { useCompleteTask } from '../mutations/completeTask'
import { useAssignTask } from '../mutations/assignTask'
import getTeamMembers from '../queries/getTeamMembers'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    required: true
  },
  borderLeftColor: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  statusBgColor: {
    type: String,
    required: true
  },
  arrayLength: {
    type: Number,
    required: true
  },
  arrayLengthBg: {
    type: String,
    required: true
  }
})

const menu = ref(null)

const isDark = useDark()

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const alertsStore = useAlertsStore()

const { data } = getTeamMembers()

const isMenuOpen = ref(null)
const isModalOpen = ref(false)
const selectedTask = ref(null)
const isEditing = ref(false)
const selectedMember = ref('')
const isAssignOpen = ref(false)

const closeEditing = () => {
  isEditing.value = false
}

const openEditing = () => {
  isEditing.value = true
}

const openModal = (task) => {
  selectedTask.value = task
  isModalOpen.value = true
}

const closeModal = () => {
  selectedTask.value = null
  isModalOpen.value = false
  closeEditing()
}

const toggleMenu = (index) => {
  isMenuOpen.value = isMenuOpen.value === index ? null : index
}

const closeMenu = () => {
  isMenuOpen.value = null
}

const startEditing = (task) => {
  openModal(task)
  tasksStore.editingTask.id = task.id
  tasksStore.editingTask.name = task.name
  tasksStore.editingTask.description = task.description
  tasksStore.editingTask.endDate = task.endDate
  isMenuOpen.value = null
  openEditing()
}

const { mutateAsync: addTaskInProgressMutation, isLoading: loadInProgress } = useAddTaskInProgress()

const addTaskInProgress = (taskId) => {
  addTaskInProgressMutation(taskId, {
    onSuccess: () => {
      isMenuOpen.value = null
      alertsStore.addNotification('success', 'Task was successfully added in progress')
    }
  })
}

const { mutateAsync: completedTaskMutation, isLoading: loadCompleting } = useCompleteTask()

const completeTask = (taskId) => {
  completedTaskMutation(taskId, {
    onSuccess: () => {
      isMenuOpen.value = null
      alertsStore.addNotification('success', 'Task was successfully completed')
    }
  })
}

const { mutateAsync: assignTaskMutation, isLoading: loadAssigning } = useAssignTask()

const assignTask = (taskId, member) => {
  if (selectedMember.value) {
    assignTaskMutation(
      { taskId, member },
      {
        onSuccess: () => {
          isAssignOpen.value = false
          selectedMember.value = ''
          isMenuOpen.value = null
          alertsStore.addNotification('success', 'Task was successfully assigned')
        }
      }
    )
  }
}
</script>
