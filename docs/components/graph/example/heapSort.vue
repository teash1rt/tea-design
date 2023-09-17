<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="heapSort">开始排序</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext, Position } from '../../../../src'

const graphRef = ref<GraphRef | null>(null)

const initialPositions: Position[] = []

for (let i = 0; i < 8; i++) {
    initialPositions.push({ x: 240 + i * 60, y: 40 })
}

const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 600
    },
    point: {
        pointCount: 8,
        initialPosition: initialPositions,
        content: [6, 2, 1, 3, 5, 4, 7, 0],
        withoutRepulsion: true
    },
    edge: {
        connectionStatus: []
    }
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
    return { x: 50 + (750 * (2 * order - 1)) / (1 << floor), y: 80 * floor + 40 }
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
        await graphRef.value!.shallowSwap(arr[i][1], arr[largest][1])
        await graphRef.value!.wait(0.3)
        await buildMaxHeap(n, largest)
    }
}

let id: string
let isSorting = false
const heapSort = async () => {
    if (isSorting) {
        return
    }

    isSorting = true
    graphRef.value!.lock(true)
    id = graphRef.value!.setText('初始化堆', { x: 380, y: 500 })
    await graphRef.value!.wait(1)
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

    graphRef.value!.delText(id)
    id = graphRef.value!.setText('构建最大堆', { x: 360, y: 500 })
    await graphRef.value!.wait(1)
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        await buildMaxHeap(arr.length, i)
    }

    graphRef.value!.delText(id)
    id = graphRef.value!.setText('交换堆顶和堆底后取出堆底并调整最大堆', { x: 150, y: 500 })
    await graphRef.value!.wait(1)
    for (let i = arr.length - 1; i > 0; i--) {
        await graphRef.value!.wait(0.3)
        await Promise.all([graphRef.value!.blink(arr[0][1], 1), graphRef.value!.blink(arr[i][1], 1)])
        await graphRef.value!.shallowSwap(arr[0][1], arr[i][1])
        await graphRef.value!.wait(0.3)
        for (let j of graphRef.value!.getConnectedPoints(arr[0][1])) {
            graphRef.value!.delEdge(arr[0][1], j)
            await graphRef.value!.moveTo(arr[0][1], {
                x: 240 + i * 60,
                y: 40
            } as Position)
            await graphRef.value!.wait(0.3)
        }
        ;[arr[0], arr[i]] = [arr[i], arr[0]]
        await buildMaxHeap(i, 0)
    }
    await graphRef.value!.moveTo(arr[0][1], {
        x: 240,
        y: 40
    } as Position)
    graphRef.value!.lock(false)
    isSorting = false
}
</script>

<style lang="less" scoped>
button {
    background-color: #44bd87;
    padding: 10px 15px;
    margin: 0 auto;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
