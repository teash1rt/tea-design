<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" theme="info" :col="15" />
    </div>
    <br />
    <br />
    <div class="row">
        <t-calendar-heatmap :mapData="data" theme="wine" :col="45" />
    </div>
</template>

<script setup lang="ts">
import { LIST1 } from '../get-date-list'

const data: { [key: string]: number } = {
    [LIST1[0]]: 1,
    [LIST1[1]]: 2,
    [LIST1[2]]: 3,
    [LIST1[3]]: 4,
    [LIST1[4]]: 5,
    [LIST1[5]]: 6,
    [LIST1[6]]: 7,
    [LIST1[7]]: 8,
    [LIST1[8]]: 9,
    [LIST1[9]]: 10,
    [LIST1[10]]: 11,
    [LIST1[11]]: 12,
    [LIST1[12]]: 13
}
</script>
