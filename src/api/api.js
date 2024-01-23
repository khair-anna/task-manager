import {
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  collection,
  updateDoc,
  setDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore'
import { db, auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useUsersStore } from '../stores/UsersStore'
import { useTasksStore } from '../stores/TasksStore'

async function fetchTasks(id) {
  const userTasksCollection = collection(db, `users/${id}/tasks`)

  const snapshot = await getDocs(query(userTasksCollection, orderBy('creationTime', 'desc')))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

async function fetchTeamMembers() {
  const usersCollection = collection(db, 'users')
  const querySnapshot = await getDocs(usersCollection)
  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }))
}

async function fetchUser() {
  const user = auth.currentUser
  if (!user) {
    return null
  }

  const userDocRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userDocRef)

  const userData = {
    uid: user.uid,
    email: user.email,
    username: userDoc.data().username,
    jobTitle: userDoc.data().jobTitle
  }

  return userData
}

async function addTaskInProgress(taskId) {
  const usersStore = useUsersStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  const taskDocRef = doc(userTasksCollection, taskId)
  const currentTask = (await getDoc(taskDocRef)).data()

  const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
  const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

  await Promise.all([
    updateDoc(doc(assignedUserCollection, taskId), { inProgress: !currentTask.inProgress }),
    updateDoc(doc(createdByUserCollection, taskId), { inProgress: !currentTask.inProgress })
  ])
}

async function completeTask(taskId) {
  const usersStore = useUsersStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  const taskDocRef = doc(userTasksCollection, taskId)
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
}

async function assignTask({ taskId, member }) {
  const usersStore = useUsersStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  const taskDocRef = doc(userTasksCollection, taskId)
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
}

async function editTask() {
  const usersStore = useUsersStore()
  const tasksStore = useTasksStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  if (tasksStore.editingTask.id) {
    const taskDocRef = doc(userTasksCollection, tasksStore.editingTask.id)
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
  }
}

async function deleteTask(taskId) {
  const usersStore = useUsersStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  const taskDocRef = doc(userTasksCollection, taskId)
  const currentTask = (await getDoc(taskDocRef)).data()

  const assignedUserCollection = collection(db, `users/${currentTask.assignedToId}/tasks`)
  const createdByUserCollection = collection(db, `users/${currentTask.createdById}/tasks`)

  await Promise.all([
    deleteDoc(doc(assignedUserCollection, taskId)),
    deleteDoc(doc(createdByUserCollection, taskId))
  ])
}

function createNewTask() {
  const usersStore = useUsersStore()
  const tasksStore = useTasksStore()

  const userTasksCollection = collection(db, `users/${usersStore.userId}/tasks`)

  addDoc(userTasksCollection, {
    ...tasksStore.newTask,
    creationTime: Date.now(),
    createdById: usersStore.userId,
    createdByUsername: usersStore.userUsername,
    assignedToId: usersStore.userId,
    assignedToUsername: usersStore.userUsername
  })
  tasksStore.newTask.name = ''
  tasksStore.newTask.description = ''
  tasksStore.newTask.endDate = ''
}

async function login(details) {
  const { email, password } = details

  await signInWithEmailAndPassword(auth, email, password)
}

async function signup(details) {
  const { email, password, username, jobTitle } = details

  await createUserWithEmailAndPassword(auth, email, password)
  const userDocRef = doc(db, 'users', auth.currentUser.uid)

  await setDoc(userDocRef, {
    username,
    jobTitle
  })
}

async function logout() {
  await signOut(auth)
}

export {
  fetchTasks,
  fetchTeamMembers,
  fetchUser,
  addTaskInProgress,
  completeTask,
  assignTask,
  editTask,
  deleteTask,
  createNewTask,
  login,
  signup,
  logout
}
