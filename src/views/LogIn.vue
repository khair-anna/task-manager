<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="login(loginForm)" class="flex flex-col gap-5">
      <input
        name="email"
        type="email"
        :placeholder="$t('placeholders.email')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="loginForm.email"
      />
      <input
        name="password"
        type="password"
        :placeholder="$t('placeholders.password')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="loginForm.password"
      />
      <button
        type="submit"
        class="border-2 rounded-lg mx-auto text-xl bg-main-blue py-1 px-2 text-black dark:text-zinc-200 dark:border-0"
      >
        <!-- :class="{ 'opacity-70': !isFormValid }"
        :disabled="!isFormValid" -->
        {{ $t('buttons.logIn') }}
      </button>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textLogIn') }}</span>
      <router-link :to="{ name: 'signup' }" class="underline text-lg dark:text-zinc-300">{{
        $t('buttons.signUp')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import router from '../router'

import { useUsersStore } from '../stores/UsersStore'

const loginForm = ref({})

// const isFormValid = computed(() => {
//   const { email, password } = loginForm.value
//   return email && password
// })

const usersStore = useUsersStore()

const login = async (details) => {
  const { email, password } = details
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const userDocRef = doc(db, 'users', auth.currentUser.uid)
    const userDoc = await getDoc(userDocRef)

    usersStore.setUser({
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      username: userDoc.data().username,
      jobTitle: userDoc.data().jobTitle
    })

    usersStore.userTasksCollection = collection(db, `users/${auth.currentUser.uid}/tasks`)
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found':
        alert('User not found')
        break
      case 'auth/wrong-password':
        alert('Wrong password')
        break
      case 'auth/invalid-login-credentials':
        alert('Invalid login credentials')
        break
      default:
        console.log(error.message)
    }
    return
  }

  router.push('/')
}
</script>
