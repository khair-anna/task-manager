import { useMutation, useQueryClient } from 'vue-query'
import { completeTask } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export function useCompleteTask() {
  const alertsStore = useAlertsStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId) => completeTask(taskId),
    onSuccess: () => {
      alertsStore.addNotification('success', 'Task was successfully completed')
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error completing task!')
    }
  })
}
