import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertsStore = defineStore('alertsStore', () => {
  const alerts = ref([])

  const addNotification = (type, title) => {
    let alertTitle = title

    if (!alertTitle) {
      alertTitle =
        type === 'error'
          ? 'Something went wrong, please try again later'
          : 'Your data has been successfully saved!'
    }

    alerts.value.push({
      id: new Date().getTime(),
      title: alertTitle,
      type
    })

    setTimeout(() => {
      alerts.value.shift()
    }, 3000)
  }

  return {
    alerts,
    addNotification
  }
})
