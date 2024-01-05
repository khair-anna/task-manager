<template>
  <div class="ml-64 mt-20 mb-40 px-5">
    <h1 class="text-3xl mb-8">{{ $t('titles.tasksLength') }} {{ tasksStore.tasksAll.length }}</h1>
    <TasksHome />
  </div>
  <div class="ml-64 px-5">
    <h1 class="text-3xl mb-8">{{ $t('titles.teamLength') }} {{ usersStore.teamMembers.length }}</h1>
    <TeamHome />
  </div>
</template>
<script setup>
import { useTasksStore } from '../stores/TasksStore'
import { useUsersStore } from '../stores/UsersStore'
import TasksHome from './TasksHome.vue'
import TeamHome from './TeamHome.vue'

const usersStore = useUsersStore()
const tasksStore = useTasksStore()

await new Promise((res) => setTimeout(res, 500))
</script>
