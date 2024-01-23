<template>
  <div class="bg-white dark:bg-dark-bg-black lg:px-32 sm:text-lg w-full fixed top-0 left-0">
    <nav class="flex justify-between p-5">
      <router-link :to="{ name: 'home' }" class="flex gap-3 items-center">
        <img src="/svg/logo.svg" alt="logo" class="sm:w-7 w-5" />
        <span class="sm:text-2xl tracking-widest">TASKIE</span>
      </router-link>
      <div class="flex gap-5 sm:gap-11 items-center">
        <div class="hidden sm:block">
          <button class="p-3 border-r-2" @click="switchUa">UA</button>
          <button class="p-3" @click="switchEn">EN</button>
        </div>
        <button @click="toggleDark()" class="hidden sm:block">
          <img src="/svg/sun.svg" alt="sun" v-if="isDark" />
          <img src="/svg/moon.svg" alt="moon" v-else class="w-7 h-7" />
        </button>
        <router-link :to="{ name: 'login' }" class="p-2 hover:opacity-70 underline">
          {{ $t('buttons.logIn') }}
        </router-link>
        <router-link
          :to="{ name: 'signup' }"
          class="flex justify-center items-center gap-5 text-white h-10 bg-black dark:bg-white dark:text-black px-2 rounded-lg hover:bg-blue-600 hover:text-black dark:hover:hover:bg-blue-600 dark:hover:text-black"
        >
          {{ $t('buttons.getStarted') }}
        </router-link>
      </div>
    </nav>
  </div>
  <div class="h-screen pt-52 w-96 m-auto text-center">
    <h1 class="text-5xl mb-6">{{ $t('titles.titleHome') }}</h1>
    <span class="block text-lg mb-6">{{ $t('texts.textHome') }}</span>
    <router-link
      :to="{ name: 'signup' }"
      class="flex justify-center items-center gap-5 text-white text-lg bg-black p-2 rounded-lg hover:bg-blue-600 hover:text-black w-40 m-auto"
    >
      {{ $t('buttons.getStarted') }}
    </router-link>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { locale } = useI18n({ useScope: 'global' })

const switchUa = () => {
  locale.value = 'ua'
  localStorage.setItem('lang', locale.value)
}
const switchEn = () => {
  locale.value = 'en'
  localStorage.setItem('lang', locale.value)
}
</script>
