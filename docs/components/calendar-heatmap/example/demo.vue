<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" @hover="showInfo" title="github提交" :tipInfo="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data: { [key: string]: number } = {
    '2023-07-01': 1,
    '2023-07-07': 2,
    '2023-07-20': 3,
    '2023-08-01': 4,
    '2023-08-06': 5,
    '2023-08-12': 6,
    '2023-08-17': 7,
    '2023-08-21': 8,
    '2023-08-28': 9,
    '2023-08-31': 10,
    '2023-09-01': 11,
    '2023-09-06': 12,
    '2023-09-13': 13
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}共有${v['count']}次贡献` : `${v['date']}没有贡献`
}
</script>
