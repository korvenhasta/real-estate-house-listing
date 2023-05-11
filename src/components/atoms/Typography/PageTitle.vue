<template>
  <h1 class="title">
    <slot></slot>
  </h1>
</template>

<script setup>
</script>

<style scoped>
  .title {
    font-family: var(--font-headings);
    font-size: var(--header-1);
    font-weight: var(--bold);
  }
</style>