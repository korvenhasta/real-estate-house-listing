<template>
  <div class="detailsContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
  .detailsContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 16px;
    padding-bottom: 16px;
  }
</style>