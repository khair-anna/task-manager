import { useMutation, useQueryClient } from 'vue-query'
import { signup } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useSignup() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (details) => signup(details),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    },
    onError: (error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alertsStore.addNotification('error', 'Email already in use!')
          break
        case 'auth/invalid-email':
          alert('Invalid email')
          alertsStore.addNotification('error', 'Invalid email!')
          break
        case 'auth/operation-not-allowed':
          alertsStore.addNotification('error', 'Operation not allowed!')
          break
        case 'auth/weak-password':
          alertsStore.addNotification('error', 'Weak password!')
          break
        default:
          alertsStore.addNotification('error', 'Error signing up!')
      }
    }
  })
}
