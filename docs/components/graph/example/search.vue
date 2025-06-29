<template>
    <t-graph ref="graphRef" :context="context" />
    <div class="box">
        <input type="text" placeholder=" 输入起始点" v-model="startPoint" />
        <input type="radio" name="options" value="bfs" v-model="searchMethod" />
        <div for="bfs">bfs</div>
        <input type="radio" name="options" value="dfs" v-model="searchMethod" />
        <div for="dfs">dfs</div>
        <button @click="search">开始搜索</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext, Position } from '../../../../src'

const searchMethod = ref<string>('bfs')
const startPoint = ref<number | null>(null)
const graphRef = ref<GraphRef | null>(null)

const initialPositions: Position[] = [
    { x: 380, y: 100 },
    { x: 280, y: 250 },
    { x: 480, y: 250 },
    { x: 480, y: 550 },
    { x: 180, y: 400 },
    { x: 580, y: 400 },
    { x: 380, y: 400 }
]

const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 600
    },
    point: {
        pointCount: 7,
        initialPosition: initialPositions,
        content: [0, 1, 2, 3, 4, 5, 6]
    },
    edge: {
        connectionStatus: [
            [0, 1],
            [1, 2],
            [0, 2],
            [3, 6],
            [6, 4],
            [2, 6],
            [5, 3],
            [1, 4]
        ]
    }
}

type Node = {
    idx: number
    from: number | null
    dis?: number
}

let isSearching = false
const search = () => {
    if (
        startPoint.value !== null &&
        !Number.isNaN(startPoint.value) &&
        startPoint.value >= 0 &&
        startPoint.value < 8 &&
        !isSearching
    ) {
        isSearching = true
        searchMethod.value === 'bfs' ? bfs(Number(startPoint.value)) : dfs(Number(startPoint.value))
    }
}

const bfs = async (start: number) => {
    const graph = graphRef.value!.getGraph()
    const queue: Node[] = [{ idx: start, from: null, dis: 0 }]
    const flag = Array(7).fill(false)
    const bfsData: Record<number, Node[]> = {}
    flag[start] = true
    graphRef.value!.setPointColor(start, '#0ea0cd', '#ffffff', '#000000')
    await graphRef.value!.wait(0.5)
    while (queue.length) {
        const header = queue.shift()!
        for (let pointIndex of graph[header.idx]) {
            if (flag[pointIndex]) {
                continue
            }

            queue.push({ idx: pointIndex, from: header.idx, dis: header.dis! + 1 })
            String(header.dis! + 1) in bfsData
                ? bfsData[header.dis! + 1].push({ idx: pointIndex, from: header.idx, dis: header.dis! + 1 })
                : (bfsData[header.dis! + 1] = [{ idx: pointIndex, from: header.idx, dis: header.dis! + 1 }])
            flag[pointIndex] = true
        }
    }

    for (let key of Object.keys(bfsData)) {
        const pointToRender: Promise<void>[] = []
        for (let node of bfsData[Number(key)]) {
            if (node.from) {
                pointToRender.push(graphRef.value!.renderEdge(node.from, node.idx, '#0ea0cd'))
            }
        }
        await Promise.all(pointToRender)
        await graphRef.value!.wait(0.2)
        for (let node of bfsData[Number(key)]) {
            graphRef.value!.setPointColor(node.idx, '#0ea0cd', '#ffffff', '#000000', true)
        }
    }
    await graphRef.value!.wait(2)
    for (let key of Object.keys(bfsData)) {
        for (let node of bfsData[Number(key)]) {
            if (node.from) {
                graphRef.value!.setEdgeColor(node.from, node.idx, '#000000', true)
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        graphRef.value!.setPointColor(i, '#000000', '#ffffff', '#000000', true)
    }
    isSearching = false
}

const dfs = async (start: number) => {
    const graph = graphRef.value!.getGraph()
    const stack: Node[] = [{ idx: start, from: null }]
    const flag = Array(7).fill(false)
    graphRef.value!.setPointColor(start, '#0ea0cd', '#ffffff', '#000000')
    await graphRef.value!.wait(0.5)
    const renderEdges: number[][] = []
    while (stack.length) {
        const top = stack.pop()!
        if (flag[top.idx]) {
            continue
        }
        if (top.from !== null) {
            await graphRef.value!.renderEdge(top.from, top.idx, '#0ea0cd')
            await graphRef.value!.wait(0.2)
            graphRef.value!.setPointColor(top.idx, '#0ea0cd', '#ffffff', '#000000', true)
            renderEdges.push([top.from, top.idx])
        }
        flag[top.idx] = true
        for (let pointIndex of graph[top.idx]) {
            if (flag[pointIndex]) {
                continue
            }
            stack.push({ idx: pointIndex, from: top.idx })
        }
    }
    await graphRef.value!.wait(2)
    for (let edges of renderEdges) {
        graphRef.value!.setEdgeColor(edges[0], edges[1], '#000000', true)
    }
    for (let i = 0; i < 7; i++) {
        graphRef.value!.setPointColor(i, '#000000', '#ffffff', '#000000', true)
    }
    isSearching = false
}
</script>

<style lang="less" scoped>
button {
    background-color: #00aeec;
    padding: 10px 15px;
    margin: 0 auto;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}

.box {
    display: flex;
    gap: 30px;
    margin: 0 auto;
    input {
        border: 1px solid #b6b6b6;
        height: 40px;
    }
    div {
        display: flex;
        align-items: center;
    }
}
</style>
