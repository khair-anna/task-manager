<template>
  <div class="ml-64 mt-20 mb-40 px-5">
    <h1 class="text-3xl mb-8">{{ $t('titles.tasksLength') }} {{ data?.length }}</h1>
    <TasksHome />
  </div>
  <div class="ml-64 px-5">
    <h1 class="text-3xl mb-8">{{ $t('titles.teamLength') }} {{ teamData?.length }}</h1>
    <TeamHome />
  </div>
</template>
<script setup>
import TasksHome from './TasksHome.vue'
import TeamHome from './TeamHome.vue'
import loadTasks from '../queries/loadTasks'
import getTeamMembers from '../queries/getTeamMembers'

const { data } = loadTasks()
const { data: teamData } = getTeamMembers()
</script>
