<template>
  <h2 class="subtitle">
    <slot></slot>
  </h2>
</template>

<script setup>
</script>

<style scoped>
  .subtitle {
    font-family: var(--font-headings);
    font-size: var(--header-2);
    font-weight: var(--bold);
  }
</style>