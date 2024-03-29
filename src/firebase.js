// // Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD928PKQ1qbAHTlCaFUBHks0zDqQ7ip7GE',
  authDomain: 'task-manager-5fa7b.firebaseapp.com',
  projectId: 'task-manager-5fa7b',
  storageBucket: 'task-manager-5fa7b.appspot.com',
  messagingSenderId: '609503697743',
  appId: '1:609503697743:web:fcc2fc3d977191b361833a'
}

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCXFpdy4K9yR8nN1b7cW7LTbwXEo2VMm3A',
//   authDomain: 'task-manager-f0b2e.firebaseapp.com',
//   projectId: 'task-manager-f0b2e',
//   storageBucket: 'task-manager-f0b2e.appspot.com',
//   messagingSenderId: '744939475621',
//   appId: '1:744939475621:web:4ec219d05dd7543a5fb34c'
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
