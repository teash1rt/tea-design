<template>
    <div class="row">
        <t-radar-chart :context="context" />
    </div>
</template>

<script setup lang="ts">
import type { RadarChartContext } from '../../../../src/index'

const context: RadarChartContext = {
    style: {
        edgeCount: 5
    },
    axis: {
        labelStyle: 'bold 24px sans-serif',
        labelColor: 'grey',
        axisMax: [100, 100, 100, 100, 100]
    },
    data: [
        [85, 30, 30, 30, 30],
        [30, 85, 30, 30, 30],
        [30, 30, 85, 30, 30],
        [30, 30, 30, 85, 30],
        [30, 30, 30, 30, 85]
    ]
}
</script>
