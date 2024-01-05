<template>
  <div
    class="h-48 w-64 border -ml-16 border-light-gray border-l-4 border-l-zinc-400 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3"
  >
    <div>
      <AnimatedPlaceholder class="w-40 h-10 mb-3" />
      <AnimatedPlaceholder class="max-w-[90%] mb-3" />
      <AnimatedPlaceholder class="max-w-[50%] h-7 mb-1" />
      <AnimatedPlaceholder class="max-w-[50%] h-7" />
    </div>
  </div>
</template>
<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
