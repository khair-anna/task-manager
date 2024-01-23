<template>
  <div>
    <div
      class="sm:px-10 px-5 sm:pt-10 sm:pb-5 py-5 flex items-center justify-between xl:justify-end border-b xl:border-0"
    >
      <div class="xl:hidden flex gap-8 items-center">
        <button @click="toogleNav">
          <img src="/svg/nav-white.svg" alt="nav" v-if="isDark" />
          <img src="/svg/nav.svg" alt="nav" v-else />
        </button>
        <router-link :to="{ name: 'home' }" class="flex items-center gap-5 xl:hidden">
          <img src="/svg/logo.svg" alt="logo" class="md:w-7 w-5" />
          <span class="md:text-2xl tracking-widest">TASKIE</span>
        </router-link>
      </div>
      <div class="flex items-center gap-6">
        <div class="hidden sm:block">
          <button class="p-3 border-r-2" @click="switchUa">UA</button>
          <button class="p-3" @click="switchEn">EN</button>
        </div>
        <button @click="toggleDark()" class="hidden sm:block">
          <img src="/svg/sun.svg" alt="sun" v-if="isDark" />
          <img src="/svg/moon.svg" alt="moon" v-else class="w-7 h-7" />
        </button>
        <router-link to=""
          ><img :src="`./svg/avatars/${randomInteger(1, 10)}-avatar.svg`" class="w-10" alt="user"
        /></router-link>
        <div class="sm:flex flex-col hidden">
          <router-link to="">{{ usersStore.userUsername }}</router-link>
          <router-link to="" class="text-light-gray">{{ usersStore.userJobTitle }}</router-link>
        </div>
      </div>
    </div>
    <transition name="fade">
      <NavigationPanel v-if="isNavOpen" :toogleNav="toogleNav" />
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/UsersStore'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'

import NavigationPanel from './NavigationPanel.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const isNavOpen = ref(false)

const toogleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const usersStore = useUsersStore()

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

const { locale } = useI18n({ useScope: 'global' })

const switchUa = () => {
  locale.value = 'ua'
}
const switchEn = () => {
  locale.value = 'en'
}
</script>
