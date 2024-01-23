// const fetchUser = () => {
//   auth.onAuthStateChanged(async (user) => {
//     if (user === null) {
//       clearUser()
//     } else {
//       const userDocRef = doc(db, 'users', auth.currentUser.uid)
//       const userDoc = await getDoc(userDocRef)

//       setUser({
//         uid: auth.currentUser.uid,
//         email: auth.currentUser.email,
//         username: userDoc.data().username,
//         jobTitle: userDoc.data().jobTitle
//       })
//       userTasksCollection.value = collection(db, `users/${auth.currentUser.uid}/tasks`)

//       if (router.isReady && router.currentRoute.value.path === '/login') {
//         router.push('/')
//       }
//     }
//   })

//   router.push('/')
// }

import { defineStore } from 'pinia'
import { computed } from 'vue'
import useUserQuery from '../queries/userQuery'

export const useUsersStore = defineStore('usersStore', () => {
  const { data: user } = useUserQuery()

  const userId = computed(() => user.value?.uid)
  const userUsername = computed(() => user.value?.username)
  const userJobTitle = computed(() => user.value?.jobTitle)

  return {
    userId,
    userUsername,
    userJobTitle
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
