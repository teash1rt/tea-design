<template>
    <t-graph ref="graphRef" :context="context" />
    <span>
        <button @click="swap">swap</button>
        <button @click="shallowSwap">shallowSwap</button>
        <button @click="renderEdge">renderEdge</button>
        <button @click="addPoint">addPoint</button>
        <button @click="delPoint">delPoint</button>
        <button @click="addEdge">addEdge</button>
        <button @click="delEdge">delEdge</button>
        <button @click="setContent">setContent</button>
        <button @click="setPointColor">setPointColor</button>
        <button @click="setEdgeColor">setEdgeColor</button>
        <button @click="setText">setText</button>
        <button @click="setTextColor1">setTextColor1</button>
        <button @click="setTextColor2">setTextColor2</button>
        <button @click="delText">delText</button>
        <button @click="blink">blink</button>
        <!-- <button @click="bubbleSort">bubbleSort</button> -->
        <button @click="heapSort">heapSort</button>
    </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext, Position } from '../../src'

const graphRef = ref<GraphRef | null>(null)

const initialPositions: Position[] = []

for (let i = 0; i < 8; i++) {
    initialPositions.push({ x: 520 + i * 60, y: 80 })
}

const context: GraphContext = {
    point: {
        pointCount: 8,
        initialPosition: initialPositions,
        content: [6, 2, 1, 3, 5, 4, 7, 0]
    },
    edge: {
        connectionStatus: [
            [1, 2],
            [2, 3],
            [0, 4],
            [2, 5],
            [3, 1],
            [2, 0],
            [4, 7],
            [2, 7],
            [5, 3],
            [0, 5]
        ]
    }
}

const swap = async () => {
    await graphRef.value!.swap(0, 1)
    console.log('finish swap')
}

const shallowSwap = () => {
    graphRef.value!.shallowSwap(1, 0)
    console.log('finish shallow swap')
}

const renderEdge = async () => {
    await graphRef.value!.renderEdge(2, 3, '#ff0000')
    console.log('finish render edge')
}

const addPoint = () => {
    graphRef.value!.addPoint('r', { x: 100, y: 100 })
    console.log('finish add point')
}

const addEdge = () => {
    graphRef.value!.addEdge(2, 5)
    console.log('finish add edge')
}

const delEdge = () => {
    graphRef.value!.delEdge(0, 3)
    console.log('finish del edge')
}

const delPoint = () => {
    graphRef.value!.delPoint(0)
    console.log('finish del point')
}

const setPointColor = () => {
    graphRef.value!.setPointColor(1)
    console.log('finish del point')
}

const setEdgeColor = () => {
    graphRef.value!.setEdgeColor(0, 3, '#00ff00')
    console.log('finish set edge color')
}

let textStamp: string

const setText = () => {
    textStamp = graphRef.value!.setText(
        '这是一段测试文字',
        { x: 200 + Math.random() * 10, y: 400 + Math.random() * 10 },
        undefined,
        undefined
    )
}

const setTextColor1 = () => {
    graphRef.value!.setTextColor(textStamp, '#ff0000', 1, 3)
}

const setTextColor2 = () => {
    graphRef.value!.setTextColor(textStamp, '#00ff00', 2, 4)
}

const delText = () => {
    graphRef.value!.delText(textStamp)
}

const blink = async () => {
    await Promise.all([
        graphRef.value!.blink(5, 5, '#ffc577', '#ffc577', '#000000'),
        graphRef.value!.blink(6, 5, '#fe77b5', '#fe77b5', '#000000')
    ])
    console.log('finish blink')
}

const setContent = () => {
    graphRef.value!.setContent(0, 3)
    console.log('finish set content')
}

const arr = [
    [6, 0],
    [2, 1],
    [1, 2],
    [3, 3],
    [5, 4],
    [4, 5],
    [7, 6],
    [0, 7]
]

const getHeapPosition = (floor: number, order: number) => {
    return { x: 100 + (750 * (2 * order - 1)) / (1 << floor), y: 100 * floor + 100 }
}

const buildMaxHeap = async (n: number, i: number) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2
    if (left < n && arr[left][0] > arr[largest][0]) {
        largest = left
    }
    if (right < n && arr[right][0] > arr[largest][0]) {
        largest = right
    }

    if (largest !== i) {
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        await graphRef.value!.wait(0.2)
        await graphRef.value!.shallowSwap(arr[i][1], arr[largest][1])
        await buildMaxHeap(n, largest)
    }
}

let stamp: string
const textPosition = { x: 500, y: 650 }

const heapSort = async () => {
    graphRef.value!.lock(true)
    stamp = graphRef.value!.setText('初始化堆', textPosition)
    await graphRef.value!.wait(2)
    let index: number = 0
    for (let i = 1; i <= Math.floor(Math.log2(arr.length)) + 1; i++) {
        for (let j = 0; j < 1 << (i - 1) && index < arr.length; j++, index++) {
            const position = getHeapPosition(i, j + 1)
            await graphRef.value!.moveTo(index, position)
        }
    }
    await graphRef.value!.wait(1)
    for (let i = 0; i < arr.length; i++) {
        graphRef.value!.addEdge(i, 2 * i + 1)
        graphRef.value!.addEdge(i, 2 * i + 2)
    }

    graphRef.value!.delText(stamp)
    stamp = graphRef.value!.setText('构建最大堆', textPosition)
    await graphRef.value!.wait(2)
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        await buildMaxHeap(arr.length, i)
    }

    graphRef.value!.delText(stamp)
    stamp = graphRef.value!.setText('交换堆顶和堆底后取出堆底并调整最大堆', textPosition)
    await graphRef.value!.wait(2)
    for (let i = arr.length - 1; i > 0; i--) {
        await Promise.all([graphRef.value!.blink(arr[0][1], 1), graphRef.value!.blink(arr[i][1], 1)])
        await graphRef.value!.wait(0.2)
        await graphRef.value!.shallowSwap(arr[0][1], arr[i][1])
        await graphRef.value!.wait(0.2)
        for (let j of graphRef.value!.getConnectedPoints(arr[0][1])) {
            graphRef.value!.delEdge(arr[0][1], j)
            await graphRef.value!.moveTo(arr[0][1], {
                x: 520 + i * 60,
                y: 80
            } as Position)
            await graphRef.value!.wait(0.2)
        }
        ;[arr[0], arr[i]] = [arr[i], arr[0]]
        await buildMaxHeap(i, 0)
    }
    await graphRef.value!.moveTo(arr[0][1], {
        x: 520,
        y: 80
    } as Position)
    graphRef.value!.lock(false)
}
</script>

<style lang="less" scoped>
span {
    display: flex;
}
</style>
