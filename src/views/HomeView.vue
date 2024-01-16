<template>
  <div>
    <LayoutDefault v-if="usersStore.currentUser">
      <HomeMainSceleton v-if="isLoading" />
      <HomeMain v-else />
    </LayoutDefault>
    <HomeDefault v-else />
  </div>
</template>

<script setup>
import LayoutDefault from '../components/LayoutDefault.vue'
import HomeDefault from '../components/HomeDefault.vue'
import HomeMain from '../components/HomeMain.vue'
import HomeMainSceleton from '../components/sceleton/HomeMainSceleton.vue'
import { useUsersStore } from '../stores/UsersStore'

import loadTasks from '../queries/loadTasks'

const { isLoading } = loadTasks()

const usersStore = useUsersStore()
</script>
