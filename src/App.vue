<template>
  <div>
    <Teleport to="body">
      <transition-group
        tag="div"
        name="fade"
        class="space-y-4 fixed z-[2147483647] top-16 right-4 w-96"
      >
        <Notification
          v-for="alert in alertsStore.alerts"
          :key="alert.id"
          :intent="alert.type"
          :title="alert.title"
          :on-dismiss="() => alertsStore.alerts.shift()"
        />
      </transition-group>
    </Teleport>
    <LoadingScreen v-if="isLoading" />
    <router-view v-else />
  </div>
</template>

<script setup>
import useUserQuery from './queries/userQuery'
import LoadingScreen from './components/LoadingScreen.vue'
import Notification from './components/NotificationDefault.vue'
import { useAlertsStore } from './stores/alerts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useQueryClient } from 'vue-query'

const auth = getAuth()
const queryClient = useQueryClient()

onAuthStateChanged(auth, () => {
  queryClient.invalidateQueries('user')
})

const alertsStore = useAlertsStore()

const { isLoading } = useUserQuery()
</script>
