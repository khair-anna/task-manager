<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="signup(signupForm)" class="flex flex-col gap-5">
      <input
        type="text"
        name="name"
        :placeholder="$t('placeholders.username')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.username"
      />
      <span
        v-for="error in v$.username.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
        >{{ error.$message }}</span
      >
      <input
        name="email"
        :placeholder="$t('placeholders.email')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.email"
      />
      <span
        v-for="error in v$.email.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
        >{{ error.$message }}</span
      >
      <input
        name="password"
        type="password"
        :placeholder="$t('placeholders.createPassword')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.password"
      />
      <span
        v-for="error in v$.password.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
        >{{ error.$message }}</span
      >
      <input
        name="password"
        type="password"
        :placeholder="$t('placeholders.confirmPassword')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.confirmPassword"
      />
      <span
        v-for="error in v$.confirmPassword.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
        >{{ error.$message }}</span
      >
      <label class="dark:text-zinc-400">{{ $t('texts.selectJob') }}</label>
      <select v-model="signupForm.jobTitle" class="dark:bg-dark-bg-black">
        <option disabled>{{ $t('texts.selectJob') }}</option>
        <option v-for="(jobTitle, index) in jobTitles" :key="index">{{ jobTitle }}</option>
      </select>
      <span
        v-for="error in v$.jobTitle.$errors"
        :key="error.$uid"
        class="text-sm text-red-600 -mt-5"
        >{{ error.$message }}</span
      >
      <button
        type="submit"
        class="border-2 rounded-lg mx-auto text-xl bg-main-blue py-1 px-2 text-black dark:text-zinc-200 dark:border-0"
      >
        <!-- :disabled="!isFormValid" -->
        <!-- :class="{ 'opacity-70': !isFormValid }" -->
        {{ $t('buttons.signUp') }}
      </button>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textSignUp') }}</span>
      <router-link :to="{ name: 'login' }" class="underline text-lg dark:text-zinc-300">{{
        $t('buttons.logIn')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import router from '../router'
import useValidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'

import { useUsersStore } from '../stores/UsersStore'

const jobTitles = ref([
  'BackEnd developer',
  'FrontEnd developer',
  'HR manager',
  'Office manager',
  'Project Manager',
  'Security specialist',
  'UI/UX'
])

const signupForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  jobTitle: ''
})

const rules = computed(() => {
  return {
    username: { required, minLength: minLength(4) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs(signupForm.password) },
    jobTitle: { required }
  }
})

const v$ = useValidate(rules, signupForm)

const usersStore = useUsersStore()

const signup = async (details) => {
  const result = await v$.value.$validate()
  if (result) {
    const { email, password, username, jobTitle } = details
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const userDocRef = doc(db, 'users', auth.currentUser.uid)
      usersStore.userTasksCollection = collection(db, `users/${auth.currentUser.uid}/tasks`)

      await setDoc(userDocRef, {
        username,
        jobTitle
      })

      const userDoc = await getDoc(userDocRef)

      usersStore.setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        username: userDoc.data().username,
        jobTitle: userDoc.data().jobTitle
      })
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Email already in use')
          break
        case 'auth/invalid-email':
          alert('Invalid email')
          break
        case 'auth/operation-not-allowed':
          alert('Operation not allowed')
          break
        case 'auth/weak-password':
          alert('Weak password')
          break
        default:
          console.log(error.message)
      }
      return
    }
    router.push('/')
  }
}
</script>
