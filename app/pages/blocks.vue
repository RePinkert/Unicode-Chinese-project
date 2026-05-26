<template>
  <div class="blocks-page">
    <div class="filter-controls">
      <SearchBar v-model="searchTerm" />
      <TabButtons v-model="activeType" :tabs="tabs" />
    </div>

    <div id="blocks">
      <h2>All used Unicode blocks of this project</h2>
      <BlockGrid :items="filteredItems" :type="activeType as 'hanzi' | 'emoji'" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { initializeData, searchEmojis, searchHanzi, emojis, mandarinData } = useCharacterData()

const searchTerm = ref('')
const activeType = ref('hanzi')

const tabs = [
  { value: 'hanzi', label: 'Chinese Characters(汉字)' },
  { value: 'emoji', label: 'Emoji' }
]

onMounted(async () => {
  await initializeData()
})

const filteredItems = computed(() => {
  if (activeType.value === 'hanzi') {
    return searchTerm.value ? searchHanzi(searchTerm.value) : mandarinData.value
  } else {
    return searchTerm.value ? searchEmojis(searchTerm.value) : emojis.value
  }
})
</script>

<style scoped>
.blocks-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.filter-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

#blocks {
  text-align: center;
  width: 100%;
}

#blocks h2 {
  margin-bottom: 20px;
}
</style>
