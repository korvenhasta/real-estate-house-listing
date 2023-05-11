<template>
  <h1 class="label">
    <slot></slot>
  </h1>
</template>

<script setup>
</script>

<style scoped>
  .label {
    font-size: var(--input-errors);
    font-weight: var(--semibold);
    padding: 8px 0;
  }

  @media screen and (min-width: 1024px) {
    .label {
      font-size: var(--input-errors);
    }
  }
</style>