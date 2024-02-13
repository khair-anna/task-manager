import { useMutation, useQueryClient } from 'vue-query'
import { login } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useLogin() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (details) => login(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    },
    onError: (error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          alertsStore.addNotification('error', 'User not found!')
          break
        case 'auth/wrong-password':
          alertsStore.addNotification('error', 'Wrong password!')
          break
        case 'auth/invalid-login-credentials':
          alertsStore.addNotification('error', 'Invalid login credentials!')
          break
        default:
          alertsStore.addNotification('error', 'Error logging in!')
      }
    }
  })
}
