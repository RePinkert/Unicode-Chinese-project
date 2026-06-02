<template>
  <div class="rain-page">
    <MatrixRain 
      :speed="speed" 
      :fontSize="fontSize" 
      :density="density"
      :noiseIntensity="noiseIntensity"
    />
    
    <div class="content-overlay">
      <h1>字符雨效果</h1>
      <p class="description">Matrix 风格的汉字雨背景</p>
      
      <div class="controls">
        <div class="control-group">
          <label>速度: {{ speed.toFixed(1) }}</label>
          <input type="range" v-model.number="speed" min="0.3" max="3" step="0.1" />
        </div>
        
        <div class="control-group">
          <label>字体大小: {{ fontSize }}px</label>
          <input type="range" v-model.number="fontSize" min="12" max="48" step="2" />
        </div>
        
        <div class="control-group">
          <label>密度: {{ Math.round(density * 100) }}%</label>
          <input type="range" v-model.number="density" min="0.5" max="3" step="0.1" />
        </div>
        
        <div class="control-group">
          <label>噪声强度: {{ Math.round(noiseIntensity * 100) }}%</label>
          <input type="range" v-model.number="noiseIntensity" min="0" max="1" step="0.05" />
        </div>
      </div>
      
      <div class="demo-card">
        <h2>预览区域</h2>
        <p>这是一个演示卡片，展示字符雨作为背景的效果</p>
        <div class="demo-chars">
          <span v-for="char in demoChars" :key="char" class="demo-char">{{ char }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const speed = ref(1)
const fontSize = ref(24)
const density = ref(1.5)
const noiseIntensity = ref(0.3)

const demoChars = ['中', '文', '字', '符', '雨', '效', '果']
</script>

<style scoped>
.rain-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.content-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

h1 {
  color: #0F0;
  text-shadow: 0 0 10px #0F0;
  margin-bottom: 8px;
  font-size: 2.5em;
}

.description {
  color: #0F0;
  margin-bottom: 30px;
  opacity: 0.8;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  border: 1px solid #0F0;
  min-width: 300px;
  margin-bottom: 30px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  color: #0F0;
  font-size: 14px;
}

input[type="range"] {
  width: 100%;
  accent-color: #0F0;
}

.demo-card {
  padding: 32px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  border: 1px solid #0F0;
  text-align: center;
  max-width: 500px;
}

.demo-card h2 {
  color: #0F0;
  margin-bottom: 12px;
}

.demo-card p {
  color: #0F0;
  opacity: 0.8;
  margin-bottom: 20px;
}

.demo-chars {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.demo-char {
  font-size: 32px;
  color: #FFF;
  text-shadow: 0 0 10px #0F0;
}
</style>
