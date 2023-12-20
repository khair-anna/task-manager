<template>
  <div>
    <LayoutDefault v-if="usersStore.currentUser">
      <div class="ml-64 mt-20 mb-40 px-5">
        <h1 class="text-3xl mb-8">
          {{ $t('titles.tasksLength') }} {{ tasksStore.tasksAll.length }}
        </h1>
        <router-link :to="{ name: 'tasks' }" class="flex [&>*:first-child]:ml-0">
          <div
            class="h-48 w-64 -ml-16 border border-light-gray border-l-4 border-l-zinc-400 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3"
            v-for="task in tasksStore.tasksAll"
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
      </div>
      <div class="ml-64 px-5">
        <h1 class="text-3xl mb-8">
          {{ $t('titles.teamLength') }} {{ usersStore.teamMembers.length }}
        </h1>
        <router-link :to="{ name: 'team' }" class="flex [&>*:first-child]:ml-0">
          <div
            v-for="member in usersStore.teamMembers"
            :key="member.uid"
            class="-ml-20 border-2 border-emerald-500 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3"
          >
            <div class="flex justify-between items-center">
              <span class="block mb-6">{{ member.username }}</span>
              <img
                :src="`/svg/avatars/${randomInteger(1, 10)}-avatar.svg`"
                alt="avatar"
                class="w-12"
              />
            </div>
            <span class="block text-sm text-light-gray">{{ member.jobTitle }}</span>
          </div>
        </router-link>
      </div>
    </LayoutDefault>
    <HomeDefault v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import LayoutDefault from '../components/LayoutDefault.vue'
import HomeDefault from '../components/HomeDefault.vue'
import { useUsersStore } from '../stores/UsersStore'
import { useTasksStore } from '../stores/TasksStore'

const usersStore = useUsersStore()
const tasksStore = useTasksStore()

onMounted(() => {
  usersStore.getTeamMembers()
})

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}
</script>
