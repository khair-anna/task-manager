<template>
  <router-link :to="{ name: 'tasks' }" class="flex [&>*:first-child]:ml-0">
    <div
      class="h-48 w-64 -ml-16 border border-light-gray border-l-4 border-l-zinc-400 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3"
      v-for="task in data"
      :key="task.id"
    >
      <div>
        <span class="block text-2xl mb-3">{{ task.name }}</span>
        <span class="block break-words mb-7">{{ task.description }}</span>
        <span class="block mb-3"
          >{{ $t('tasks.createdBy') }}
          <span class="py-1 px-3 rounded-2xl bg-emerald-400 dark:bg-emerald-900 text-sm">{{
            task.createdByUsername
          }}</span></span
        >
        <span class="block"
          >{{ $t('tasks.assignedTo') }}
          <span
            class="py-1 px-3 rounded-2xl text-sm"
            :class="[
              {
                'bg-emerald-400': task.assignedToId === usersStore.currentUser.uid,
                'dark:bg-emerald-900': task.assignedToId === usersStore.currentUser.uid,
                'bg-lime-300': task.assignedToId !== usersStore.currentUser.uid,
                'dark:bg-lime-800': task.assignedToId !== usersStore.currentUser.uid
              }
            ]"
            >{{ task.assignedToUsername }}</span
          ></span
        >
      </div>
    </div>
  </router-link>
</template>
<script setup>
import { useUsersStore } from '../stores/UsersStore'
import loadTasks from '../queries/loadTasks'

const { data } = loadTasks()
const usersStore = useUsersStore()
</script>
