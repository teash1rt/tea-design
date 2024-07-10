<template>
    <div class="t-radar-chart">
        <canvas ref="radarRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { merge } from '../../../common/functions'
import { RadarChartProps, defaultContext, RadarChartEmits } from './lib/settings'
import type { RadarChartContextRequired } from './lib/settings'
import { RadarChart } from './lib/RadarChart'
import '../../../styles/radar-chart.less'

const props = defineProps(RadarChartProps)
const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
const mergeContext = merge(defaultContextCopy, props.context) as RadarChartContextRequired
const emit = defineEmits(RadarChartEmits)

const radarRef = ref<HTMLCanvasElement | null>(null)

let lastInsideElement: number | null = null

const handleMouseMove = (e: Event) => {
    const insideElement = (e as CustomEvent<number | null>).detail
    if (insideElement !== lastInsideElement) {
        emit('hover', insideElement)
        lastInsideElement = insideElement
    }
}

onMounted(() => {
    radarRef.value!.width = mergeContext.style.canvasSize
    radarRef.value!.height = mergeContext.style.canvasSize
    new RadarChart(radarRef.value!, mergeContext)
    radarRef.value!.addEventListener('hover', handleMouseMove)
})

onBeforeUnmount(() => {
    radarRef.value!.removeEventListener('hover', handleMouseMove)
})

defineOptions({
    name: 't-radar-chart'
})
</script>
