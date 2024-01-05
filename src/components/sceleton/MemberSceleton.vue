<template>
  <div
    class="border-2 border-zinc-300 rounded-xl w-52 bg-white dark:bg-dark-bg-black dark:border-zinc-400 p-3"
  >
    <div class="flex justify-between items-center">
      <AnimatedPlaceholder class="h-7 w-24" />
      <AnimatedPlaceholder class="h-12 w-12 rounded-full" />
    </div>
    <AnimatedPlaceholder class="w-36 h-7" />
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
