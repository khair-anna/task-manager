<template>
  <div>
    <div class="sm:mt-20 mt-10 mb-10 sm:mb-40 sm:px-5 pl-5">
      <h1 class="text-3xl mb-8">{{ $t('titles.tasksLength') }} {{ data?.length }}</h1>
      <TasksHome />
    </div>
    <div class="sm:px-5 pl-5">
      <h1 class="text-3xl mb-8">{{ $t('titles.teamLength') }} {{ teamData?.length }}</h1>
      <TeamHome />
    </div>
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
