<template>
  <div>
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <Teleport to="body">
        <Notification
          v-for="alert in alertsStore.alerts"
          :key="alert.id"
          class="fixed top-4 right-8 w-2/4"
          :intent="alert.type"
          :title="alert.title"
          :on-dismiss="() => alertsStore.alerts.shift()"
        />
      </Teleport>
    </transition>
    <LoadingScreen v-if="isLoading" />
    <router-view v-else />
  </div>
</template>

<script setup>
import useUserQuery from './queries/userQuery'
import LoadingScreen from './components/LoadingScreen.vue'
import Notification from './components/NotificationDefault.vue'
import { useAlertsStore } from './stores/alerts'

const alertsStore = useAlertsStore()
console.log(alertsStore.alerts.length)

const { isLoading } = useUserQuery()
console.log(`isLoading is ${isLoading.value}`)
</script>
