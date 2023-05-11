<template>
  <section class="pageContent">
    <slot></slot>
  </section>
</template>

<style scoped>
  .pageContent {
    max-width: 1440px;
    padding: 24px 24px 0 24px;
    margin: auto;
  }

  @media screen and (min-width: 1024px) {
    .pageContent {
      padding: 24px 165px 0 165px;
    }
  }
</style>