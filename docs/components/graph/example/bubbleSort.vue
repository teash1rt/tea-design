<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="bubbleSort">开始排序</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GraphRef, GraphContext, Position } from '../../../../src'

const graphRef = ref<GraphRef | null>(null)

const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 600
    },
    point: {
        pointCount: 0,
        initialPosition: []
    },
    edge: {
        connectionStatus: []
    }
}

type TextInfo = {
    content: string
    position: Position
}

const getPositions = () => {
    const initialPositions: Position[] = []

    for (let i = 0; i < 8; i++) {
        initialPositions.push({ x: 160 + i * 80, y: 250 })
    }

    return initialPositions
}

const textInfo: TextInfo[] = [
    {
        content: '冒泡排序算法演示',
        position: { x: 320, y: 200 }
    },
    {
        content: '冒泡排序核心代码',
        position: { x: 320, y: 100 }
    },
    {
        content: 'for (let i = 0; i < array.length - 1; i++) {',
        position: { x: 100, y: 150 }
    },
    {
        content: '    for (let j = 0; j < array.length - 1 - i; j++) {',
        position: { x: 100, y: 200 }
    },
    {
        content: '        if (array[j] > array[j + 1]) {',
        position: { x: 100, y: 250 }
    },
    {
        content: '            [array[j], array[j + 1]] = [array[j + 1], array[j]]',
        position: { x: 100, y: 300 }
    },
    {
        content: '        }',
        position: { x: 100, y: 350 }
    },
    {
        content: '    }',
        position: { x: 100, y: 400 }
    },
    {
        content: '}',
        position: { x: 100, y: 450 }
    },
    {
        content: '时间复杂度',
        position: { x: 260, y: 500 }
    },
    {
        content: ' O(n²) ',
        position: { x: 450, y: 500 }
    }
]

const array = [45, 78, 21, 92, 64, 10, 37, 53]

const ids: string[] = []

onMounted(() => {
    ids.push(graphRef.value!.setText(textInfo[0].content, textInfo[0].position, undefined, undefined, true))
})

let isSorting = false
const bubbleSort = async () => {
    if (isSorting) {
        return
    }
    isSorting = true
    graphRef.value!.delText(ids[0])
    ids.push(graphRef.value!.setText(textInfo[1].content, textInfo[1].position))
    await graphRef.value!.wait(2)
    for (let i = 2; i < 9; i++) {
        ids.push(graphRef.value!.setText(textInfo[i].content, textInfo[i].position, undefined, '25px Verdana'))
    }
    await graphRef.value!.wait(4)
    graphRef.value!.setTextColor(ids[2], '#f98a7b', 15, 37)
    graphRef.value!.setTextColor(ids[3], '#f98a7b', 20, 44)
    await graphRef.value!.wait(2)
    ids.push(graphRef.value!.setText(textInfo[9].content, textInfo[9].position))
    await graphRef.value!.wait(2)
    ids.push(graphRef.value!.setText(textInfo[10].content, textInfo[10].position, '#7dc7f4', 'bold italic 35px Arial'))
    await graphRef.value!.wait(4)
    for (let i = 1; i < textInfo.length; i++) {
        graphRef.value!.delText(ids[i])
    }
    await graphRef.value!.wait(2)
    const positions = getPositions()
    for (let i = 0; i < 8; i++) {
        graphRef.value!.addPoint(array[i], positions[i])
    }
    const arrayMap = [
        [45, 0],
        [78, 1],
        [21, 2],
        [92, 3],
        [64, 4],
        [10, 5],
        [37, 6],
        [53, 7]
    ]
    graphRef.value!.lock(true)
    for (let i = 0; i < arrayMap.length - 1; i++) {
        for (let j = 0; j < arrayMap.length - 1 - i; j++) {
            await Promise.all([
                graphRef.value!.blink(arrayMap[j][1], 1, '#da75d8', '#da75d8', '#000000'),
                graphRef.value!.blink(arrayMap[j + 1][1], 1, '#da75d8', '#da75d8', '#000000')
            ])
            if (arrayMap[j][0] > arrayMap[j + 1][0]) {
                await graphRef.value!.wait(0.5)
                await graphRef.value!.swap(arrayMap[j][1], arrayMap[j + 1][1])
                ;[arrayMap[j], arrayMap[j + 1]] = [arrayMap[j + 1], arrayMap[j]]
            }
        }
    }
    graphRef.value!.lock(false)
    isSorting = false
}
</script>

<style lang="less" scoped>
button {
    background-color: #bb00ff;
    padding: 10px 15px;
    margin: 0 auto;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
