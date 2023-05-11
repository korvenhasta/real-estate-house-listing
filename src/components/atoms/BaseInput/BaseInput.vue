<template>
  <div class="inputContainer">
    <BaseLabel class="label">{{label}}</BaseLabel>
    <input 
      class="input" 
      :class="{'input--error': errors.length > 0}" 
      type="text" 
      v-bind="$attrs" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)">
    <TextParagraph variant="errorMessage" v-for="error in errors" :key="error.$uid">
      {{ error.$message }}
    </TextParagraph>
  </div>
</template>

<script setup>

  import BaseLabel from '../BaseLabel/BaseLabel.vue';
  import TextParagraph from '../Typography/TextParagraph.vue';

  defineProps({
    label: String,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    errors: {
      default: []
    }
  })
</script>
<style scoped>

  .input {
    display: block;
    width: 100%;
    font-family: var(--font-body);
    font-size: var(--input-errors);
    font-weight: var(--regular);
    height: 36px;
    border-radius: 5px;
    border: 1px solid transparent;
    color: var(--text-secondary);
    padding: 0 16px;
  }

  .input--error {
    border: 1px solid #EB5440;
  }

  .inputContainer {
    flex-grow: 1;
  }
</style>