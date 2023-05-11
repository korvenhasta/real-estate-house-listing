<template>
  <p class="paragraph" :class="variant">
    <slot></slot>
  </p>
</template>

<script setup>
  defineProps({variant: String})
</script>

<style scoped>
  .paragraph {
    font-family: var(--font-body);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--regular);
  }

  .semiTransparent {
    color: var(--tertiary-dark);
  }


  @media screen and (min-width: 1024px) {
    .paragraph {
      font-size: var(--buttons-tabs-text);
      font-weight: var(--regular);
    }

    .errorMessage {
      font-size: var(--input-errors);
      color: var(--primary);
      font-style: italic;
    }
  }
</style>