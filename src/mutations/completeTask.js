import { useMutation, useQueryClient } from 'vue-query'
import { completeTask } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useCompleteTask() {
  const alertsStore = useAlertsStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId) => completeTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error completing task!')
    }
  })
}
