<template>
  <PageWrapper class="pageWrapperDetails">
    <section class="createHouseDetails">

      <PageHeader pageTitle="Create new listing"/>
      
      <HouseForm :handleSubmit="handleSubmit" :values="newHouse" buttonText="POST"/>
    </section>
  </PageWrapper> 
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import PageWrapper from '@/components/atoms/PageWrapper/PageWrapper.vue';
  import PageHeader from '@/components/PageHeader/PageHeader.vue';
  import { useRouter } from 'vue-router';
  import HouseForm from '@/components/HouseForm/HouseForm.vue'
  import { DETAIL_PAGE } from '@/router';

  // const newHouse = {
  //   streetName: '', 
  //   houseNumber: '',
  //   numberAddition: '',
  //   zip: '',
  //   city: '', 
  //   image: '',
  //   price: '',
  //   size: '',
  //   hasGarage: '',
  //   bedrooms: '',
  //   bathrooms: '',
  //   constructionYear: '',
  //   description: ''
  // }

  const newHouse = {
    location: {
      streetName: '', 
      houseNumber: '',
      zip: '',
      city: '', 
    },
    numberAddition: '',
    image: '',
    price: '',
    size: '',
    hasGarage: '',
    rooms: {
      bedrooms: '',
      bathrooms: '',
    },
    constructionYear: '',
    description: ''
  }

  const router = useRouter();
  const storeProperties = usePropertiesStore();

  async function handleSubmit(formData, houseImageFile) {
    const savedHouse = await storeProperties.createHouse(formData, houseImageFile)
    router.push({name: DETAIL_PAGE, params: {id: savedHouse.id}})
  }
</script>

<style scoped>
  .pageWrapperDetails {
    padding-bottom: 64px;
    background-image: url("@/assets/background.jpg");
    background-repeat: no-repeat;
    background-size: 132%;
    background-position: right -100px bottom;
  }

  .createHouseDetails {
    max-width: 450px;
    margin: auto;
  }

  @media screen and (min-width: 768px){
    .createHouseDetails {
      max-width: 500px;
    }
  }

  @media screen and (min-width: 1024px) {
    .createHouseDetails {
      max-width: 378px;
      margin: 0;
    }

    .pageWrapperDetails {
      background-size: cover;
      background-position: right top;
    }
  }

</style>