<script setup>
import { useUsersStore } from './stores/UsersStore'

const usersStore = useUsersStore()

usersStore.fetchUser()
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
