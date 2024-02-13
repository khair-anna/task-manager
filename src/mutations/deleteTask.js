import { useMutation, useQueryClient } from 'vue-query'
import { deleteTask } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error deleting task!')
    }
  })
}
