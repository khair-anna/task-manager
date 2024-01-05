<template>
  <LayoutDefault>
    <Suspense>
      <TeamMembers />
      <template #fallback> <TeamMembersSceleton /> </template>
    </Suspense>
  </LayoutDefault>
</template>
<script setup>
import LayoutDefault from '../components/LayoutDefault.vue'
import TeamMembers from '../components/TeamMembers.vue'
import TeamMembersSceleton from '../components/sceleton/TeamMembersSceleton.vue'
</script>
