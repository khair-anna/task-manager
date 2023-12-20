<template>
  <SideBar />
  <TheHeader />
  <slot />
</template>
<script setup>
import SideBar from './SideBar.vue'
import TheHeader from './TheHeader.vue'
</script>
