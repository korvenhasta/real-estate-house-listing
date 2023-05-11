<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import HouseCard from '@/components/HouseCard/HouseCard.vue';
  import PageTitle from '@/components/atoms/Typography/PageTitle.vue';
  import SectionTitle from '@/components/atoms/Typography/SectionTitle.vue';
  import NotFound from '@/components/NotFound/NotFound.vue';
  import FilterControls from '@/components/FiltersControls/FiltersControls.vue'
  import PageWrapper from '@/components/atoms/PageWrapper/PageWrapper.vue';
  import { DETAIL_PAGE } from '@/router';
  import { CREATE_PAGE } from '@/router';
  const storeProperties = usePropertiesStore();

  if (storeProperties.properties.length === 0) {
    await storeProperties.fill();
  }
</script>

<template>
  <main>
    <PageWrapper>
      <!-- Header for the mobile version. -->
      <div class="headingContainer--mobile">
        <RouterLink class="addLink" :to="{name: CREATE_PAGE}">
          <img alt="Plus icon" class="plusIcon" src="@/assets/add_house_grey.png" />
        </RouterLink>
        <PageTitle class="pageTitle--mobile">Houses</PageTitle>
      </div>

      <!-- Back arrow for the desktop version. -->
      <div class="headingContainer--desktop">
        <PageTitle class="pageTitle--mobile">Houses</PageTitle>
        <RouterLink class="createButtonContainer" :to="{name: CREATE_PAGE}">
          <button class="CreateNewButton">
            <img alt="White plus icon" class="plusIcon" src="@/assets/add_house_white.png" />
            CREATE NEW
          </button> 
        </RouterLink>
      </div>

      <!-- Searchbar and sort options. -->
      <FilterControls />

      <!-- Displaying the results number. -->
      <SectionTitle class="resultsFound" v-if="storeProperties.displayResultCount">{{ storeProperties.resultCount }} results found</SectionTitle>

      <!-- Displaying image and message when there is nothing to show to the user. -->
      <NotFound v-if="storeProperties.noResults"/>

      <!-- List of properties. -->
      <ol class="houseList">
        <RouterLink :to="{name: DETAIL_PAGE, params: {id: property.id}}" v-for="property in storeProperties.filteredProperties" :key="property.id">
          <HouseCard
          :property="property"
          />
      </RouterLink>
      </ol>
    </PageWrapper>
  </main>
</template>

<style scoped>
  .headingContainer--mobile {
    position: relative;
    margin-bottom: 16px;
  }

  .headingContainer--desktop {
    display: none;
  }

  .pageTitle--mobile {
    text-align: center;
  }

  .addLink {
    position: absolute;
    right: 0;
    top: 5px;
  }

  .plusIcon {
    width: 20px;
  }

  .resultsFound {
    margin: 16px 0;
  }

  .houseList {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 0 64px 0;
  }

  @media screen and (min-width: 1024px) {
    .headingContainer--mobile {
      display: none;
    }

    .headingContainer--desktop {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .CreateNewButton {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32px;
      width: 224px;
      height: 100%;
      font-family: var(--headers-buttons-bold);
      font-size: var(--buttons-tabs-text);
      font-weight: var(--bold);
      color: var(--background-2);
      background-color: var(--primary);
      border: none;
      border-radius: 10px;
      padding: 0;
    }
    .houseList {
      gap: 24px;
    }
  }
</style>