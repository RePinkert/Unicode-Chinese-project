<template>
  <div class="data-type-tab">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab-button', { active: modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  value: string
  label: string
}

interface Props {
  modelValue: string
  tabs: Tab[]
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.data-type-tab {
  margin: 20px;
  text-align: center;
}

.tab-button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  background: #1772B4;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.tab-button:hover {
  background: #0c5a8e;
}

.tab-button.active {
  background: #27ae60;
}
</style>
