import { defineStore } from 'pinia'
import router from '../router'
import { auth, db } from '../firebase'
import { useQuery } from 'vue-query'
import { ref } from 'vue'
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { useTasksStore } from './TasksStore'

export const useUsersStore = defineStore('usersStore', () => {
  const tasksStore = useTasksStore()
  const currentUser = ref(null)

  const setUser = (user) => {
    currentUser.value = user
  }

  const clearUser = () => {
    currentUser.value = null
  }

  const userTasksCollection = ref(null)

  const teamMembers = ref([])

  // const login = async (details) => {
  //   const { email, password } = details
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password)
  //     const userDocRef = doc(db, 'users', auth.currentUser.uid)
  //     const userDoc = await getDoc(userDocRef)

  //     setUser({
  //       uid: auth.currentUser.uid,
  //       email: auth.currentUser.email,
  //       username: userDoc.data().username,
  //       jobTitle: userDoc.data().jobTitle
  //     })

  //     userTasksCollection.value = collection(db, `users/${auth.currentUser.uid}/tasks`)
  //   } catch (error) {
  //     switch (error.code) {
  //       case 'auth/user-not-found':
  //         alert('User not found')
  //         break
  //       case 'auth/wrong-password':
  //         alert('Wrong password')
  //         break
  //       case 'auth/invalid-login-credentials':
  //         alert('Invalid login credentials')
  //         break
  //       default:
  //         alert(error.message)
  //     }
  //     return
  //   }

  //   router.push('/')
  // }

  // const signup = async (details) => {
  //   const { email, password, username, jobTitle } = details
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password)
  //     const userDocRef = doc(db, 'users', auth.currentUser.uid)
  //     userTasksCollection.value = collection(db, `users/${auth.currentUser.uid}/tasks`)

  //     await setDoc(userDocRef, {
  //       username,
  //       jobTitle
  //     })

  //     const userDoc = await getDoc(userDocRef)

  //     setUser({
  //       uid: auth.currentUser.uid,
  //       email: auth.currentUser.email,
  //       username: userDoc.data().username,
  //       jobTitle: userDoc.data().jobTitle
  //     })
  //   } catch (error) {
  //     switch (error.code) {
  //       case 'auth/email-already-in-use':
  //         alert('Email already in use')
  //         break
  //       case 'auth/invalid-email':
  //         alert('Invalid email')
  //         break
  //       case 'auth/operation-not-allowed':
  //         alert('Operation not allowed')
  //         break
  //       case 'auth/weak-password':
  //         alert('Weak password')
  //         break
  //       default:
  //         alert(error.message)
  //     }
  //     return
  //   }

  //   router.push('/')
  // }

  // const logout = async () => {
  //   await signOut(auth)
  //   clearUser()
  //   router.push('/')
  // }

  const fetchUser = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        clearUser()
      } else {
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        const userDoc = await getDoc(userDocRef)

        setUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          username: userDoc.data().username,
          jobTitle: userDoc.data().jobTitle
        })
        userTasksCollection.value = collection(db, `users/${auth.currentUser.uid}/tasks`)

        await tasksStore.loadTasks.refetch()

        if (router.isReady && router.currentRoute.value.path === '/login') {
          router.push('/')
        }
      }
    })

    router.push('/')
  }

  // const getTeamMembers = async () => {
  //   try {
  //     const usersCollection = collection(db, 'users')
  //     const querySnapshot = await getDocs(usersCollection)

  //     teamMembers.value = querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }))
  //     // .filter((member) => member.uid !== auth.currentUser.uid)

  //     const teamCollection = collection(db, `users/${auth.currentUser.uid}/team`)

  //     await deleteCollection(teamCollection)

  //     for (const member of teamMembers.value) {
  //       await addDoc(teamCollection, member)
  //     }
  //   } catch (error) {
  //     console.error('Error getting team members:', error)
  //   }
  // }

  const getTeamMembers = useQuery(
    'getTeamMembers',
    async () => {
      const usersCollection = collection(db, 'users')
      const querySnapshot = await getDocs(usersCollection)
      const teamMembersData = querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }))
      return teamMembersData
    },
    {
      onSuccess: (data) => {
        teamMembers.value = data

        const teamCollection = collection(db, `users/${auth.currentUser.uid}/team`)
        deleteCollection(teamCollection)
        data.forEach(async (member) => {
          await addDoc(teamCollection, member)
        })
      },
      onError: (error) => {
        console.error('Error getting team members:', error)
      }
    }
  )

  const deleteCollection = async (collectionRef) => {
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
  }

  return {
    currentUser,
    userTasksCollection,
    teamMembers,
    setUser,
    clearUser,
    fetchUser,
    getTeamMembers
  }
})

// Invite a member, confirm and cancel request

// const getUserIdByUsername = async (username) => {
//   try {
//     const usersCollection = collection(db, 'users')
//     const querySnapshot = await getDocs(query(usersCollection, where('username', '==', username)))

//     if (!querySnapshot.empty) {
//       const user = querySnapshot.docs[0]
//       return user.id
//     } else {
//       return null
//     }
//   } catch (error) {
//     console.error('Error getting user by email:', error)
//     return null
//   }
// }

// const sendTeamRequest = async (senderId, recipientUsername) => {
//   try {
//     const recipientId = await getUserIdByUsername(recipientUsername)

//     if (recipientId) {
//       const requestDocRef = await addDoc(collection(db, 'teamMembers'), {
//         senderId,
//         recipientId,
//         status: 'pending',
//         senderUsername: currentUser.value.username,
//         recipientUsername
//       })
//       console.log('Reqest was sent to:', recipientId)
//       return requestDocRef.id
//     } else {
//       alert('Recipient not found by username:', recipientUsername)
//     }
//   } catch (error) {
//     console.error('Error sending team request:', error)
//   }
// }

// const confirmTeamRequest = async (requestId) => {
//   try {
//     const requestDocRef = doc(db, 'teamMembers', requestId)
//     const requestDoc = await getDoc(requestDocRef)

//     if (requestDoc.exists()) {
//       const request = requestDoc.data()

//       if (request.status === 'pending') {
//         await updateDoc(requestDocRef, { status: 'approved' })
//         console.log('Team request confirmed and user added to the team.')
//       }
//     } else {
//       console.error('Team request not found or already confirmed.')
//     }
//   } catch (error) {
//     console.error('Error confirming team request:', error)
//   }
// }

// const cancelTeamRequest = async (requestId) => {
//   try {
//     const requestDocRef = doc(db, 'teamMembers', requestId)
//     const requestDoc = await getDoc(requestDocRef)

//     if (requestDoc.exists()) {
//       const request = requestDoc.data()

//       if (request.status === 'pending') {
//         await updateDoc(requestDocRef, { status: 'declined' })
//         console.log('Team request declined to add user to the team.')
//       }
//     } else {
//       console.error('Team request not found or already confirmed.')
//     }
//   } catch (error) {
//     console.error('Error declining team request:', error)
//   }
// }

// const getTeamMembers = async (userId) => {
//   try {
//     const teamMembersCollection = collection(db, 'teamMembers')
//     const querySnapshot = await getDocs(
//       query(teamMembersCollection, where('senderId', '==', userId))
//     )

//     const teamMembers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

//     return teamMembers
//   } catch (error) {
//     console.error('Error getting team members:', error)
//     return []
//   }
// }

// const getPendingTeamRequests = async (recipientId) => {
//   try {
//     const teamMembersCollection = collection(db, 'teamMembers')

//     const querySnapshot = await getDocs(
//       query(
//         teamMembersCollection,
//         where('recipientId', '==', recipientId),
//         where('status', '==', 'pending')
//       )
//     )
//     const pendingRequests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//     console.log(pendingRequests)
//     return pendingRequests
//   } catch (error) {
//     console.error('Error getting pending team requests:', error)
//   }
// }
