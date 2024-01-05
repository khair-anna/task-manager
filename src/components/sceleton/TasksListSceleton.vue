<template>
  <div
    class="menu relative border border-light-gray border-l-4 rounded-xl bg-white dark:bg-dark-bg-black p-4 flex flex-col justify-between gap-3 border-l-gray-500"
  >
    <div class="flex flex-col gap-5 mt-5">
      <AnimatedPlaceholder class="max-w-[60%] h-8" />
      <div>
        <AnimatedPlaceholder class="max-w-[90%] mb-1" />
        <AnimatedPlaceholder class="max-w-[90%]" />
      </div>
      <AnimatedPlaceholder class="max-w-[50%] h-7" />
      <AnimatedPlaceholder class="max-w-[50%] h-7" />
    </div>
    <div class="flex justify-between">
      <AnimatedPlaceholder class="self-end w-20" />
      <div>
        <AnimatedPlaceholder class="w-48 mb-2 h-10" />
        <AnimatedPlaceholder class="w-48 h-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>
