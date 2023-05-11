<template>
  <div class="detailContainer">
    <slot></slot>
  </div>
</template>

<style scoped>
  .detailContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    align-items: center;
  }
</style>