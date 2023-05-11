<template>
  <PageWrapper class="pageWrapperDetails">
    <section class="houseDetails">

      <!-- Back arrow for the desktop version at the top of the page. -->
      <RouterLink class="backArrowContainer" :to="{name: HOME_PAGE}">
        <img alt="Back Arrow icon" class="backArrowIcon backArrowIcon--desktop" src="@/assets/arrow_back_grey.png" />
        <p class="backButtonLabel">Back to overview</p>
      </RouterLink>

      <div class="backgroundImg"
        :style="{backgroundImage: `url('${house?.image}')`}"
      >
      <!-- Back arrow, edit and delete icons for the modile version at the top of the page. -->
        <RouterLink :to="{name: HOME_PAGE}">
          <img alt="Back Arrow icon" class="backArrowIcon backArrowIcon--mobile" src="@/assets/arrow_back_white.png" />
        </RouterLink>
        <RouterLink :to="{name: EDIT_PAGE, params:{id: house?.id}}" v-if="house?.madeByMe">
          <img alt="Edit icon" class="editIcon editIcon--mobile" src="@/assets/edit_white.png"/>
        </RouterLink>
        <img 
          alt="Delete icon" 
          class="deleteIcon deleteIcon--mobile" 
          src="@/assets/delete_white.png" 
          v-if="house?.madeByMe" 
          @click="displayDeleteWarning"/>
      </div> 
      
      <div class="houseInfo">
        <SectionTitle class="subtitle">{{ house?.location.street }}</SectionTitle>
        <!-- Edit and delete icons for the desktop version of the page.-->
        <RouterLink :to="{name: EDIT_PAGE, params:{id: house?.id}}" v-if="house?.madeByMe">
          <img alt="Edit icon" class="editIcon editIcon--desktop" src="@/assets/edit_red.png"/>
        </RouterLink>
        <img 
          alt="Delete icon" 
          class="deleteIcon deleteIcon--desktop" 
          src="@/assets/delete_grey.png" 
          v-if="house?.madeByMe" 
          @click="displayDeleteWarning"
        />

        <DetailsContainer>
          <DetailContainer>
            <HouseDetailsIcon alt="Location icon" url="/src/assets/location.png"/>
            <TextParagraph>{{ house?.location.zip }} {{ house?.location.city }}</TextParagraph>
          </DetailContainer>
        </DetailsContainer>

        <DetailsContainer>
          <DetailContainer>
            <HouseDetailsIcon alt="Price icon" url="/src/assets/euro.png"/>
            <TextParagraph>{{ price }}</TextParagraph>
          </DetailContainer>

          <DetailContainer>
            <HouseDetailsIcon alt="Size icon" url="/src/assets/size.png"/>
            <TextParagraph>{{ house?.size}} m2</TextParagraph>
          </DetailContainer>

          <DetailContainer>
            <HouseDetailsIcon alt="Construction icon" url="/src/assets/construction_date.png"/>
            <TextParagraph>Built in {{ house?.constructionYear}}</TextParagraph>
          </DetailContainer>
        </DetailsContainer>

        <DetailsContainer>
          <DetailContainer>
            <HouseDetailsIcon alt="Bedroom icon" url="/src/assets/bed.png"/>
            <TextParagraph>{{ house?.rooms.bedrooms}}</TextParagraph>
          </DetailContainer>

          <DetailContainer>
            <HouseDetailsIcon alt="Bathroom icon" url="/src/assets/bathtub.png"/>
            <TextParagraph>{{ house?.rooms.bathrooms}}</TextParagraph>
          </DetailContainer>

          <DetailContainer>
            <HouseDetailsIcon alt="Garage icon" url="/src/assets/garage.png"/>
            <TextParagraph>{{ hasGarage }}</TextParagraph>
          </DetailContainer>
        </DetailsContainer>

        <TextParagraph>{{ house?.description }}</TextParagraph>
      </div>
    </section>
  </PageWrapper>
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import SectionTitle from '@/components/atoms/Typography/SectionTitle.vue';
  import TextParagraph from '@/components/atoms/Typography/TextParagraph.vue';
  import PageWrapper from '@/components/atoms/PageWrapper/PageWrapper.vue';
  import DetailsContainer from '@/components/atoms/DetailsContainer/DetailsContainer.vue';
  import DetailContainer from '@/components/atoms/DetailsContainer/DetailContainer.vue';
  import HouseDetailsIcon from '@/components/atoms/Icons/HouseDetailsIcon.vue';
  import { EDIT_PAGE, HOME_PAGE } from '@/router';
  import { computed } from 'vue';

  const storeProperties = usePropertiesStore();
  // If the details of the property are not in the store, fetch them.
  if (!storeProperties.propertyDetails) {
    // Since there is no way to fetch a specific property, we are fetching all of them.
    await storeProperties.fill()
  }
  // Use computed properties to avoid repetition and logic in template.
  const house = computed(() => storeProperties.propertyDetails)
  const price = computed(() => formatCurrency(house.value?.price) || '0.00')
  const hasGarage = computed(() => house.value?.hasGarage ? 'Yes': 'No') 

  function formatCurrency(price) {
    // Formating currency amount but without euro symbol.
    return new Intl.NumberFormat('nl-NL', {minimumFractionDigits: 0, maximumFractionDigits: 0}).format(price)
  }

  function displayDeleteWarning() {
    storeProperties.displayDeleteWarning(storeProperties.propertyDetails.id)
  }

</script>

<style scoped>

  .pageWrapperDetails {
    padding: 0 0 64px 0;
  }

  .backArrowContainer {
    display: none;
  }

  .backButtonLabel {
    display: none;
  }

  .backgroundImg {
    position: relative;
    min-height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .backArrowIcon {
    position: absolute;
    width: 20px;
    top: 48px;
    left: 24px;
  }

  .backArrowIcon--mobile {
    display: block;
  }

  .backArrowIcon--desktop {
    display: none;
  }

  .editIcon {
    position: absolute;
    width: 20px;
    top: 48px;
    right: 64px;
  }

  .editIcon--mobile {
    display: block;
  }

  .editIcon--desktop {
    display: none;
  }

  .deleteIcon {
    position: absolute;
    width: 20px;
    top: 48px;
    right: 24px;
  }

  .deleteIcon--mobile {
    display: block;
  }

  .deleteIcon--desktop {
    display: none;
  }

  .houseInfo {
    position: relative;
    padding: 24px;
    margin-top: -24px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: var(--background-2);
  }

  .subtitle {
    padding-bottom: 8px;
  }

@media screen and (min-width: 768px){
  .backgroundImg {
    min-height: 500px;
  }

}

@media screen and (max-width: 1023px){
  .pageWrapperDetails {
    padding: 0 0 64px 0;
  }
}

@media screen and (min-width: 1024px) {

  .pageWrapperDetails {
    padding: 24px 165px 0 165px;
  }

  .backArrowContainer {
    display: flex;
    gap: 16px;
    margin: 24px 0;
    color: var(--text-primary);
  }

  .houseDetails {
    max-width: 650px;
    margin: 0;
  }

  .backArrowIcon {
    position: absolute;
    width: 24px;
    top: 48px;
    left: 32px;
  }
  .backArrowIcon--mobile {
    display: none;
  }

  .backArrowIcon--desktop {
    display: block;
    position: inherit;
  }

  .backButtonLabel {
    font-family: var(--font-headings);
    font-size: var(--back-button-label);
    font-weight: var(--semibold);
    display: block;
  }
  .backgroundImg {
    min-height: 500px;
  }

  .editIcon {
    position: absolute;
    width: 20px;
    top: 40px;
    right: 72px;
  }

  .editIcon--mobile {
    display: none;
  }

  .editIcon--desktop {
    display: block;
  }

  .deleteIcon {
    position: absolute;
    width: 20px;
    top: 40px;
    right: 32px;
  }

  .deleteIcon--mobile {
    display: none;
  }

  .deleteIcon--desktop {
    display: block;
  }

  .houseInfo {
    position: relative;
    padding: 32px;
    margin-top: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
}
  
</style>