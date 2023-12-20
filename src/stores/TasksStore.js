import { defineStore } from 'pinia'
import { db } from '../firebase'
import { ref, reactive } from 'vue'
import {
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
  getDoc,
  collection,
  setDoc
} from 'firebase/firestore'
import { useUsersStore } from './UsersStore'

export const useTasksStore = defineStore('tasksStore', () => {
  const usersStore = useUsersStore()

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

  const isCreating = ref(false)
  const tasksAll = ref([])
  const tasks = ref([])
  const tasksInProgress = ref([])
  const completedTasks = ref([])
  const isEditing = ref(false)
  const tasksSearch = ref([])

  const isModalOpen = ref(false)
  const selectedTask = ref(null)

  const openModal = (task) => {
    selectedTask.value = task
    isModalOpen.value = true
  }

  const closeModal = () => {
    selectedTask.value = null
    isModalOpen.value = false
    isEditing.value = false
  }

  const createNewTask = () => {
    addDoc(usersStore.userTasksCollection, {
      ...newTask,
      creationTime: Date.now(),
      createdById: usersStore.currentUser.uid,
      createdByUsername: usersStore.currentUser.username,
      assignedToId: usersStore.currentUser.uid,
      assignedToUsername: usersStore.currentUser.username
    })
    newTask.name = ''
    newTask.description = ''
    newTask.endDate = ''
    isCreating.value = false
  }

  const loadTasks = async () => {
    try {
      if (usersStore.userTasksCollection) {
        onSnapshot(
          query(usersStore.userTasksCollection, orderBy('creationTime', 'desc')),
          (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            tasksAll.value = tasksData
            tasks.value = tasksData.filter((task) => !task.completed && !task.inProgress)
            tasksInProgress.value = tasksData.filter((task) => !task.completed && task.inProgress)
            completedTasks.value = tasksData.filter((task) => task.completed && !task.inProgress)
          }
        )
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  const editingTask = reactive({
    id: null,
    name: '',
    description: '',
    endDate: ''
  })

  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(usersStore.userTasksCollection, taskId)

      const currentTask = (await getDoc(taskDocRef)).data()

      const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
      const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

      await Promise.all([
        deleteDoc(doc(assignedUserCollection, taskId)),
        deleteDoc(doc(createdByUserCollection, taskId))
      ])
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const addTaskInProgress = async (taskId) => {
    try {
      const taskDocRef = doc(usersStore.userTasksCollection, taskId)

      const currentTask = (await getDoc(taskDocRef)).data()

      const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
      const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

      await Promise.all([
        updateDoc(doc(assignedUserCollection, taskId), { inProgress: !currentTask.inProgress }),
        updateDoc(doc(createdByUserCollection, taskId), { inProgress: !currentTask.inProgress })
      ])
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const completeTask = async (taskId) => {
    try {
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
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const startEditing = (task) => {
    editingTask.id = task.id
    editingTask.name = task.name
    editingTask.description = task.description
    editingTask.endDate = task.endDate
    isEditing.value = true
  }

  const editTask = async () => {
    try {
      const taskDocRef = doc(usersStore.userTasksCollection, editingTask.id)
      const currentTask = (await getDoc(taskDocRef)).data()

      const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
      const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

      await Promise.all([
        updateDoc(doc(assignedUserCollection, editingTask.id), {
          name: editingTask.name,
          description: editingTask.description,
          endDate: editingTask.endDate
        }),
        updateDoc(doc(createdByUserCollection, editingTask.id), {
          name: editingTask.name,
          description: editingTask.description,
          endDate: editingTask.endDate
        })
      ])

      isEditing.value = false
      editingTask.id = null
      editingTask.name = ''
      editingTask.description = ''
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const cancelEdit = () => {
    isEditing.value = false
    editingTask.name = ''
    editingTask.description = ''
    editingTask.endDate = ''
  }

  const searchTask = async (taskName) => {
    const newTasks = tasks.value.filter((task) => task.name.includes(taskName))
    const inProgressTasks = tasksInProgress.value.filter((task) => task.name.includes(taskName))
    const completeTasks = completedTasks.value.filter((task) => task.name.includes(taskName))

    const uniqueTasks = [...new Set([...newTasks, ...inProgressTasks, ...completeTasks])]

    tasksSearch.value = uniqueTasks
  }

  const assignTask = async (taskId, member) => {
    try {
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
    } catch (error) {
      console.error('Error assigning task:', error)
    }
  }

  return {
    newTask,
    editingTask,
    tasks,
    tasksAll,
    tasksInProgress,
    completedTasks,
    isCreating,
    isEditing,
    tasksSearch,
    isModalOpen,
    selectedTask,
    loadTasks,
    openModal,
    closeModal,
    createNewTask,
    deleteTask,
    addTaskInProgress,
    completeTask,
    startEditing,
    editTask,
    cancelEdit,
    searchTask,
    assignTask
  }
})
