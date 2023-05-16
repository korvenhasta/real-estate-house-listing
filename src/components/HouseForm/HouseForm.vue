<template>
  <form v-on:submit="submit" class="form">
    <BaseInput 
      label="Street name*" 
      placeholder="Enter the street name" 
      type="text" 
      v-model="house.streetName"
      :errors="v$.streetName.$errors"
    />

    <DetailsContainer class="inputsContainer">
      <BaseInput 
        label="House number*" 
        placeholder="Enter house number" 
        type="number" 
        v-model="house.houseNumber"
        :errors="v$.houseNumber.$errors"
      />
      <BaseInput 
        label="Addition (optional)" 
        placeholder="e.g. A" 
        type="text" 
        v-model="house.numberAddition"
      />
    </DetailsContainer>

    <BaseInput 
      label="Postal code*" 
      placeholder="e.g. 1000 AA" 
      type="text" 
      v-model="house.location.zip"
      :errors="v$.location.zip.$errors"
    />
    <BaseInput 
      label="City*" 
      placeholder="e.g. Utrecht" 
      type="text" 
      v-model="house.location.city"
      :errors="v$.location.city.$errors"
    />

    <FileInput 
      label="Upload picture (PNG or JPG)*"
      v-model:previewImageUrl="house.image"
      v-model:imageFile="house.file"
      :errors="v$.image.$errors"
    />

    <BaseInput 
      label="Price*" 
      placeholder="e.g. €150.000" 
      type="number" 
      v-model="house.price"
      :errors="v$.price.$errors"
    />

    <DetailsContainer class="inputsContainer">
      <BaseInput 
        label="Size*" 
        placeholder="e.g. 60m2" 
        type="number" 
        v-model="house.size"
        :errors="v$.size.$errors"
      />
      <div class="selectContainer">
        <BaseLabel>Garage*</BaseLabel>
        <select class="dropDown" :class="{'input--error': v$.hasGarage.$errors.length > 0}" v-model="house.hasGarage">
          <option disabled value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <TextParagraph variant="errorMessage" v-for="error in v$.hasGarage.$errors" :key="error.$uid">
          {{ error.$message }}
        </TextParagraph>
      </div>
    </DetailsContainer>

    <DetailsContainer class="inputsContainer">
      <BaseInput 
        label="Bedrooms*" 
        placeholder="Enter amount" 
        type="number" 
        v-model="house.rooms.bedrooms"
        :errors="v$.rooms.bedrooms.$errors"
      />
      <BaseInput 
        label="Bathrooms*" 
        placeholder="Enter amount" 
        type="number" 
        v-model="house.rooms.bathrooms"
        :errors="v$.rooms.bathrooms.$errors"
      />
    </DetailsContainer>

    <BaseInput 
      label="Construction date*" 
      placeholder="e.g. 1990" 
      type="number" 
      v-model="house.constructionYear"
      :errors="v$.constructionYear.$errors"
    />
    <div class="descriptionContainer">
      <BaseLabel>Description*</BaseLabel>
      <textarea class="descriptionTextArea" :class="{'input--error': v$.description.$errors.length > 0}" placeholder="Enter description" v-model="house.description"></textarea>
      <TextParagraph variant="errorMessage" v-for="error in v$.description.$errors" :key="error.$uid">
        {{ error.$message }}
      </TextParagraph>
    </div>
    <button class="formSubmitButton" type="submit">{{ buttonText }}</button>
  </form>
</template>

<script setup>
  import BaseInput from '../atoms/BaseInput/BaseInput.vue';
  import { reactive } from 'vue';
  import DetailsContainer from '../atoms/DetailsContainer/DetailsContainer.vue'; 
  import BaseLabel from '../atoms/BaseLabel/BaseLabel.vue';
  import TextParagraph from '../atoms/Typography/TextParagraph.vue';
  import useVuelidate from '@vuelidate/core'
  import { required, helpers } from '@vuelidate/validators'
  import FileInput from '@/components/atoms/FileInput/FileInput.vue'

  const props = defineProps({
    values: {
      image: String,
      price: Number,
      rooms: {
        bedrooms: Number,
        bathrooms: Number
      },
      size: Number,
      description: String,
      location: {
        street: String,
        city: String,
        zip: String
      },
      createdAt: String,
      constructionYear: Number,
      hasGarage: Boolean,
      madeByMe: Boolean
    },
    handleSubmit: Function,
    buttonText: String
  })

  const house = reactive({...props.values, file: null})

  const requiredFieldMissingValidator = helpers.withMessage('Required field missing', required);

  const rules = {
    streetName: {required: requiredFieldMissingValidator}, 
    houseNumber: {required: requiredFieldMissingValidator},
    numberAddition: '',
    location: {
      zip: {required: requiredFieldMissingValidator},
      city: {required: requiredFieldMissingValidator}, 
    },
    image: {required: requiredFieldMissingValidator},
    price: {required: requiredFieldMissingValidator},
    size: {required: requiredFieldMissingValidator},
    hasGarage: {required: requiredFieldMissingValidator},
    rooms: {
      bedrooms: {required: requiredFieldMissingValidator},
      bathrooms: {required: requiredFieldMissingValidator},
    },
    constructionYear: {required: requiredFieldMissingValidator},
    description: {required: requiredFieldMissingValidator}
  };

  const v$ = useVuelidate(rules, house)

  function encodeImageFileAsURL(file) {
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result)
        }
        reader.readAsDataURL(file);    
    })
  }

  async function submit(event) {
    event.preventDefault();
    const valid = await v$.value.$validate();
    if (!valid) return
    // Exclude the preview image data and actual file.
    // The reason for this that the file upload requires a separate request.
    const {image, file, streetName, houseNumber, ...formData} = house; // eslint-disable-line no-unused-vars
    console.log('image: ', image)
    console.log('file: ', file)

    let houseImageFile
    // We need to determine whether to encode the image as base64 or not
    if (file === null) {
      // Edit. Image is already a base64 string. File is a null. In that case no encoding necessary.
      houseImageFile = image
    }
    else {
      // Create. Image is a blob. File is a file object. We need to encode it as a base64.
      houseImageFile = await encodeImageFileAsURL(file);
    }

    // Call the handleSubmit function provided by the parent. 
    // This could be create a house or edit the house depending on the page.
    props.handleSubmit({...formData, image: houseImageFile, location: {...formData.location, street: `${streetName} ${houseNumber}`}, madeByMe: true})
  }

</script>

<style scoped>

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }

  .inputsContainer {
    padding: 0;
  }

  .inputsContainer:last-of-type {
    gap: 0;
  }

  .selectContainer {
    width: 177px;
    flex-grow: 1;
  }

  .dropDown {
    display: block;
    width: 100%;
    font-family: var(--font-body);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--regular);
    height: 36px;
    border-radius: 5px;
    border: none;
    color: var(--text-secondary);
    padding: 0 16px;
  }

  .descriptionTextArea {
    font-family: var(--font-body);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--regular);
    width: 100%;
    height: 104px;
    border: none;
    border-radius: 5px;
    color: var(--text-secondary);
    resize: none;
    padding: 16px 0 0 16px;
  }

  .input--error {
    border: 1px solid var(--primary);
  }

  .formSubmitButton {
    font-family: var(--headers-buttons-bold);
    font-size: var(--buttons-tabs-text);
    font-weight: var(--bold);
    color: var(--background-2);
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    width: 100%;
    height: 36px;
    margin: 16px 0;
  }

  .formSubmitButton--inactive {
    color: rgba(255, 255, 255, 0.6);
    background-color: rgba(235, 84, 64, 0.6);
  }

  @media screen and (min-width: 1024px) {
    .formSubmitButton {
      width: 55%;
      margin-left: auto;
    }
  }
</style>