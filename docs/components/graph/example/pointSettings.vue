<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="addPoint">增加点</button>
    <button @click="delPoint">删除点</button>
    <button @click="move">移动</button>
    <button @click="swap">交换</button>
    <button @click="shallowSwap">浅交换</button>
    <button @click="setPointColor">样式</button>
    <button @click="blink">闪烁</button>
    <button @click="setContent">描述信息</button>
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
            { x: 300, y: 250 },
            { x: 500, y: 250 },
            { x: 300, y: 50 },
            { x: 500, y: 50 }
        ],
        content: ['A', 'B', 'C', 'D']
    },
    edge: {
        connectionStatus: [
            [0, 1],
            [0, 2],
            [1, 3],
            [0, 3],
            [1, 2]
        ]
    }
}

let pointId = 3
const addPoint = () => {
    pointId += 1
    graphRef.value!.addPoint('P', { x: Math.random() * 800, y: Math.random() * 300 }, '#ff9db1')
}

const delPoint = () => {
    graphRef.value!.delPoint(pointId)
    pointId -= 1
}

const move = async () => {
    await graphRef.value!.moveTo(0, { x: Math.random() * 800, y: Math.random() * 300 })
}

const swap = async () => {
    await graphRef.value!.swap(0, 3)
}

const shallowSwap = async () => {
    await graphRef.value!.shallowSwap(0, 3)
}

const setPointColor = () => {
    graphRef.value!.setPointColor(0, '#91c350', '#91c350', '#e7e7e7')
}

const blink = async () => {
    await graphRef.value!.blink(1, 3, '#f39ec3', '#f39ec3', '#ffffff')
}

const setContent = () => {
    graphRef.value!.setContent(2, Math.floor(Math.random() * 10))
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
