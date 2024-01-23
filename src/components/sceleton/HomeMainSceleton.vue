<template>
  <div>
    <div class="mt-20 mb-40 px-5">
      <AnimatedPlaceholder class="w-40 h-10 mb-5" />
      <div class="flex [&>*:first-child]:ml-0">
        <TasksHomeSceleton />
        <TasksHomeSceleton />
        <TasksHomeSceleton />
        <TasksHomeSceleton />
      </div>
    </div>
    <div class="px-5">
      <AnimatedPlaceholder class="w-40 h-10 mb-5" />
      <div class="flex [&>*:first-child]:ml-0">
        <MemberSceleton class="-mb-20" />
        <MemberSceleton class="-mb-20" />
        <MemberSceleton class="-mb-20" />
        <MemberSceleton class="-mb-20" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
import TasksHomeSceleton from './TasksHomeSceleton.vue'
import MemberSceleton from './MemberSceleton.vue'
</script>
