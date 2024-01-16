import { useMutation, useQueryClient } from 'vue-query'
import { editTask } from '../api/api'
import { useAlertsStore } from '../stores/alerts'
import { useTasksStore } from '../stores/TasksStore'

export function useEditTask() {
  const queryClient = useQueryClient()
  const alertsStore = useAlertsStore()
  const tasksStore = useTasksStore()

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      tasksStore.editingTask.id = null
      tasksStore.editingTask.name = ''
      tasksStore.editingTask.description = ''
      tasksStore.editingTask.endDate = ''
      alertsStore.addNotification('success', 'Task was successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    },
    onError: () => {
      alertsStore.addNotification('error', 'Error editing task!')
    }
  })
}
