import { useMutation, useQueryClient } from 'vue-query'
import { logout } from '../api/api'
import { useAlertsStore } from '../stores/alerts'
import router from '../router'

export function useLogout() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
      router.push('/')
      alertsStore.addNotification('success', 'You are successfully logged out')
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error logging out!')
    }
  })
}
