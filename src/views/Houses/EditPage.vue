<template>
  <PageWrapper class="pageWrapperDetails">
    <section class="createHouseDetails">

      <PageHeader pageTitle="Edit listing"/>
      
      <HouseForm 
        :handleSubmit="handleSubmit" 
        :values="formValues" buttonText="SAVE" v-if="storeProperties.propertyDetails"/>
    </section>
  </PageWrapper> 
</template>

<script setup>
  import { usePropertiesStore } from '@/stores/properties'
  import PageWrapper from '@/components/atoms/PageWrapper/PageWrapper.vue';
  import PageHeader from '@/components/PageHeader/PageHeader.vue';
  import { useRouter } from 'vue-router';
  import HouseForm from '@/components/HouseForm/HouseForm.vue'
  import { reactive } from 'vue';
  import { DETAIL_PAGE } from '@/router';
  import { computed } from 'vue'

  const storeProperties = usePropertiesStore();

  // If the details of the property are not in the store, fetch them.
  if (!storeProperties.propertyDetails) {
    await storeProperties.fill()
  }

  const house = computed(() => storeProperties.propertyDetails)

  let formValues = reactive({
    ...house.value,
    streetName: house.value?.location.street.split(' ')[0], 
    houseNumber: house.value?.location.street.split(' ')[1],
  }
  //     image: String,
  //     price: Number,
  //     rooms: {
  //       bedrooms: Number,
  //       bathrooms: Number
  //     },
  //     size: Number,
  //     description: String,
  //     location: {
  //       street: String,
  //       city: String,
  //       zip: String
  //     },
  //     createdAt: String,
  //     constructionYear: Number,
  //     hasGarage: Boolean,
  //   },
  //   handleSubmit: Function,
  //   buttonText: String
  // }
  )

  const router = useRouter();

  async function handleSubmit(formData, houseImageFile) {
    const savedHouse = await storeProperties.updateHouse(formData, houseImageFile, house.value.id)
    router.push({name: DETAIL_PAGE, params: {id: savedHouse.id}})
  }

</script>

<style scoped>
  .pageWrapperDetails {
    padding-bottom: 64px;
    background-image: url("@/assets/background.jpg");
    background-repeat: no-repeat;
    background-size: 132%;
    /* background-position: right -100px bottom; */
    background-position: right;
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