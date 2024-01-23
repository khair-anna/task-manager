<template>
  <LayoutDefault>
    <div class="xl:ml-64">
      <TeamMembers />
      <TeamMembersSceleton v-if="isLoading" />
    </div>
  </LayoutDefault>
</template>
<script setup>
import LayoutDefault from '../components/LayoutDefault.vue'
import TeamMembers from '../components/TeamMembers.vue'
import TeamMembersSceleton from '../components/sceleton/TeamMembersSceleton.vue'
import getTeamMembers from '../queries/getTeamMembers'

const { isLoading } = getTeamMembers()
</script>
