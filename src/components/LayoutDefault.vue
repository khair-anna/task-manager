<template>
  <SideBar />
  <HeaderDefault />
  <slot />
</template>
<script setup>
import SideBar from './SideBar.vue'
import HeaderDefault from './HeaderDefault.vue'
</script>
