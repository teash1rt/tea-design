<template>
    <div class="row">
        <t-calendar-heatmap :mapData="data" @pick="logInfo" />
    </div>
</template>

<script setup lang="ts">
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
const logInfo = (v: { date: string; count: number | undefined }) => {
    console.log(v)
}
</script>
