import { useMutation, useQueryClient } from 'vue-query'
import { assignTask } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export function useAssignTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()

  return useMutation({
    mutationFn: ({ taskId, member }) => assignTask({ taskId, member }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error assigning task!')
    }
  })
}
