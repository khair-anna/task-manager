import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('usersStore', () => {
  const currentUser = ref(null)

  const setUser = (user) => {
    currentUser.value = user
  }

  const clearUser = () => {
    currentUser.value = null
  }

  const userTasksCollection = ref(null)

  return {
    currentUser,
    userTasksCollection,
    setUser,
    clearUser
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
