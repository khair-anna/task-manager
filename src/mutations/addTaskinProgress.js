import { useMutation, useQueryClient } from 'vue-query'
import { addTaskInProgress } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useAddTaskInProgress() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (taskId) => addTaskInProgress(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error adding task in progress!')
    }
  })
}
