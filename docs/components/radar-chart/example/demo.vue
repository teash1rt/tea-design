<template>
    <div class="row">
        <t-radar-chart :context="context" />
    </div>
</template>

<script setup lang="ts">
import type { RadarChartContext } from '../../../../src'

const context: RadarChartContext = {
    style: {
        canvasSize: 550,
        baseLineCount: 1,
        mainColor: ['#0083d0'],
        fillColor: ['#29a7ff']
    },
    axis: {
        label: ['属性A', '属性B', '属性C', '属性D', '属性E', '属性F'],
        axisMax: [120, 70, 150, 80, 90, 25]
    },
    data: [[85, 57, 88, 36, 72, 19]]
}
</script>
