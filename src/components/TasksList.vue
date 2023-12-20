<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-14">
      <h2 class="text-3xl">{{ title }}</h2>
      <span
        class="flex justify-center items-center w-10 h-10 rounded-lg border"
        :class="arrayLengthBg"
        >{{ arrayLength }}</span
      >
    </div>
    <div
      class="menu relative border border-light-gray border-l-4 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3"
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
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 hover:rounded-t-md dark:hover:bg-zinc-500"
          @click="handleButtonClick('Edit', task)"
        >
          {{ $t('buttons.edit') }}
        </button>
        <button
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
          @click="handleButtonClick('InProgress', task.id)"
          v-if="status !== `In Progress` && status !== `Completed`"
        >
          {{ $t('buttons.inProgress') }}
        </button>
        <button
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
          @click="handleButtonClick('Complete', task.id)"
          v-if="status !== `Completed`"
        >
          {{ $t('buttons.complete') }}
        </button>
        <button
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 relative dark:hover:bg-zinc-500"
          @click="isAssignOpen = !isAssignOpen"
          v-if="status !== `In Progress` && status !== `Completed`"
        >
          {{ $t('buttons.assign') }}
        </button>
        <select
          v-model="selectedMember"
          @change="assignTaskToMember(task.id)"
          v-if="isAssignOpen"
          class="absolute z-10 top-28 left-24 rounded-md border dark:bg-zinc-700"
        >
          <option value="">{{ $t('texts.selectMember') }}</option>
          <option v-for="member in usersStore.teamMembers" :key="member.uid" :value="member">
            {{ member.username }}
          </option>
        </select>
      </div>
      <div @click="tasksStore.openModal(task)" class="cursor-pointer">
        <span class="block text-2xl mb-3">{{ task.name }}</span>
        <span class="block break-words mb-7">{{ task.description }}</span>
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
                'bg-emerald-400': task.assignedToId === usersStore.currentUser.uid,
                'dark:bg-emerald-900': task.assignedToId === usersStore.currentUser.uid,
                'bg-lime-300': task.assignedToId !== usersStore.currentUser.uid,
                'dark:bg-lime-800': task.assignedToId !== usersStore.currentUser.uid
              }
            ]"
            >{{ task.assignedToUsername }}</span
          ></span
        >
      </div>
      <div class="flex justify-between">
        <span class="py-1 px-3 rounded-2xl text-xs self-end" :class="statusBgColor">{{
          status
        }}</span>
        <div>
          <div class="flex gap-8 items-center text-light-gray justify-between mb-3">
            <span>{{ $t('tasks.creationDate') }}</span>
            <div>
              <span class="block text-right">{{ formatTimeDate(task.creationTime) }}</span>
              <span class="block text-right text-xs">{{ formatTimeYear(task.creationTime) }}</span>
            </div>
          </div>
          <div class="flex gap-8 items-center text-gray-600 justify-between dark:text-gray-200">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '../stores/TasksStore'
import { useUsersStore } from '../stores/UsersStore'
import { useDark } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

const menu = ref(null)
const closeMenu = () => {
  isMenuOpen.value = null
}

const isDark = useDark()

const tasksStore = useTasksStore()
const usersStore = useUsersStore()

const isMenuOpen = ref(null)

onMounted(() => {
  usersStore.getTeamMembers()
})
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

const toggleMenu = (index) => {
  isMenuOpen.value = isMenuOpen.value === index ? null : index
}

const handleButtonClick = (action, taskId) => {
  if (action === 'Edit') {
    tasksStore.openModal(taskId)
    tasksStore.startEditing(taskId)
    taskId.isEditOpen = true
  } else if (action === 'InProgress') {
    tasksStore.addTaskInProgress(taskId)
  } else if (action === 'Complete') {
    tasksStore.completeTask(taskId)
  } else if (action === 'Delete') {
    tasksStore.deleteTask(taskId)
  }

  isMenuOpen.value = null
}

const selectedMember = ref('')
const isAssignOpen = ref(false)

const assignTaskToMember = (taskId) => {
  if (selectedMember.value) {
    tasksStore.assignTask(taskId, selectedMember.value)
    isMenuOpen.value = null
    isAssignOpen.value = false
  }
}

// watchEffect(() => {
//   const handleDocumentClick = (event) => {
//     const menuContainer = document.querySelector('.menu')
//     if (menuContainer && !menuContainer.contains(event.target)) {
//       isMenuOpen.value = null
//     }
//   }
//   document.addEventListener('mousedown', handleDocumentClick)
//   return () => {
//     document.removeEventListener('mousedown', handleDocumentClick)
//   }
// })
</script>
