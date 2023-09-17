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
</script>
