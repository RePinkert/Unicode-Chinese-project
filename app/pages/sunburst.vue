<template>
  <div class="sunburst-page">
    <h1>Emoji 分组旭日图</h1>
    <p class="description">展示 Emoji 按 group → subgroup 的层级分布</p>
    
    <div class="controls">
      <button @click="resetChart" class="btn">重置视图</button>
      <span class="stats">共 {{ totalEmojis }} 个 Emoji</span>
    </div>
    
    <div ref="chartRef" class="chart-container"></div>
    
    <div class="legend">
      <div v-for="group in topGroups" :key="group.name" class="legend-item">
        <span class="legend-color" :style="{ background: group.color }"></span>
        <span class="legend-label">{{ group.name }} ({{ group.count }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EmojiItem } from '~/types'

const chartRef = ref<HTMLElement>()
const { emojis, loadEmojis } = useEmojiData()
const totalEmojis = ref(0)
let chart: echarts.ECharts | null = null

const topGroups = ref<{ name: string; count: number; color: string }[]>([])

const colors = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#48b8d0',
  '#c4ccd3', '#f5994e', '#7289ab', '#c14089', '#59678c'
]

const buildSunburstData = (emojis: EmojiItem[]) => {
  const groupMap = new Map<string, Map<string, EmojiItem[]>>()
  
  emojis.forEach(emoji => {
    if (!groupMap.has(emoji.group)) {
      groupMap.set(emoji.group, new Map())
    }
    const subgroupMap = groupMap.get(emoji.group)!
    if (!subgroupMap.has(emoji.subgroup)) {
      subgroupMap.set(emoji.subgroup, [])
    }
    subgroupMap.get(emoji.subgroup)!.push(emoji)
  })
  
  const data: any[] = []
  let colorIndex = 0
  
  groupMap.forEach((subgroupMap, groupName) => {
    const children: any[] = []
    let groupCount = 0
    
    subgroupMap.forEach((emojiList, subgroupName) => {
      children.push({
        name: subgroupName || 'Other',
        value: emojiList.length,
        itemStyle: { color: colors[colorIndex % colors.length] + '99' }
      })
      groupCount += emojiList.length
    })
    
    data.push({
      name: groupName,
      value: groupCount,
      children,
      itemStyle: { color: colors[colorIndex % colors.length] }
    })
    colorIndex++
  })
  
  return data
}

const initChart = () => {
  if (!chartRef.value || emojis.value.length === 0) return
  
  chart = echarts.init(chartRef.value)
  const sunburstData = buildSunburstData([...emojis.value])
  
  const option: echarts.EChartsOption = {
    title: {
      text: 'Emoji 分组分布',
      subtext: '点击扇区可下钻查看子分组',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 个 ({d}%)'
    },
    series: [{
      type: 'sunburst',
      data: sunburstData,
      radius: ['10%', '90%'],
      sort: 'desc',
      emphasis: {
        focus: 'ancestor'
      },
      levels: [
        {},
        {
          r0: '10%',
          r: '40%',
          itemStyle: { borderWidth: 2 },
          label: { rotate: 'tangential', fontSize: 12 }
        },
        {
          r0: '40%',
          r: '90%',
          label: { align: 'right', fontSize: 10 },
          itemStyle: { borderWidth: 1 }
        }
      ]
    }]
  }
  
  chart.setOption(option)
  
  // 统计顶级分组
  let colorIdx = 0
  topGroups.value = sunburstData.map(group => ({
    name: group.name as string,
    count: group.value as number,
    color: colors[colorIdx++ % colors.length]!
  }))
}

const resetChart = () => {
  chart?.dispatchAction({ type: 'restore' })
}

onMounted(async () => {
  await loadEmojis()
  totalEmojis.value = emojis.value.length
  nextTick(() => initChart())
})

onUnmounted(() => {
  chart?.dispose()
})

if (import.meta.client) {
  window.addEventListener('resize', () => {
    chart?.resize()
  })
}
</script>

<style scoped>
.sunburst-page {
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
  gap: 16px;
  margin-bottom: 20px;
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

.chart-container {
  width: 100%;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-label {
  font-size: 13px;
  color: var(--primary-color);
}

@media (max-width: 800px) {
  .chart-container {
    height: 400px;
  }
  
  .controls {
    flex-direction: column;
  }
}
</style>
