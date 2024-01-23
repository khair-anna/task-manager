<template>
  <div class="grid grid-cols-3 mt-16 px-5 gap-5">
    <div class="flex flex-col gap-5">
      <AnimatedPlaceholder class="w-40 h-10" />
      <TasksListSceleton />
      <TasksListSceleton />
    </div>
    <div class="flex flex-col gap-5">
      <AnimatedPlaceholder class="w-40 h-10" />
      <TasksListSceleton />
      <TasksListSceleton />
    </div>
    <div class="flex flex-col gap-5">
      <AnimatedPlaceholder class="w-40 h-10" />
      <TasksListSceleton />
      <TasksListSceleton />
    </div>
  </div>
</template>

<script setup>
import TasksListSceleton from './TasksListSceleton.vue'
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
