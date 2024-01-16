import { useQuery } from 'vue-query'
import { fetchTasks } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export default function loadTasks() {
  const alertsStore = useAlertsStore()
  return useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    onError: () => {
      alertsStore.addNotification('error', 'Error loading tasks!')
    }
  })
}
