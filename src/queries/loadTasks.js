import { useQuery } from 'vue-query'
import { fetchTasks } from '../api/api'
import { useAlertsStore } from '../stores/alerts'
import { computed } from 'vue'
import useUserQuery from './userQuery'

export default function loadTasks() {
  const alertsStore = useAlertsStore()
  const { data: user } = useUserQuery()
  const userId = computed(() => user.value?.uid)
  return useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => fetchTasks(userId.value),
    onError: () => {
      alertsStore.addNotification('error', 'Error loading tasks!')
    }
  })
}
