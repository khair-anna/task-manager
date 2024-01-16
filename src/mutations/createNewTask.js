import { useMutation, useQueryClient } from 'vue-query'
import { createNewTask } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export function useCreateNewTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: createNewTask,
    onSuccess: () => {
      alertsStore.addNotification('success', 'Task was successfully created')
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error adding new task!')
    }
  })
}
