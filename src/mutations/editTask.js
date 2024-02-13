import { useMutation, useQueryClient } from 'vue-query'
import { editTask } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useEditTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: () => editTask(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error editing task!')
    }
  })
}
