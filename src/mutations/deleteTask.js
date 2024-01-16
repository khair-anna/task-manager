import { useMutation, useQueryClient } from 'vue-query'
import { deleteTask } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export function useDeleteTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      alertsStore.addNotification('success', 'Task was successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error deleting task!')
    }
  })
}
