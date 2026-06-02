<template>
  <div class="space-page">
    <h1>3D Unicode 空间</h1>
    <p class="description">探索汉字在三维 Unicode 空间中的分布，拖拽旋转视角</p>
    
    <div class="controls">
      <button @click="toggleRotation" class="btn">
        {{ isRotating ? '暂停旋转' : '开始旋转' }}
      </button>
      <button @click="resetCamera" class="btn">重置视角</button>
      <button @click="toggleMode" class="btn">
        {{ mode === 'sphere' ? '立方体模式' : '球体模式' }}
      </button>
      <span class="stats">显示 {{ displayCount }} 个汉字</span>
    </div>
    
    <div ref="containerRef" class="canvas-container"></div>
    
    <div class="info-panel">
      <div class="info-item">
        <span class="info-label">鼠标左键</span>
        <span class="info-value">旋转视角</span>
      </div>
      <div class="info-item">
        <span class="info-label">鼠标滚轮</span>
        <span class="info-value">缩放</span>
      </div>
      <div class="info-item">
        <span class="info-label">鼠标右键</span>
        <span class="info-value">平移</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { MandarinItem } from '~/types'

const containerRef = ref<HTMLElement>()
const { mandarinData, loadMandarinData } = useMandarinData()
const isRotating = ref(true)
const displayCount = ref(0)
const mode = ref<'sphere' | 'cube'>('sphere')

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let characterMeshes: THREE.Mesh[] = []
let animationId: number

const colors = [
  0x5470c6, 0x91cc75, 0xfac858, 0xee6666, 0x73c0de,
  0x3ba272, 0xfc8452, 0x9a60b4, 0xea7ccc, 0x48b8d0
]

const createTextTexture = (char: string, color: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 128, 128)
  
  ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`
  ctx.font = '80px "仓耳今楷05-W01", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, 64, 64)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const createCharacterMesh = (char: string, position: THREE.Vector3, color: number) => {
  const texture = createTextTexture(char, color)
  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  })
  
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(position)
  mesh.userData = { char }
  return mesh
}

const generatePositions = (count: number, mode: 'sphere' | 'cube') => {
  const positions: THREE.Vector3[] = []
  
  for (let i = 0; i < count; i++) {
    if (mode === 'sphere') {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const radius = 30 + Math.random() * 20
      
      positions.push(new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ))
    } else {
      const size = 40
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size
      ))
    }
  }
  
  return positions
}

const initScene = () => {
  if (!containerRef.value) return
  
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)
  
  camera = new THREE.PerspectiveCamera(
    60,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 80)
  
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  containerRef.value.appendChild(renderer.domElement)
  
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  // 添加坐标轴辅助
  const axesHelper = new THREE.AxesHelper(50)
  scene.add(axesHelper)
}

const populateScene = () => {
  const sampleSize = Math.min(500, mandarinData.value.length)
  const sample = mandarinData.value.slice(0, sampleSize)
  const positions = generatePositions(sampleSize, mode.value)
  
  characterMeshes.forEach(mesh => scene.remove(mesh))
  characterMeshes = []
  
  sample.forEach((item, i) => {
    const char = String.fromCodePoint(item.codePoint)
    const color = colors[i % colors.length]!
    const position = positions[i]
    if (!position) return
    const mesh = createCharacterMesh(char, position, color)
    scene.add(mesh)
    characterMeshes.push(mesh)
  })
  
  displayCount.value = sampleSize
}

const toggleMode = () => {
  mode.value = mode.value === 'sphere' ? 'cube' : 'sphere'
  populateScene()
}

const toggleRotation = () => {
  isRotating.value = !isRotating.value
}

const resetCamera = () => {
  camera.position.set(0, 0, 80)
  controls.reset()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  if (isRotating.value) {
    characterMeshes.forEach(mesh => {
      mesh.lookAt(camera.position)
    })
  }
  
  controls.update()
  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!containerRef.value) return
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

onMounted(async () => {
  await loadMandarinData()
  initScene()
  populateScene()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  renderer?.dispose()
})
</script>

<style scoped>
.space-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 8px;
  color: var(--primary-color);
}

.description {
  color: #666;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  background: var(--secondary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #0c5a8e;
}

.stats {
  color: var(--primary-color);
  font-size: 14px;
}

.canvas-container {
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-panel {
  display: flex;
  gap: 24px;
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.info-label {
  font-weight: bold;
  color: var(--secondary-color);
  font-size: 13px;
}

.info-value {
  color: #666;
  font-size: 12px;
}

@media (max-width: 800px) {
  .canvas-container {
    height: 400px;
  }
  
  .info-panel {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
