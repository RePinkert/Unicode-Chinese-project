<template>
  <div class="card-view">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="face front-face">
        <slot name="front" />
      </div>
      <div class="face back-face">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isFlipped = ref(false)

const toggle = () => {
  isFlipped.value = !isFlipped.value
}

defineExpose({ toggle })
</script>

<style scoped>
.card-view {
  margin: 20px auto;
  perspective: 1000px;
  width: 400px;
  min-height: 400px;
}

.card {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  width: 100%;
  min-height: inherit;
}

.card.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  min-height: inherit;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.front-face {
  background: #fff;
  transform: rotateY(0deg);
}

.back-face {
  background: #f0f0f0;
  transform: rotateY(180deg);
}

@media (max-width: 800px) {
  .card-view {
    width: 300px;
    min-height: auto;
  }
}
</style>
