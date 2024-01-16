import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTasksStore = defineStore('tasksStore', () => {
  const newTask = reactive({
    creationTime: null,
    endDate: '',
    name: '',
    description: '',
    completed: false,
    inProgress: false,
    createdById: '',
    createdByUsername: '',
    assignedToId: '',
    assignedToUsername: ''
  })

  const editingTask = reactive({
    id: null,
    name: '',
    description: '',
    endDate: ''
  })

  return {
    newTask,
    editingTask
  }
})
