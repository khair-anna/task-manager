<template>
  <div class="ml-64 color px-10 pt-10 flex items-center justify-end">
    <div class="flex items-center gap-6">
      <div>
        <button class="p-3 border-r-2" @click="switchUa">UA</button>
        <button class="p-3" @click="switchEn">EN</button>
      </div>
      <button @click="toggleDark()">
        <img src="/svg/sun.svg" alt="sun" v-if="isDark" />
        <img src="/svg/moon.svg" alt="moon" v-else class="w-7 h-7" />
      </button>
      <router-link to=""
        ><img :src="`./svg/avatars/${randomInteger(1, 10)}-avatar.svg`" class="w-10" alt="user"
      /></router-link>
      <div class="flex flex-col" v-if="usersStore.currentUser">
        <router-link to="">{{ usersStore.currentUser.username }}</router-link>
        <router-link to="" class="text-light-gray">{{
          usersStore.currentUser.jobTitle
        }}</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUsersStore } from '../stores/UsersStore'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

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
