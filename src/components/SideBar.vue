<template>
  <div
    class="w-64 h-screen fixed bg-white dark:bg-dark-bg-black flex flex-col justify-between py-20"
  >
    <router-link :to="{ name: 'home' }" class="flex items-center gap-5 pl-6">
      <img src="/svg/logo.svg" alt="logo" />
      <span class="text-2xl tracking-widest">TASKIE</span>
    </router-link>
    <div class="flex flex-col gap-5 text-lg">
      <router-link :to="{ name: 'home' }" class="nav">
        <img src="/svg/home-white.svg" alt="home-white" v-if="isDark" />
        <img src="/svg/home.svg" alt="home" v-else />
        {{ $t('sidebar.home') }}
      </router-link>
      <router-link :to="{ name: 'tasks' }" class="nav">
        <img src="/svg/task-white.svg" alt="task-white" v-if="isDark" />
        <img src="/svg/task.svg" alt="task" v-else />
        {{ $t('sidebar.tasks') }}
      </router-link>
      <router-link :to="{ name: 'team' }" class="nav">
        <img src="/svg/team-white.svg" alt="team-white" v-if="isDark" />
        <img src="/svg/team.svg" alt="team" v-else />
        {{ $t('sidebar.team') }}
      </router-link>
      <!-- <router-link to="" class="nav">
        <img src="/svg/settings-white.svg" alt="settings-white" v-if="isDark" />
        <img src="/svg/settings.svg" alt="settings" v-else />
        {{ $t('sidebar.settings') }}
      </router-link> -->
    </div>
    <div>
      <router-link to="" class="nav text-xl" @click="logout">
        <img src="/svg/logout-white.svg" alt="logout-white" class="w-7 h-7" v-if="isDark" />
        <img src="/svg/logout.svg" alt="logout" class="w-7 h-7" v-else />
        {{ $t('sidebar.logOut') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'

import { useLogout } from '../mutations/logout'

const isDark = useDark()

const { mutateAsync } = useLogout()

const logout = () => {
  mutateAsync()
}
</script>
