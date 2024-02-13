import { defineStore } from 'pinia'
import { computed } from 'vue'
import useUserQuery from '../queries/userQuery'

export const useUsersStore = defineStore('usersStore', () => {
  const { data: user } = useUserQuery()

  const userId = computed(() => user.value?.uid)
  const userUsername = computed(() => user.value?.username)
  const userJobTitle = computed(() => user.value?.jobTitle)

  return {
    userId,
    userUsername,
    userJobTitle
  }
})
