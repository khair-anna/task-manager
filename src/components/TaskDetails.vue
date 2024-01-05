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
              <button type="submit" class="bg-main-blue px-2 h-10 rounded-lg text-white">
                {{ $t('buttons.confirm') }}
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
                <span class="block text-right">{{ formatEndYear(task.endDate) }}</span>
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
import { useUsersStore } from '../stores/UsersStore'
import { useDark } from '@vueuse/core'

import { db } from '../firebase'
import { doc, deleteDoc, updateDoc, getDoc, collection } from 'firebase/firestore'
import { useMutation } from 'vue-query'

import { formatTimeYear } from '../composables/formatTimeYear'
import { formatTimeDate } from '../composables/formatTimeDate'
import { formatEndYear } from '../composables/formatEndYear'

const props = defineProps({
  task: {
    type: Object,
    default: () => {}
  },
  isEditing: {
    type: Boolean,
    required: true
  },
  closeModal: Function,
  closeEditing: Function,
  openEditing: Function
})

const tasksStore = useTasksStore()
const usersStore = useUsersStore()
const isDark = useDark()

const startEditing = (task) => {
  tasksStore.editingTask.id = task.id
  tasksStore.editingTask.name = task.name
  tasksStore.editingTask.description = task.description
  tasksStore.editingTask.endDate = task.endDate
  props.openEditing()
}

const editTaskMutation = useMutation(
  async () => {
    const taskDocRef = doc(usersStore.userTasksCollection, tasksStore.editingTask.id)
    const currentTask = (await getDoc(taskDocRef)).data()

    const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
    const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

    await Promise.all([
      updateDoc(doc(assignedUserCollection, tasksStore.editingTask.id), {
        name: tasksStore.editingTask.name,
        description: tasksStore.editingTask.description,
        endDate: tasksStore.editingTask.endDate
      }),
      updateDoc(doc(createdByUserCollection, tasksStore.editingTask.id), {
        name: tasksStore.editingTask.name,
        description: tasksStore.editingTask.description,
        endDate: tasksStore.editingTask.endDate
      })
    ])
  },
  {
    onSuccess: () => {
      props.closeEditing()
      tasksStore.editingTask.id = null
      tasksStore.editingTask.name = ''
      tasksStore.editingTask.description = ''
      props.closeModal()
    },
    onError: (error) => {
      console.error('Error editing task:', error)
    }
  }
)

const editTask = () => {
  editTaskMutation.mutate()
}

const cancelEdit = () => {
  props.closeEditing()
  tasksStore.editingTask.name = ''
  tasksStore.editingTask.description = ''
  tasksStore.editingTask.endDate = ''
  props.closeModal()
}

const deleteTaskMutation = useMutation(
  async (taskId) => {
    const taskDocRef = doc(usersStore.userTasksCollection, taskId)
    const currentTask = (await getDoc(taskDocRef)).data()

    const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
    const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

    await Promise.all([
      deleteDoc(doc(assignedUserCollection, taskId)),
      deleteDoc(doc(createdByUserCollection, taskId))
    ])
  },
  {
    onSuccess: () => {
      props.closeModal()
    },
    onError: (error) => {
      console.error('Error deleting task:', error)
    }
  }
)

const deleteTask = (taskId) => {
  deleteTaskMutation.mutate(taskId)
}

// const editTask = async () => {
//   try {
//     const taskDocRef = doc(usersStore.userTasksCollection, tasksStore.editingTask.id)
//     const currentTask = (await getDoc(taskDocRef)).data()

//     const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
//     const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

//     await Promise.all([
//       updateDoc(doc(assignedUserCollection, tasksStore.editingTask.id), {
//         name: tasksStore.editingTask.name,
//         description: tasksStore.editingTask.description,
//         endDate: tasksStore.editingTask.endDate
//       }),
//       updateDoc(doc(createdByUserCollection, tasksStore.editingTask.id), {
//         name: tasksStore.editingTask.name,
//         description: tasksStore.editingTask.description,
//         endDate: tasksStore.editingTask.endDate
//       })
//     ])

//     props.closeEditing()
//     tasksStore.editingTask.id = null
//     tasksStore.editingTask.name = ''
//     tasksStore.editingTask.description = ''
//     props.closeModal()
//   } catch (error) {
//     console.error('Error updating task:', error)
//   }
// }

// const deleteTask = async (taskId) => {
//   try {
//     const taskDocRef = doc(usersStore.userTasksCollection, taskId)

//     const currentTask = (await getDoc(taskDocRef)).data()

//     const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
//     const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

//     await Promise.all([
//       deleteDoc(doc(assignedUserCollection, taskId)),
//       deleteDoc(doc(createdByUserCollection, taskId))
//     ])
//     props.closeModal()
//   } catch (error) {
//     console.error('Error deleting task:', error)
//   }
// }
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
