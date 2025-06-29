<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" :thresholds="thresholds" @hover="showInfo" title="降水量" :tipInfo="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LIST2 } from '../get-date-list'

const thresholds: number[] = [100, 200, 300, 400]
const data: { [key: string]: number } = {
    [LIST2[0]]: 134,
    [LIST2[1]]: 27,
    [LIST2[2]]: 388,
    [LIST2[3]]: 400,
    [LIST2[4]]: 5,
    [LIST2[5]]: 610,
    [LIST2[6]]: 241,
    [LIST2[7]]: 238,
    [LIST2[8]]: 190,
    [LIST2[9]]: 10,
    [LIST2[10]]: 111,
    [LIST2[11]]: 120,
    [LIST2[12]]: 130
}

const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}\n降水量：${v['count']}mm` : `${v['date']}\n无降水`
}
</script>
