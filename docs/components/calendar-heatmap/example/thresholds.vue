<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" :thresholds="thresholds" @hover="showInfo" title="降水量" :tipInfo="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const thresholds: number[] = [100, 200, 300, 400]
const data: { [key: string]: number } = {
    '2023-09-21': 134,
    '2023-09-22': 27,
    '2023-09-25': 388,
    '2023-12-01': 400,
    '2023-11-06': 5,
    '2023-11-12': 610,
    '2023-10-11': 241,
    '2023-11-21': 238,
    '2023-11-24': 190,
    '2023-12-31': 10,
    '2023-09-11': 111,
    '2023-12-09': 120,
    '2023-12-15': 130
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}\n降水量：${v['count']}mm` : `${v['date']}\n无降水`
}
</script>
