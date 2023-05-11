<template>
  <BaseLabel>{{ label }}</BaseLabel> 
    <label 
      class="uploadImageContainer" 
      :class="{'input--error': errors.length > 0}" 
      for="image"
    >
      <span class="imageUploadBlock" v-if="!previewImageUrl">
        <img 
          class="uploadHouseIcon" 
          src="@/assets/upload.png" 
        />
      </span>
      <img 
        class="uploadedPreviewImage" 
        :src="previewImageUrl" 
        v-if="previewImageUrl"
      />
      <img 
        class="cancelUploadedImageIcon" 
        src="@/assets/clear_white.png" 
        v-if="previewImageUrl"
        @click="clearImage"
      />
    </label>
    <TextParagraph variant="errorMessage" v-for="error in errors" :key="error.$uid">
      {{ error.$message }}
    </TextParagraph>
    <input id="image" type="file" ref="file" @change="displayPreviewImage" hidden/> 
</template>

<script setup>
  import BaseLabel from "@/components/atoms/BaseLabel/BaseLabel.vue";
  import TextParagraph from "@/components/atoms/Typography/TextParagraph.vue";

  defineProps({
    label: String,
    imageFile: {
      type: File,
      default: null
    },
    previewImageUrl: {
      type: String,
      default: ''
    },
    errors: {
      default: []
    }
  })

  const emit = defineEmits(['update:previewImageUrl', 'update:imageFile'])

  function clearImage(event) {
    // Don't trigger the change event on the input by using preventDefault, 
    // otherwise user will be immidiately prompted for another file.
    event.preventDefault(); 
    // Reset the preview image.
    emit('update:previewImageUrl', '');
    // Reset the value of the file input.
    emit('update:imageFile', null);
  }

  function displayPreviewImage(event) {
    // If no image was selected, just stop.
    if (!event.target.files[0]) return
    // Generate preview image. 
    const url = URL.createObjectURL(event.target.files[0])
    // Emit the changes for v-model to update.
    emit('update:previewImageUrl', url)
    emit('update:imageFile', event.target.files[0]);
  }
</script>

<style scoped>
  .uploadImageContainer {
    position: relative;
    width: 104px;
    /* Adding z-index here. So the label doesn't slide in front of the mobile navbar. */
    z-index: 0;
  }

  .input--error {
    border: 1px solid var(--primary);
  }

  .imageUploadBlock {
    display: block;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E8E8E8FF' stroke-width='4' stroke-dasharray='10%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uploadHouseIcon {
    width: 24px;
  }

  .uploadedPreviewImage {
    width: 104px;
    height: 104px;
    object-fit: cover;
    object-position: left;
    border-radius: 5px;
  }

  .cancelUploadedImageIcon {
    position: absolute;
    width: 24px;
    left: 88px;
    top: -6px;
  }
</style>