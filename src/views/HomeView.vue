<template>
  <div>
    <LayoutDefault v-if="user?.uid">
      <div class="xl:ml-64">
        <HomeMainSceleton v-if="isLoading" />
        <HomeMain v-else />
      </div>
    </LayoutDefault>
    <HomeDefault v-else />
  </div>
</template>

<script setup>
import LayoutDefault from '../components/LayoutDefault.vue'
import HomeDefault from '../components/HomeDefault.vue'
import HomeMain from '../components/HomeMain.vue'
import HomeMainSceleton from '../components/sceleton/HomeMainSceleton.vue'
import loadTasks from '../queries/loadTasks'
import useUserQuery from '../queries/userQuery'

const { data: user } = useUserQuery()
const { isLoading } = loadTasks()
</script>
