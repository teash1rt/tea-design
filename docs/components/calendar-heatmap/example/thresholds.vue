<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" :thresholds="thresholds" @hover="showInfo" title="降水量" :tipInfo="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const thresholds: number[] = [100, 200, 300, 400]
const data: { [key: string]: number } = {
    '2023-06-21': 134,
    '2023-06-22': 27,
    '2023-06-25': 388,
    '2023-09-01': 400,
    '2023-08-06': 5,
    '2023-08-12': 610,
    '2023-07-11': 241,
    '2023-08-21': 238,
    '2023-08-24': 190,
    '2023-08-31': 10,
    '2023-06-11': 111,
    '2023-09-09': 120,
    '2023-09-15': 130
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}\n降水量：${v['count']}mm` : `${v['date']}\n无降水`
}
</script>
