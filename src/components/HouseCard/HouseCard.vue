<template>
  <li class="houseCard">
    <img alt="Picture of a house" class="houseImg" :src="property.image">
    <div class="houseInfoContainer">
      <SectionTitle>{{ property.location.street }}</SectionTitle>
      <TextParagraph>{{ formatCurrency(property.price) }}</TextParagraph>
      <TextParagraph variant="semiTransparent">{{ property.location.zip }} {{ property.location.city }}</TextParagraph>
      <DetailsContainer class="houseDetailsContainer">
        <DetailContainer>
          <HouseDetailsIcon alt="Bedroom icon" url="/src/assets/bed.png"/>
          <TextParagraph>{{ property.rooms.bedrooms }}</TextParagraph>
        </DetailContainer>

        <DetailContainer>
          <HouseDetailsIcon alt="Bathroom icon" url="/src/assets/bathtub.png"/>
          <TextParagraph>{{ property.rooms.bathrooms }}</TextParagraph>
        </DetailContainer>

        <DetailContainer>
          <HouseDetailsIcon alt="Size icon" url="/src/assets/size.png"/>
          <TextParagraph>{{ property.size }} m2</TextParagraph>
        </DetailContainer>
      </DetailsContainer>
    </div>
    <RouterLink :to="{name: EDIT_PAGE, params: {id: property.id}}" v-if="property.madeByMe">
      <img alt="Edit icon" class="editIcon" src="@/assets/edit_red.png"/>
    </RouterLink>
    <img alt="Delete icon" class="deleteIcon" src="@/assets/delete_grey.png" v-if="property.madeByMe" @click="displayDeleteWarning"/>
  </li>
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import TextParagraph from '../atoms/Typography/TextParagraph.vue';
  import SectionTitle from '../atoms/Typography/SectionTitle.vue';
  import DetailsContainer from '../atoms/DetailsContainer/DetailsContainer.vue';
  import DetailContainer from '../atoms/DetailsContainer/DetailContainer.vue';
  import HouseDetailsIcon from '../atoms/Icons/HouseDetailsIcon.vue';
  import { EDIT_PAGE } from '@/router';

  const storeProperties = usePropertiesStore();

  const props = defineProps({property: {
    location: {
      zip: String,
      city: String,
      street: String
    },
    rooms: {
      bedrooms: Number,
      bathrooms: Number
    },
    size: Number,
    price: Number,
    id: Number
  }})

  function formatCurrency(price) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(price)
  }

  function displayDeleteWarning(event) {
    // Show delete modal instead of navigating to the detail page by using preventDefault.
    event.preventDefault();
    storeProperties.displayDeleteWarning(props.property.id)
  }

</script>

<style scoped>
  .houseCard {
    position: relative;
    display: flex;
    justify-content: flex-start;
    gap: 16px;
    background-color: var(--background-2);
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 0 3px 3px rgba(195, 195, 195, 0.1);
  }

  .houseImg {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    object-position: left;
  }

  .houseInfoContainer {
    color: var(--text-primary);
    gap: 16px;
  }
  .houseDetailsContainer {
    margin-top: 16px;
  }

  .editIcon {
    position: absolute;
    width: 16px;
    top: 14px;
    right: 41px;
  }

  .deleteIcon {
    position: absolute;
    width: 16px;
    top: 14px;
    right: 18px;
  }

  @media screen and (min-width: 1024px) {
    .houseCard {
      gap: 24px;
      padding: 24px;
    }

    .houseImg {
      width: 175px;
      height: 175px;
    }

    .houseInfoContainer {
      display: flex;
      flex-direction: column;
      gap: 8px;
    } 
    .houseDetailsContainer {
      gap: 12px;
      margin-top: 12px;
    }

    .editIcon {
      position: absolute;
      width: 24px;
      top: 26px;
      right: 80px;
    }

    .deleteIcon {
      position: absolute;
      width: 24px;
      top: 26px;
      right: 40px;
    }
  }
</style>