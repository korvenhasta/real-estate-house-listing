<template>
  <div class="overlay" >
    <div class="modal">
      <PageTitle class="center">Delete listing</PageTitle>
      <TextParagraph class="center modalText">
        Are you sure you want to delete this listing?
        <br>
        This action cannot be undone.
      </TextParagraph>
      <button class="btn btn--danger" @click="deleteHouse">YES, DELETE</button>
      <button class="btn btn--cancel" @click="storeProperties.cancelDeleteHouse">GO BACK</button>
    </div>
  </div>
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import PageTitle from '../atoms/Typography/PageTitle.vue';
  import TextParagraph from '../atoms/Typography/TextParagraph.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { DETAIL_PAGE } from '@/router';
  import { HOME_PAGE } from '@/router';

  const storeProperties = usePropertiesStore();

  const router = useRouter()
  const route = useRoute()

  async function deleteHouse() {
    await storeProperties.deleteHouse()
    if (route.name === DETAIL_PAGE) {
      router.push({name: HOME_PAGE})
    }
  }

</script>

<style scoped>
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    padding: 12px;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 600px;
    padding: 32px 24px;
    border-radius: 10px;
    background-color: white;
  }

  .center {
    text-align: center;
  }

  .modalText {
    margin-bottom: 16px;
  }

  .btn {
    font-family: var(--headers-buttons-bold);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--bold);
    color: var(--background-2);
    border: none;
    border-radius: 5px;
    width: 70%;
    padding: 12px;
    text-align: center;
  }

  .btn--danger {
    background-color: var(--primary);
  }

  .btn--cancel {
    background-color: var(--secondary);
  }

  @media screen and (min-width: 1024px) {
    .modal {
      gap: 24px;
      padding: 48px;
    }
  }

</style>