<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" @hover="showInfo" title="github提交" :tipInfo="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data: { [key: string]: number } = {
    '2023-10-01': 1,
    '2023-10-07': 2,
    '2023-10-20': 3,
    '2023-11-01': 4,
    '2023-11-06': 5,
    '2023-11-12': 6,
    '2023-11-17': 7,
    '2023-11-21': 8,
    '2023-11-28': 9,
    '2023-11-30': 10,
    '2023-12-01': 11,
    '2023-12-06': 12,
    '2023-12-13': 13
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}共有${v['count']}次贡献` : `${v['date']}没有贡献`
}
</script>
