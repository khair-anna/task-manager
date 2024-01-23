<template>
  <router-link :to="{ name: 'team' }" class="flex [&>*:first-child]:ml-0 overflow-x-auto">
    <div
      v-for="member in data"
      :key="member.uid"
      class="-ml-20 border-2 border-emerald-500 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3"
    >
      <div class="flex justify-between items-center">
        <span class="block mb-6 w-40">{{ member.username }}</span>
        <img :src="`./svg/avatars/${randomInteger(1, 10)}-avatar.svg`" alt="avatar" class="w-12" />
      </div>
      <span class="block text-sm text-light-gray">{{ member.jobTitle }}</span>
    </div>
  </router-link>
</template>
<script setup>
import getTeamMembers from '../queries/getTeamMembers'

const { data } = getTeamMembers()

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
</script>
