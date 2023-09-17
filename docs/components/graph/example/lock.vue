<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="changeLockStatus">{{ lockStatus }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext } from '../../../../src'

const graphRef = ref<GraphRef | null>(null)
const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    }
}

const lockStatus = ref<string>('unlocked')

const changeLockStatus = () => {
    if (lockStatus.value === 'unlocked') {
        graphRef.value!.lock(true)
        lockStatus.value = 'locked'
    } else {
        graphRef.value!.lock(false)
        lockStatus.value = 'unlocked'
    }
}
</script>

<style lang="less" scoped>
button {
    border: 1px solid #9c9c9c;
    padding: 7px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin: 0 auto;

    &:hover {
        color: #18a058;
        border-color: #18a058;
    }
}
</style>
