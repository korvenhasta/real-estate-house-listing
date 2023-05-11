<template>
  <!-- Header for the mobile version. -->
  <div class="headingContainer--mobile">
    <RouterLink class="backLink" :to="{name: HOME_PAGE}">
      <img 
        alt="Back Arrow icon" 
        class="backArrowIcon" 
        src="@/assets/arrow_back_grey.png" 
      />
    </RouterLink>
    <PageTitle class="pageTitle--mobile">{{ pageTitle }}</PageTitle>
  </div>

  <!-- Back arrow for the desktop version. -->
  <RouterLink class="backArrowContainer" :to="{name: HOME_PAGE}">
    <img 
      alt="Back Arrow icon" 
      class="backArrowIcon" 
      src="@/assets/arrow_back_grey.png" 
    />
    <p class="backButtonLabel">Back to overview</p>
  </RouterLink>

  <PageTitle class="pageTitle--desktop">{{ pageTitle }}</PageTitle>
</template>

<script setup>
  import { HOME_PAGE } from '../../router';
  import PageTitle from '../atoms/Typography/PageTitle.vue';

  defineProps({
    pageTitle: String,
  })
</script>

<style scoped>
  .backArrowContainer {
    display: none;
  }

  .headingContainer--mobile {
    position: relative;
  }

  .backLink {
    position: absolute;
    left: 0;
    top: 5px;
  }

  .pageTitle--mobile {
    text-align: center;
  }

  .pageTitle--desktop {
    display: none;
  }

  .backArrowIcon {
    width: 18px;
  }

  .pageTitle--mobile {
    text-align: center;
  }

  .pageTitle--desktop {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    .headingContainer--mobile {
      display: none;
  }

    .backArrowContainer {
      display: flex;
      gap: 16px;
      margin: 24px 0;
      color: var(--text-primary);
    }

    .pageTitle--desktop {
      display: block;
      padding-bottom: 16px;
    }

    .backButtonLabel {
      font-family: var(--font-headings);
      font-size: var(--back-button-label);
      font-weight: var(--semibold);
      display: block;
    }
  }
</style>