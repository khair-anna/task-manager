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
          @click="startEditing(task)"
        >
          {{ $t('buttons.edit') }}
        </button>
        <button
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
          @click="addTaskInProgress(task.id)"
          v-if="status !== `In Progress` && status !== `Completed`"
        >
          {{ $t('buttons.inProgress') }}
        </button>
        <button
          class="block w-full text-right px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-zinc-500"
          @click="completeTask(task.id)"
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
          @change="assignTask(task.id, selectedMember)"
          v-if="isAssignOpen"
          class="absolute z-10 top-28 left-24 rounded-md border dark:bg-zinc-700"
        >
          <option value="">{{ $t('texts.selectMember') }}</option>
          <option v-for="member in usersStore.teamMembers" :key="member.uid" :value="member">
            {{ member.username }}
          </option>
        </select>
      </div>
      <div @click="openModal(task)" class="cursor-pointer">
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
      :close-modal="closeModal"
      :close-editing="closeEditing"
      :open-editing="openEditing"
      v-if="isModalOpen"
    >
    </TaskDetails>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

import { useTasksStore } from '../stores/TasksStore'
import { useUsersStore } from '../stores/UsersStore'
import { useDark } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

import { db } from '../firebase'
import { doc, updateDoc, getDoc, collection, setDoc } from 'firebase/firestore'
import { useMutation } from 'vue-query'

import TaskDetails from './TaskDetails.vue'
import { formatTimeYear } from '../composables/formatTimeYear'
import { formatTimeDate } from '../composables/formatTimeDate'
import { formatEndYear } from '../composables/formatEndYear'

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

usersStore.getTeamMembers.refetch()

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
  openEditing()
}

const addTaskInProgressMutation = useMutation(
  async (taskId) => {
    const taskDocRef = doc(usersStore.userTasksCollection, taskId)
    const currentTask = (await getDoc(taskDocRef)).data()

    const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
    const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

    await Promise.all([
      updateDoc(doc(assignedUserCollection, taskId), { inProgress: !currentTask.inProgress }),
      updateDoc(doc(createdByUserCollection, taskId), { inProgress: !currentTask.inProgress })
    ])

    return taskId
  },
  {
    onSuccess: () => {
      isMenuOpen.value = null
    },
    onError: (error) => {
      console.error('Error updating task status:', error)
    }
  }
)

const addTaskInProgress = (taskId) => {
  addTaskInProgressMutation.mutate(taskId)
}

const completeTaskMutation = useMutation(
  async (taskId) => {
    const taskDocRef = doc(usersStore.userTasksCollection, taskId)
    const currentTask = (await getDoc(taskDocRef)).data()

    const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
    const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

    await Promise.all([
      updateDoc(doc(assignedUserCollection, taskId), {
        completed: !currentTask.completed,
        inProgress: false
      }),
      updateDoc(doc(createdByUserCollection, taskId), {
        completed: !currentTask.completed,
        inProgress: false
      })
    ])
    return taskId
  },
  {
    onSuccess: () => {
      isMenuOpen.value = null
    },
    onError: (error) => {
      console.error('Error updating task status:', error)
    }
  }
)

const completeTask = (taskId) => {
  completeTaskMutation.mutate(taskId)
}

const assignTaskMutation = useMutation(
  async ({ taskId, member }) => {
    const taskDocRef = doc(usersStore.userTasksCollection, taskId)
    const currentTask = (await getDoc(taskDocRef)).data()

    await updateDoc(taskDocRef, {
      assignedToId: member.uid,
      assignedToUsername: member.username
    })

    const assignedUserCollection = collection(db, `users/${member.uid}/tasks`)
    const assignedTaskDocRef = doc(assignedUserCollection, taskId)

    await setDoc(assignedTaskDocRef, {
      ...currentTask,
      assignedToId: member.uid,
      assignedToUsername: member.username
    })

    return taskId
  },
  {
    onSuccess: () => {
      isMenuOpen.value = null
      isAssignOpen.value = false
      selectedMember.value = ''
    },
    onError: (error) => {
      console.error('Error assigning task:', error)
    }
  }
)

const assignTask = (taskId, member) => {
  if (selectedMember.value) {
    assignTaskMutation.mutate({ taskId, member })
  }
}

await new Promise((res) => setTimeout(res, 500))

// const addTaskInProgress = async (taskId) => {
//   try {
//     const taskDocRef = doc(usersStore.userTasksCollection, taskId)

//     const currentTask = (await getDoc(taskDocRef)).data()

//     const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
//     const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

//     await Promise.all([
//       updateDoc(doc(assignedUserCollection, taskId), { inProgress: !currentTask.inProgress }),
//       updateDoc(doc(createdByUserCollection, taskId), { inProgress: !currentTask.inProgress })
//     ])

//     isMenuOpen.value = null
//   } catch (error) {
//     console.error('Error updating task status:', error)
//   }
// }

// const completeTask = async (taskId) => {
//   try {
//     const taskDocRef = doc(usersStore.userTasksCollection, taskId)

//     const currentTask = (await getDoc(taskDocRef)).data()

//     const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
//     const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

//     await Promise.all([
//       updateDoc(doc(assignedUserCollection, taskId), {
//         completed: !currentTask.completed,
//         inProgress: false
//       }),
//       updateDoc(doc(createdByUserCollection, taskId), {
//         completed: !currentTask.completed,
//         inProgress: false
//       })
//     ])

//     isMenuOpen.value = null
//   } catch (error) {
//     console.error('Error updating task status:', error)
//   }
// }

// const assignTask = async (taskId, member) => {
//   if (selectedMember.value) {
//     try {
//       const taskDocRef = doc(usersStore.userTasksCollection, taskId)

//       const currentTask = (await getDoc(taskDocRef)).data()

//       await updateDoc(taskDocRef, {
//         assignedToId: member.uid,
//         assignedToUsername: member.username
//       })

//       const assignedUserCollection = collection(db, `users/${member.uid}/tasks`)

//       const assignedTaskDocRef = doc(assignedUserCollection, taskId)

//       await setDoc(assignedTaskDocRef, {
//         ...currentTask,
//         assignedToId: member.uid,
//         assignedToUsername: member.username
//       })

//       isMenuOpen.value = null
//       isAssignOpen.value = false
//       selectedMember.value = ''
//     } catch (error) {
//       console.error('Error assigning task:', error)
//     }
//   }
// }
</script>
