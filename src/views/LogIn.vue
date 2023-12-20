<template>
  <div class="pl-32 pt-7">
    <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
  </div>
  <div class="flex flex-col items-center justify-center h-screen -mt-7">
    <form @submit.prevent="login" class="flex flex-col gap-5">
      <input
        type="email"
        :placeholder="$t('placeholders.email')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="loginForm.email"
      />
      <input
        type="password"
        :placeholder="$t('placeholders.password')"
        class="h-10 w-80 rounded-lg p-3 dark:bg-dark-bg-black"
        v-model="loginForm.password"
      />
      <button type="submit" class="underline text-xl dark:text-dark-bg-black">
        {{ $t('buttons.logIn') }}
      </button>
    </form>
    <div class="mt-10 block text-center">
      <span class="block pb-3 dark:text-zinc-400">{{ $t('texts.textLogIn') }}</span>
      <router-link :to="{ name: 'signup' }" class="underline text-lg dark:text-dark-bg-black">{{
        $t('buttons.signUp')
      }}</router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/UsersStore'

const loginForm = ref({})
const usersStore = useUsersStore()

const login = () => {
  usersStore.login(loginForm.value)
}
</script>
