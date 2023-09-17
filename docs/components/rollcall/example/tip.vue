<template>
    <div class="row">
        <t-rollcall :data="target" startText="晚上跑几圈" />
        <t-rollcall noDataText="没有数据哦" />
    </div>
</template>

<script setup lang="ts">
const target = ['不跑', 1, 3, 5, 7, 9]
</script>
