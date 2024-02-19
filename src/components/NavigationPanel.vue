<template>
  <div
    class="w-64 h-screen fixed top-0 z-50 bg-white dark:bg-dark-bg-black flex flex-col justify-around"
  >
    <button class="pl-6" @click="toogleNav">
      <img src="/svg/close-white.svg" alt="close-white" v-if="isDark" />
      <img src="/svg/close.svg" alt="close" v-else />
    </button>
    <div class="flex flex-col gap-5 text-lg">
      <router-link :to="{ name: 'home' }" class="nav" @click="toogleNav">
        <img src="/svg/home-white.svg" alt="home-white" v-if="isDark" />
        <img src="/svg/home.svg" alt="home" v-else />
        {{ $t('sidebar.home') }}
      </router-link>
      <router-link :to="{ name: 'tasks' }" class="nav" @click="toogleNav">
        <img src="/svg/task-white.svg" alt="task-white" v-if="isDark" />
        <img src="/svg/task.svg" alt="task" v-else />
        {{ $t('sidebar.tasks') }}
      </router-link>
      <router-link :to="{ name: 'team' }" class="nav" @click="toogleNav">
        <img src="/svg/team-white.svg" alt="team-white" v-if="isDark" />
        <img src="/svg/team.svg" alt="team" v-else />
        {{ $t('sidebar.team') }}
      </router-link>
    </div>
    <div>
      <router-link to="" class="nav text-xl" @click="logout">
        <LoadingSpinner v-if="isLoading" />
        <div v-else>
          <img src="/svg/logout-white.svg" alt="logout-white" class="w-7 h-7" v-if="isDark" />
          <img src="/svg/logout.svg" alt="logout" class="w-7 h-7" v-else />
        </div>
        <span>{{ $t('sidebar.logOut') }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
import LoadingSpinner from './LoadingSpinner.vue'
import { useLogout } from '../mutations/logout'

defineProps({
  toogleNav: Function
})
const isDark = useDark()

const { mutateAsync, isLoading } = useLogout()

const logout = () => {
  mutateAsync()
}
</script>
