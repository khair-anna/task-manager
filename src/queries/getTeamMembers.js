import { useQuery } from 'vue-query'
import { fetchTeamMembers } from '../api/api'
import { useAlertsStore } from '../stores/AlertsStore'

export default function getTeamMembers() {
  const alertsStore = useAlertsStore()
  return useQuery({
    queryKey: ['team'],
    queryFn: fetchTeamMembers,
    onError: () => {
      alertsStore.addNotification('error', 'Error getting team members!')
    }
  })
}
