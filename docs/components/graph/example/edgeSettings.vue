<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="addEdge">增加边</button>
    <button @click="delEdge">删除边</button>
    <button @click="setEdgeColor">样式</button>
    <button @click="renderEdge">渲染</button>
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
        pointCount: 4,
        initialPosition: [
            { x: 300, y: 100 },
            { x: 500, y: 100 },
            { x: 300, y: 250 },
            { x: 500, y: 250 }
        ],
        content: [0, 1, 2, 3]
    },
    edge: {
        connectionStatus: [
            [0, 1],
            [0, 2],
            [1, 2]
        ]
    }
}

const addEdge = () => {
    graphRef.value!.addEdge(2, 3, '#ff0000')
}

const delEdge = () => {
    graphRef.value!.delEdge(0, 1)
}

const setEdgeColor = () => {
    graphRef.value!.setEdgeColor(1, 2, '#a986ff')
}

const renderEdge = () => {
    graphRef.value!.renderEdge(2, 0, '#e3008c')
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
