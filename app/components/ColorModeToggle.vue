<template>
  <button class="color-mode-toggle" @click="toggleColorMode" :title="title">
    <span class="icon">{{ icon }}</span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const icon = computed(() => colorMode.value === 'dark' ? '☀️' : '🌙')
const title = computed(() => colorMode.value === 'dark' ? '切换到亮色模式' : '切换到暗色模式')
</script>

<style scoped>
.color-mode-toggle {
  background: transparent;
  border: 2px solid var(--secondary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.color-mode-toggle:hover {
  background: var(--secondary-color);
  transform: scale(1.1);
}

.icon {
  font-size: 1.2em;
}
</style>
