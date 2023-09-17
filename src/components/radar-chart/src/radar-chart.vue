<template>
    <div class="t-radar-chart">
        <canvas ref="radarRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RadarChartProps, defaultContext, RadarChartEmits } from './lib/settings'
import type { RadarChartContextRequired } from './lib/settings'
import { RadarChart } from './lib/RadarChart'
import { merge } from '../../../common/functions'
import '../../../styles/radar-chart.less'

const props = defineProps(RadarChartProps)
const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
const mergeContext = merge(defaultContextCopy, props.context) as RadarChartContextRequired
const emit = defineEmits(RadarChartEmits)

const radarRef = ref<HTMLCanvasElement | null>(null)

let lastInsideElement: number | null = null

onMounted(() => {
    radarRef.value!.width = mergeContext.style.canvasSize
    radarRef.value!.height = mergeContext.style.canvasSize
    new RadarChart(radarRef.value!, mergeContext)
    radarRef.value!.addEventListener('hover', event => {
        const insideElement = (event as CustomEvent<number | null>).detail
        if (insideElement !== lastInsideElement) {
            emit('hover', insideElement)
            lastInsideElement = insideElement
        }
    })
})

defineOptions({
    name: 't-radar-chart'
})
</script>
