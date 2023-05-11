<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar/NavBar.vue';
  import DeleteModal from './components/DeleteModal/DeleteModal.vue';
  import { usePropertiesStore } from '@/stores/properties'

  const storeProperties = usePropertiesStore();
</script>

<template>
  <NavBar />
  <!-- Adding Suspense component here. So pages can await the data. -->
  <Suspense>
    <template #fallback>Loading...</template>
    <RouterView />
  </Suspense>
  <DeleteModal v-if="storeProperties.displayDeleteModal"/>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


</style>
