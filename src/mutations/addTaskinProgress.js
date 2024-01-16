import { useMutation, useQueryClient } from 'vue-query'
import { addTaskInProgress } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export function useAddTaskInProgress() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (taskId) => addTaskInProgress(taskId),
    onSuccess: () => {
      alertsStore.addNotification('success', 'Task was successfully added in progress')
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error adding task in progress!')
    }
  })
}
