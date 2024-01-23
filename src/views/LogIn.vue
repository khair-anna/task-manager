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
        class="flex space-x-3 border-2 rounded-lg mx-auto text-xl bg-main-blue py-1 px-2 text-black dark:text-zinc-200 dark:border-0"
        :disabled="isLoading"
      >
        <LoadingSpinner v-if="isLoading" />
        <span> {{ $t('buttons.logIn') }}</span>
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
import { useLogin } from '../mutations/login'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const loginForm = ref({})

const { mutateAsync, isLoading } = useLogin()

const login = (details) => {
  mutateAsync(details)
}
</script>
