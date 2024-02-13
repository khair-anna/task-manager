import { useMutation, useQueryClient } from 'vue-query'
import { logout } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useLogout() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error logging out!')
    }
  })
}
