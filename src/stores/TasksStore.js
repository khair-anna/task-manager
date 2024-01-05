import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useQuery, useMutation } from 'vue-query'
import { addDoc, getDocs, orderBy, query } from 'firebase/firestore'
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

  // const loadTasks = useQuery(
  //   'loadTasks',
  //   async () => {
  //     if (usersStore.userTasksCollection) {
  //       const unsubscribe = onSnapshot(
  //         query(usersStore.userTasksCollection, orderBy('creationTime', 'desc')),
  //         (snapshot) => {
  //           const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //           tasksAll.value = data
  //           console.log(tasksAll.value)
  //         }
  //       )
  //       return unsubscribe
  //     }
  //     return () => {}
  //   },
  //   {
  //     onError: (error) => {
  //       console.error('Error loading tasks:', error)
  //     }
  //   }
  // )

  const loadTasks = useQuery(
    'loadTasks',
    async () => {
      if (usersStore.userTasksCollection) {
        const snapshot = await getDocs(
          query(usersStore.userTasksCollection, orderBy('creationTime', 'desc'))
        )
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      }
      return []
    },
    {
      onSuccess: (data) => {
        tasksAll.value = data
      },
      onError: (error) => {
        console.error('Error loading tasks:', error)
      }
    }
  )

  const createNewTaskMutation = useMutation(
    (task) => addDoc(usersStore.userTasksCollection, task),
    {
      onSuccess: () => {
        newTask.name = ''
        newTask.description = ''
        newTask.endDate = ''
        isCreating.value = false
      },
      onError: (error) => {
        console.error('Error creating new task:', error)
      }
    }
  )

  const createNewTask = () => {
    const task = {
      ...newTask,
      creationTime: Date.now(),
      createdById: usersStore.currentUser.uid,
      createdByUsername: usersStore.currentUser.username,
      assignedToId: usersStore.currentUser.uid,
      assignedToUsername: usersStore.currentUser.username
    }
    createNewTaskMutation.mutate(task)
  }

  const tasks = computed(() => {
    return tasksAll.value.filter((task) => !task.completed && !task.inProgress)
  })

  const tasksInProgress = computed(() => {
    return tasksAll.value.filter((task) => !task.completed && task.inProgress)
  })

  const completedTasks = computed(() => {
    return tasksAll.value.filter((task) => task.completed && !task.inProgress)
  })

  const editingTask = reactive({
    id: null,
    name: '',
    description: '',
    endDate: ''
  })

  // const createNewTask = () => {
  //   addDoc(usersStore.userTasksCollection, {
  //     ...newTask,
  //     creationTime: Date.now(),
  //     createdById: usersStore.currentUser.uid,
  //     createdByUsername: usersStore.currentUser.username,
  //     assignedToId: usersStore.currentUser.uid,
  //     assignedToUsername: usersStore.currentUser.username
  //   })
  //   newTask.name = ''
  //   newTask.description = ''
  //   newTask.endDate = ''
  //   isCreating.value = false
  // }

  // const loadTasks = async () => {
  //   try {
  //     if (usersStore.userTasksCollection) {
  //       onSnapshot(
  //         query(usersStore.userTasksCollection, orderBy('creationTime', 'desc')),
  //         (snapshot) => {
  //           const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //           tasksAll.value = tasksData
  //         }
  //       )
  //     }
  //   } catch (error) {
  //     console.error('Error loading tasks:', error)
  //   }
  // }

  return {
    newTask,
    editingTask,
    tasks,
    tasksAll,
    tasksInProgress,
    completedTasks,
    isCreating,
    loadTasks,
    createNewTask
  }
})
