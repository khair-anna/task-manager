<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="signup" class="flex flex-col gap-5">
      <input
        type="text"
        :placeholder="$t('placeholders.username')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.username"
      />
      <input
        type="email"
        :placeholder="$t('placeholders.email')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.email"
      />
      <input
        type="password"
        :placeholder="$t('placeholders.createPassword')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="signupForm.password"
      />
      <label class="dark:text-zinc-400">{{ $t('texts.selectJob') }}</label>
      <select v-model="signupForm.jobTitle" class="dark:bg-dark-bg-black">
        <option disabled>{{ $t('texts.selectJob') }}</option>
        <option>BackEnd developer</option>
        <option>FrontEnd developer</option>
        <option>HR manager</option>
        <option>Office manager</option>
        <option>Project Manager</option>
        <option>Security specialist</option>
        <option>UI/UX</option>
      </select>
      <button type="submit" class="underline text-xl dark:text-dark-bg-black">
        {{ $t('buttons.signUp') }}
      </button>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textSignUp') }}</span>
      <router-link :to="{ name: 'login' }" class="underline text-lg dark:text-dark-bg-black">{{
        $t('buttons.logIn')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/UsersStore'

const signupForm = ref({})

const usersStore = useUsersStore()

const signup = () => {
  usersStore.signup(signupForm.value)
}
</script>
