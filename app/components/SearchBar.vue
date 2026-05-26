<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="search-input"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Type out a character or code point(U+XXXX) to search...'
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-container {
  margin: 20px 0;
}

.search-input {
  width: 600px;
  padding: 8px;
  font-size: 16px;
  border: 2px solid var(--secondary-color);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: var(--primary-color);
}

@media (max-width: 800px) {
  .search-input {
    width: 100%;
    max-width: 400px;
  }
}
</style>
