<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="setText">显示文字</button>
    <button @click="delText">删除文字</button>
    <button @click="setTextColor">样式</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext } from '../../../../src'

const graphRef = ref<GraphRef | null>(null)
const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    },
    point: {
        pointCount: 0,
        initialPosition: []
    },
    edge: {
        connectionStatus: []
    }
}

let id: string
const setText = () => {
    id = graphRef.value!.setText('这是一段测试文字', { x: 300, y: 100 })
}

const delText = () => {
    graphRef.value!.delText(id)
}

const setTextColor = () => {
    graphRef.value!.setTextColor(id, '#0000ff', 4, 5)
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
