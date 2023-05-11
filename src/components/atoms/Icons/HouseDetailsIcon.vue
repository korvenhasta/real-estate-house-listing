<template>
  <img :alt="alt" class="houseDetailsIcon" :src="url" />
</template>

<script setup>
  defineProps({
    url: String,
    alt: String
  })
</script>

<style scoped>
  .houseDetailsIcon {
    width: 15px;
    height: 15px;
  }
</style>