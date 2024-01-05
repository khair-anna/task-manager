<template>
  <div>
    <LayoutDefault v-if="usersStore.currentUser">
      <Suspense>
        <HomeMain />
        <template #fallback> <HomeMainSceleton /></template>
      </Suspense>
    </LayoutDefault>
    <HomeDefault v-else />
    <!-- 
    <Notification
      class="ml-72 mt-20 mr-20 mb-20"
      :title="'hello'"
      :content="'how are you?'"
      :show="showAlert"
      :on-dismiss="() => (showAlert = false)"
    />
    <Notification
      class="ml-72 mt-20 mr-20 mb-20"
      :intent="'warning'"
      :title="'hello'"
      :content="'baddd?'"
      :show="showAlert"
      :on-dismiss="() => (showAlert = false)"
    /> -->

    <!-- <LoadingDefault/> -->
  </div>
</template>

<script setup>
import LayoutDefault from '../components/LayoutDefault.vue'
import HomeDefault from '../components/HomeDefault.vue'
import HomeMain from '../components/HomeMain.vue'
import HomeMainSceleton from '../components/sceleton/HomeMainSceleton.vue'
import { useUsersStore } from '../stores/UsersStore'

// import LoadingDefault from '../components/LoadingDefault.vue'
// import Notification from '../components/NotificationDefault.vue'
// import { ref } from 'vue'
// const showAlert = ref(true)

const usersStore = useUsersStore()
</script>
