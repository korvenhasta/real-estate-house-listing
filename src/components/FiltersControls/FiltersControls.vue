<template>
  <header class="filters">
    <!-- Container for the searchbar. -->
    <div class="relativeContainer">
      <input @input="storeProperties.updateSearch($event.target.value)" :value="storeProperties.search" class="searchInput" placeholder="Search for a house" />
      <img class="searchbarIcon iconSearch" src="@/assets/search.png"/>
      <img @click="storeProperties.clearSearch" v-if="storeProperties.search" class="searchbarIcon iconClear" src="@/assets/clear_grey.png"/>
    </div>
    <!-- Sorting properties by price and size -->
    <div class="buttonContainer" v-if="storeProperties.filteredProperties.length > 0">
      <button class="buttonSort buttonSortLeft" @click="storeProperties.updateSortBy('price')" :class="{activeSort:storeProperties.sortBy === 'price'}">Price</button>
      <button class="buttonSort buttonSortRight" @click="storeProperties.updateSortBy('size')" :class="{activeSort:storeProperties.sortBy === 'size'}">Size</button>
    </div>
  </header>
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  const storeProperties = usePropertiesStore();
</script>

<style scoped>

  .filters {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }

  .buttonContainer {
    width: 100%;
    height: 36px;
  }

  .buttonSort {
    width: 50%;
    height: 100%;
    padding: 0;
    font-family: var(--headers-buttons-bold);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--bold);
    color: var(--background-2);
    background-color: var(--tertiary-dark);
    border: none;
  }

  .buttonSortLeft {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .buttonSortRight {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .activeSort {
    background-color: var(--primary);
  }

  .relativeContainer {
    position: relative;
  }

  .searchInput {
    font-family: var(--font-body);
    font-size: var(--input-errors);
    font-weight: var(--regular);
    width: 100%;
    height: 36px;
    background: var(--tertiary-light);
    border-radius: 5px;
    border: none;
    color: var(--text-secondary);
    padding: 0 40px;
  }

  .searchbarIcon {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 10px;
  }

  .iconSearch {
    left: 12px;
  }

  .iconClear {
    right: 12px;
  }

  @media screen and (min-width: 1024px) {
    .relativeContainer {
      width: 40%;
    }

    .filters {
      flex-direction: row;
      margin-bottom: 24px;
    }

    .searchbarIcon {
      top: 14px;
    }

    .searchInput {
      font-size: var(--input-errors);
      height: 44px;
    }

    .buttonContainer {
      width: 30%;
      height: 44px;
    }

    .buttonSort {
      font-size: var(--buttons-tabs-text);
    }
  }
</style>