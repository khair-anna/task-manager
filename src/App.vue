<script setup>
import { useUsersStore } from './stores/UsersStore'
import { onBeforeMount } from 'vue'

const usersStore = useUsersStore()
onBeforeMount(() => {
  usersStore.fetchUser()
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
