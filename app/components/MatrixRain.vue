<template>
  <div class="matrix-rain-wrapper">
    <canvas ref="canvasRef" class="matrix-rain"></canvas>
  </div>
</template>

<script setup lang="ts">
interface Props {
  speed?: number
  fontSize?: number
  density?: number
  noiseIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 1,
  fontSize: 18,
  density: 1,
  noiseIntensity: 0.3
})

const canvasRef = ref<HTMLCanvasElement>()
let animationId: number

interface Drop {
  y: number
  speed: number
  char: string
}

interface Column {
  drops: Drop[]
}

let columns: Column[] = []

const hanziChars = '的一是不了人我在有他这为之大来以个中上们到说国和地也子时道出会三要于下得可你年生自学对所家用当天过小作理公多日方如已经把与那由此种长好向表市万老位成最新明月前行从样子两开其问定理点心比分十还用都手高第加进通少内位目太头正四气五入交白平间日月水火山石田土木金人口手足'

const getRandomHanzi = (): string => {
  return hanziChars[Math.floor(Math.random() * hanziChars.length)] || '字'
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const parent = canvas.parentElement?.parentElement
  if (!parent) return

  const rect = parent.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  // 列间距改为 1.0，无额外间距
  const colWidth = props.fontSize
  const colCount = Math.ceil(canvas.width / colWidth)

  columns = []

  // density 1.0 = 每列 1 个字符
  // density 2.0 = 每列 2 个字符（或重叠列）
  const dropsPerCol = Math.max(1, Math.floor(props.density))
  const extraProb = props.density - dropsPerCol

  for (let i = 0; i < colCount; i++) {
    const dropCount = dropsPerCol + (Math.random() < extraProb ? 1 : 0)
    const drops: Drop[] = []

    for (let j = 0; j < dropCount; j++) {
      drops.push({
        y: Math.random() * canvas.height,
        speed: 2 + Math.random() * 4,
        char: getRandomHanzi()
      })
    }

    columns.push({ drops })
  }

  // 初始清空为黑色
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const drawNoise = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const intensity = props.noiseIntensity * 30

  for (let i = 0; i < data.length; i += 16) {
    const noise = (Math.random() - 0.5) * intensity
    const r = data[i] ?? 0
    const g = data[i + 1] ?? 0
    const b = data[i + 2] ?? 0
    data[i] = Math.max(0, Math.min(255, r + noise))
    data[i + 1] = Math.max(0, Math.min(255, g + noise))
    data[i + 2] = Math.max(0, Math.min(255, b + noise))
  }

  ctx.putImageData(imageData, 0, 0)
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')!

  // 半透明黑色覆盖，产生拖尾残影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const colWidth = props.fontSize

  columns.forEach((col, i) => {
    const x = i * colWidth

    col.drops.forEach((drop) => {
      // 绘制头部字符（亮绿色）
      ctx.fillStyle = '#AAFFAA'
      ctx.font = `bold ${props.fontSize}px "仓耳今楷05-W01", "Microsoft YaHei", monospace`
      ctx.fillText(drop.char, x, drop.y)

      // 更新位置
      drop.y += drop.speed * props.speed

      // 随机更换字符
      if (Math.random() < 0.05) {
        drop.char = getRandomHanzi()
      }

      // 超出屏幕后重置
      if (drop.y > canvas.height + props.fontSize) {
        drop.y = -props.fontSize * (1 + Math.random() * 3)
        drop.char = getRandomHanzi()
        drop.speed = 2 + Math.random() * 4
      }
    })
  })

  // 添加噪声特效
  if (props.noiseIntensity > 0) {
    drawNoise(ctx, canvas.width, canvas.height)
  }

  animationId = requestAnimationFrame(draw)
}

const handleResize = () => {
  initCanvas()
}

watch(() => props.fontSize, () => {
  initCanvas()
})

onMounted(() => {
  nextTick(() => {
    initCanvas()
    animationId = requestAnimationFrame(draw)
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.matrix-rain-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.matrix-rain {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
