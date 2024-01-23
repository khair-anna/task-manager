import { useQuery } from 'vue-query'
import { fetchUser } from '../api/api'
import { useAlertsStore } from '../stores/alerts'

export default function useUserQuery() {
  const alertsStore = useAlertsStore()
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    // onSuccess: (data) => {
    //   console.log(data)
    // },
    onError: () => {
      alertsStore.addNotification('error', 'Error getting a current user!')
    }
  })
}
