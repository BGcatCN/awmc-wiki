<script setup>
import { ref, onMounted, computed } from 'vue'

const data = ref(null)
const loading = ref(true)
const error = ref(null)
const isCollapsed = ref(true)

const formatDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d} 00:00:00`
}

const fetchData = async () => {
  try {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const start = formatDate(now)
    const end = formatDate(tomorrow)
    
    const url = `https://stat.awmc.cc/api/realtime?type=req&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch stats')
    data.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const totalReq = computed(() => {
  if (!data.value || !data.value.points) return 0
  return data.value.points.reduce((acc, curr) => acc + curr[1], 0)
})

const maxPoint = computed(() => {
  if (!data.value || !data.value.points || data.value.points.length === 0) return 1
  return Math.max(...data.value.points.map(p => p[1]))
})

const chartPoints = computed(() => {
  if (!data.value || !data.value.points) return []
  // Simplified SVG path generator
  const width = 1000
  const height = 200
  const points = data.value.points
  if (points.length < 2) return []
  
  const step = width / (points.length - 1)
  return points.map((p, i) => {
    const x = i * step
    const y = height - (p[1] / maxPoint.value) * height
    return `${x},${y}`
  }).join(' ')
})
</script>

<template>
  <div class="stat-container">
    <div class="stat-header" @click="isCollapsed = !isCollapsed">
      <div class="stat-summary">
        <span class="stat-label">今日请求量</span>
        <span class="stat-value" v-if="loading">加载中...</span>
        <span class="stat-value" v-else-if="error">获取失败</span>
        <span class="stat-value" v-else>{{ totalReq.toLocaleString() }}</span>
      </div>
      <div class="stat-toggle">
        {{ isCollapsed ? '展开图表' : '收起图表' }}
        <span :class="['arrow', { rotated: !isCollapsed }]">▼</span>
      </div>
    </div>
    
    <transition name="fade">
      <div v-if="!isCollapsed" class="stat-content">
        <div v-if="loading" class="placeholder">数据加载中...</div>
        <div v-else-if="error" class="placeholder error">{{ error }}</div>
        <div v-else-if="data && data.points" class="chart-wrapper">
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" class="chart-svg">
            <polyline
              fill="none"
              stroke="var(--vp-c-brand-1)"
              stroke-width="2"
              :points="chartPoints"
            />
          </svg>
          <div class="chart-info">
            <span>{{ data.start.split(' ')[0] }}</span>
            <span>{{ data.end.split(' ')[0] }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.stat-container {
  margin: 1em 0 2em;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}

.stat-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.stat-header:hover {
  background-color: var(--vp-c-bg-alt);
}

.stat-summary {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.stat-value {
  font-size: 1.5em;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.stat-toggle {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 4px;
}

.arrow {
  font-size: 0.7em;
  transition: transform 0.3s;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.stat-content {
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.chart-wrapper {
  height: 120px;
  position: relative;
}

.chart-svg {
  width: 100%;
  height: 100px;
}

.chart-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}

.placeholder {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-3);
}

.error {
  color: var(--vp-c-danger-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
