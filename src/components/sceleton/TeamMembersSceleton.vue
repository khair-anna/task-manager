<template>
  <div class="ml-64 p-5">
    <div class="flex flex-col gap-5">
      <AnimatedPlaceholder class="w-40 h-10" />
      <MemberSceleton />
      <MemberSceleton />
      <MemberSceleton />
      <MemberSceleton />
    </div>
  </div>
</template>
<script setup>
import MemberSceleton from './MemberSceleton.vue'
</script>
