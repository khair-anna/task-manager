<template>
  <div class="ml-64 p-5" v-if="usersStore.teamMembers.length !== 0">
    <div class="flex items-center gap-14 mb-8">
      <h2 class="text-2xl">{{ $t('titles.team') }}</h2>
      <span
        class="flex justify-center items-center w-10 h-10 rounded-lg border border-emerald-500 bg-emerald-200 dark:bg-emerald-900"
        >{{ usersStore.teamMembers.length }}</span
      >
    </div>
    <div
      v-for="member in usersStore.teamMembers"
      :key="member.uid"
      class="border-2 border-emerald-500 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3 mb-5"
    >
      <div class="flex justify-between items-center">
        <span class="block mb-6">{{ member.username }}</span>
        <img :src="`/svg/avatars/${randomInteger(1, 10)}-avatar.svg`" alt="avatar" class="w-12" />
      </div>
      <span class="block text-sm text-light-gray">{{ member.jobTitle }}</span>
    </div>
  </div>
  <div class="ml-72 text-3xl" v-else>
    <h2>{{ $t('titles.noTeam') }}</h2>
  </div>
</template>
<script setup>
import { useUsersStore } from '../stores/UsersStore'

const usersStore = useUsersStore()

usersStore.getTeamMembers.refetch()

await new Promise((res) => setTimeout(res, 500))

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
</script>
