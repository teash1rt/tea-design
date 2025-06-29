# 节点图 Graph

> 远吸近斥即是规律

可以用它制作节点图动画

## 基本使用

通过`context`属性传入类型为`GraphContext`的数据来设置节点图的初始信息，然后可通过声明一个`GraphRef`类型的响应式变量，来调用节点图的相关方法

<div class="card">
    <demo /> 
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph :context="context" />
</template>

<script setup lang="ts">
import type { GraphContext } from 'tea-design'

const context: GraphContext = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    }
}
</script>
```

```vue [ JavaScript ]
<template>
    <t-graph :context="context" />
</template>

<script setup lang="ts">
const context = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    }
}
</script>
```

:::

</details>

:::tip 它能做什么？

在介绍相关属性和方法前先给出几个应用示例

:::

### demo1 堆排序

<div class="card">
    <heapSort /> 
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="heapSort">开始排序</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext, Position } from 'tea-design'

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
```

```vue [ JavaScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="heapSort">开始排序</button>
</template>

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)

const initialPositions = []

for (let i = 0; i < 8; i++) {
    initialPositions.push({ x: 240 + i * 60, y: 40 })
}

const context = {
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

const getHeapPosition = (floor, order) => {
    return { x: 50 + (750 * (2 * order - 1)) / (1 << floor), y: 80 * floor + 40 }
}

const buildMaxHeap = async (n, i) => {
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
        await graphRef.value.shallowSwap(arr[i][1], arr[largest][1])
        await graphRef.value.wait(0.3)
        await buildMaxHeap(n, largest)
    }
}

let id
let isSorting = false
const heapSort = async () => {
    if (isSorting) {
        return
    }

    isSorting = true
    graphRef.value.lock(true)
    id = graphRef.value.setText('初始化堆', { x: 380, y: 500 })
    await graphRef.value.wait(1)
    let index = 0
    for (let i = 1; i <= Math.floor(Math.log2(arr.length)) + 1; i++) {
        for (let j = 0; j < 1 << (i - 1) && index < arr.length; j++, index++) {
            const position = getHeapPosition(i, j + 1)
            await graphRef.value.moveTo(index, position)
        }
    }
    await graphRef.value.wait(1)
    for (let i = 0; i < arr.length; i++) {
        graphRef.value.addEdge(i, 2 * i + 1)
        graphRef.value.addEdge(i, 2 * i + 2)
    }

    graphRef.value.delText(id)
    id = graphRef.value.setText('构建最大堆', { x: 360, y: 500 })
    await graphRef.value.wait(1)
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        await buildMaxHeap(arr.length, i)
    }

    graphRef.value.delText(id)
    id = graphRef.value.setText('交换堆顶和堆底后取出堆底并调整最大堆', { x: 150, y: 500 })
    await graphRef.value.wait(1)
    for (let i = arr.length - 1; i > 0; i--) {
        await graphRef.value.wait(0.3)
        await Promise.all([graphRef.value.blink(arr[0][1], 1), graphRef.value.blink(arr[i][1], 1)])
        await graphRef.value.shallowSwap(arr[0][1], arr[i][1])
        await graphRef.value.wait(0.3)
        for (let j of graphRef.value.getConnectedPoints(arr[0][1])) {
            graphRef.value.delEdge(arr[0][1], j)
            await graphRef.value.moveTo(arr[0][1], {
                x: 240 + i * 60,
                y: 40
            })
            await graphRef.value.wait(0.3)
        }
        ;[arr[0], arr[i]] = [arr[i], arr[0]]
        await buildMaxHeap(i, 0)
    }
    await graphRef.value.moveTo(arr[0][1], {
        x: 240,
        y: 40
    })
    graphRef.value.lock(false)
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
```

:::

</details>

### demo2 搜索

<div class="card">
    <search />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
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
import type { GraphRef, GraphContext, Position } from 'tea-design'

const graphRef = ref<GraphRef | null>(null)
const searchMethod = ref<string>('bfs')
const startPoint = ref<number | null>(null)

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
    const bfsData: { [key: number]: Node[] } = {}
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
        for (let node of bfsData[key]) {
            pointToRender.push(graphRef.value!.renderEdge(node.from, node.idx, '#0ea0cd'))
        }
        await Promise.all(pointToRender)
        await graphRef.value!.wait(0.2)
        for (let node of bfsData[key]) {
            graphRef.value!.setPointColor(node.idx, '#0ea0cd', '#ffffff', '#000000', true)
        }
    }
    await graphRef.value!.wait(2)
    for (let key of Object.keys(bfsData)) {
        for (let node of bfsData[key]) {
            graphRef.value!.setEdgeColor(node.from, node.idx, '#000000', true)
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
```

```vue [ JavaScript ]
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

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)
const searchMethod = ref('bfs')
const startPoint = ref(null)

const initialPositions = [
    { x: 380, y: 100 },
    { x: 280, y: 250 },
    { x: 480, y: 250 },
    { x: 480, y: 550 },
    { x: 180, y: 400 },
    { x: 580, y: 400 },
    { x: 380, y: 400 }
]

const context = {
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

const bfs = async start => {
    const graph = graphRef.value.getGraph()
    const queue = [{ idx: start, from: null, dis: 0 }]
    const flag = Array(7).fill(false)
    const bfsData = {}
    flag[start] = true
    graphRef.value.setPointColor(start, '#0ea0cd', '#ffffff', '#000000')
    await graphRef.value.wait(0.5)
    while (queue.length) {
        const header = queue.shift()
        for (let pointIndex of graph[header.idx]) {
            if (flag[pointIndex]) {
                continue
            }

            queue.push({ idx: pointIndex, from: header.idx, dis: header.dis + 1 })
            String(header.dis + 1) in bfsData
                ? bfsData[header.dis + 1].push({ idx: pointIndex, from: header.idx, dis: header.dis + 1 })
                : (bfsData[header.dis + 1] = [{ idx: pointIndex, from: header.idx, dis: header.dis + 1 }])
            flag[pointIndex] = true
        }
    }

    for (let key of Object.keys(bfsData)) {
        const pointToRender = []
        for (let node of bfsData[key]) {
            pointToRender.push(graphRef.value.renderEdge(node.from, node.idx, '#0ea0cd'))
        }
        await Promise.all(pointToRender)
        await graphRef.value.wait(0.2)
        for (let node of bfsData[key]) {
            graphRef.value.setPointColor(node.idx, '#0ea0cd', '#ffffff', '#000000', true)
        }
    }
    await graphRef.value.wait(2)
    for (let key of Object.keys(bfsData)) {
        for (let node of bfsData[key]) {
            graphRef.value.setEdgeColor(node.from, node.idx, '#000000', true)
        }
    }
    for (let i = 0; i < 7; i++) {
        graphRef.value.setPointColor(i, '#000000', '#ffffff', '#000000', true)
    }
    isSearching = false
}

const dfs = async start => {
    const graph = graphRef.value.getGraph()
    const stack = [{ idx: start, from: null }]
    const flag = Array(7).fill(false)
    graphRef.value.setPointColor(start, '#0ea0cd', '#ffffff', '#000000')
    await graphRef.value.wait(0.5)
    const renderEdges = []
    while (stack.length) {
        const top = stack.pop()
        if (flag[top.idx]) {
            continue
        }
        if (top.from !== null) {
            await graphRef.value.renderEdge(top.from, top.idx, '#0ea0cd')
            await graphRef.value.wait(0.2)
            graphRef.value.setPointColor(top.idx, '#0ea0cd', '#ffffff', '#000000', true)
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
    await graphRef.value.wait(2)
    for (let edges of renderEdges) {
        graphRef.value.setEdgeColor(edges[0], edges[1], '#000000', true)
    }
    for (let i = 0; i < 7; i++) {
        graphRef.value.setPointColor(i, '#000000', '#ffffff', '#000000', true)
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
```

:::

</details>

### demo3 冒泡排序

<div class="card">
    <bubbleSort />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="bubbleSort">开始排序</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GraphRef, GraphContext, Position } from 'tea-design'

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
```

```vue [ JavaScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="bubbleSort">开始排序</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const graphRef = ref(null)

const context = {
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

const getPositions = () => {
    const initialPositions = []

    for (let i = 0; i < 8; i++) {
        initialPositions.push({ x: 160 + i * 80, y: 250 })
    }

    return initialPositions
}

const textInfo = [
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

const ids = []

onMounted(() => {
    ids.push(graphRef.value.setText(textInfo[0].content, textInfo[0].position, undefined, undefined, true))
})

let isSorting = false
const bubbleSort = async () => {
    if (isSorting) {
        return
    }
    isSorting = true
    graphRef.value.delText(ids[0])
    ids.push(graphRef.value.setText(textInfo[1].content, textInfo[1].position))
    await graphRef.value.wait(2)
    for (let i = 2; i < 9; i++) {
        ids.push(graphRef.value.setText(textInfo[i].content, textInfo[i].position, undefined, '25px Verdana'))
    }
    await graphRef.value.wait(4)
    graphRef.value.setTextColor(ids[2], '#f98a7b', 15, 37)
    graphRef.value.setTextColor(ids[3], '#f98a7b', 20, 44)
    await graphRef.value.wait(2)
    ids.push(graphRef.value.setText(textInfo[9].content, textInfo[9].position))
    await graphRef.value.wait(2)
    ids.push(graphRef.value.setText(textInfo[10].content, textInfo[10].position, '#7dc7f4', 'bold italic 35px Arial'))
    await graphRef.value.wait(4)
    for (let i = 1; i < textInfo.length; i++) {
        graphRef.value.delText(ids[i])
    }
    await graphRef.value.wait(2)
    const positions = getPositions()
    for (let i = 0; i < 8; i++) {
        graphRef.value.addPoint(array[i], positions[i])
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
    graphRef.value.lock(true)
    for (let i = 0; i < arrayMap.length - 1; i++) {
        for (let j = 0; j < arrayMap.length - 1 - i; j++) {
            await Promise.all([
                graphRef.value.blink(arrayMap[j][1], 1, '#da75d8', '#da75d8', '#000000'),
                graphRef.value.blink(arrayMap[j + 1][1], 1, '#da75d8', '#da75d8', '#000000')
            ])
            if (arrayMap[j][0] > arrayMap[j + 1][0]) {
                await graphRef.value.wait(0.5)
                await graphRef.value.swap(arrayMap[j][1], arrayMap[j + 1][1])
                ;[arrayMap[j], arrayMap[j + 1]] = [arrayMap[j + 1], arrayMap[j]]
            }
        }
    }
    graphRef.value.lock(false)
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
```

:::

</details>

## 参数定义

`GraphContext`中所有属性均为可选项，如果没有传入则会与默认值合并

传入数据时应保证数据的合理性和一致性，详情请参考下面的类型定义说明

```ts
// GraphContext 定义
type GraphContext = {
    style?: {
        canvasWidth?: number // 节点图宽度
        canvasHeight?: number // 节点图高度
    }
    point?: {
        pointCount?: number // 初始点数
        radius?: number // 点的半径
        content?: (string | number)[] // 每个点显示的内容（长度应与 pointCount 保持一致）
        initialPosition?: Position[] // 每个点初始的位置（第一维长度应与 pointCount 保持一致）
        arcColor?: string // 点的圆弧颜色
        fillColor?: string // 点的填充颜色
        fontColor?: string // 点中字体颜色
        withoutRepulsion?: boolean // 是否取消拖拽时不连接两点间的排斥力
    }
    edge?: {
        connectionStatus?: number[][] // 节点连接情况
        distance?: number // 拖拽时边的最适应长度
        color?: string // 边的颜色
    }
}

// GraphContext 默认值
const defaultContext: GraphContextRequired = {
    style: {
        canvasWidth: 1000,
        canvasHeight: 800
    },
    point: {
        pointCount: 3,
        radius: 22,
        content: [0, 1, 2],
        initialPosition: [
            { x: 300, y: 100 },
            { x: 500, y: 100 },
            { x: 400, y: 245 }
        ],
        arcColor: '#000000',
        fillColor: '#ffffff',
        fontColor: '#000000',
        withoutRepulsion: false
    },
    edge: {
        connectionStatus: [
            [0, 1],
            [1, 2],
            [0, 2]
        ],
        distance: 150,
        color: '#000000'
    }
}

// Position 类型定义
type Position = {
    x: number
    y: number
}
```

## 点

<div class="card">
    <pointSettings />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
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
import type { GraphRef, GraphContext } from 'tea-design'

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
```

```vue [ JavaScript ]
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

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)
const context = {
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
    graphRef.value.addPoint('P', { x: Math.random() * 800, y: Math.random() * 300 }, '#ff9db1')
}

const delPoint = () => {
    graphRef.value.delPoint(pointId)
    pointId -= 1
}

const move = async () => {
    await graphRef.value.moveTo(0, { x: Math.random() * 800, y: Math.random() * 300 })
}

const swap = async () => {
    await graphRef.value.swap(0, 3)
}

const shallowSwap = async () => {
    await graphRef.value.shallowSwap(0, 3)
}

const setPointColor = () => {
    graphRef.value.setPointColor(0, '#91c350', '#91c350', '#e7e7e7')
}

const blink = async () => {
    await graphRef.value.blink(1, 3, '#f39ec3', '#f39ec3', '#ffffff')
}

const setContent = () => {
    graphRef.value.setContent(2, Math.floor(Math.random() * 10))
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
```

:::

</details>

### 增加与删除

-   增加

点的编号规则是从0开始且递增的

```ts
addPoint = (
    content: string | number | undefined = undefined,    // 描述信息
    position: Position,    // 点的位置坐标
    arcColor: string = '#000000',    // 圆弧颜色
    fillColor: string = '#ffffff',    // 填充颜色
    fontColor: string = '#000000',    // 字体颜色
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

-   删除

删除点时不会改变其他存在的点的编号，删除时会同时删除其连接的所有边

```ts
delPoint = (
    targetPoint: number    // 删除点的编号
) => void
```

### 移动

移动方法是异步的，且调用时会强制上锁

```ts
moveTo = async (
    targetPoint: number,    // 移动点的编号
    targetPosition: Position    // 目标位置
) => void
```

### 交换

交换中的两种方法是异步的，且调用时会强制上锁

-   交换

`swap`方法会交换两点的位置，并且同时更新其连接的所有边的位置

```ts
swap = async (
    pointA: number,    // 交换点的编号
    pointB: number    // 交换点的编号
) => void
```

-   浅交换

`shallowSwap`方法只会交换两点的位置，并且同时更新其连接的所有边的连接信息

```ts
shallowSwap = async (
    pointA: number,    // 交换点的编号
    pointB: number    // 交换点的编号
) => void
```

### 样式

```ts
setPointColor = (
    targetPoint: number,    // 设置样式点的编号
    arcColor: string = '#000000',    // 圆弧颜色
    fillColor: string = '#000000',    // 填充颜色
    fontColor: string = '#ffffff',    // 字体颜色
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

### 闪烁

闪烁方法是异步的

```ts
blink = async (
    targetPoint: number,    // 闪烁点的编号
    count: number,    // 闪烁次数
    arcColor: string = '#ffc67a',    // 闪烁时圆弧颜色
    fillColor: string = '#ffc67a',    // 闪烁时填充颜色
    fontColor: string = '#000000'    // 闪烁时字体颜色
) => void
```

### 描述信息

```ts
setContent = (
    targetPoint: number,    // 设置描述信息点的编号
    content: string | number,    // 描述信息的内容
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

## 边

<div class="card">
    <edgeSettings />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="addEdge">增加边</button>
    <button @click="delEdge">删除边</button>
    <button @click="setEdgeColor">样式</button>
    <button @click="renderEdge">渲染</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext } from 'tea-design'

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
    graphRef.value!.renderEdge(2, 0, '#e3008c', 3)
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
```

```vue [ JavaScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="addEdge">增加边</button>
    <button @click="delEdge">删除边</button>
    <button @click="setEdgeColor">样式</button>
    <button @click="renderEdge">渲染</button>
</template>

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)
const context = {
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
    graphRef.value.addEdge(2, 3, '#ff0000')
}

const delEdge = () => {
    graphRef.value.delEdge(0, 1)
}

const setEdgeColor = () => {
    graphRef.value.setEdgeColor(1, 2, '#a986ff')
}

const renderEdge = () => {
    graphRef.value.renderEdge(2, 0, '#e3008c', 3)
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
```

:::

</details>

### 增加与删除

-   增加

增加边时`startPoint`和`endPoint`的值的传入顺序可以任意

```ts
addEdge = (
    startPoint: number,    // 增加边的起始点编号
    endPoint: number,    // 增加边的终止点编号
    color: string = '#000000',    // 边的颜色
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

-   删除

```ts
delEdge = (
    startPoint: number,    // 删除边的起始点编号
    endPoint: number    // 删除边的终止点编号
) => void
```

### 样式

```ts
setEdgeColor = (
    startPoint: number,    // 设置样式边的起始点编号
    endPoint: number,    // 设置样式边的终止点编号
    color: string = '#39fadd',    // 边的颜色
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

### 渲染

渲染方法会使用`color`颜色以及更粗的线条从编号为`startPoint`的点渲染到编号为`endPoint`的点，渲染方法是异步的，且调用时会强制上锁

```ts
renderEdge = async (
    startPoint: number,    // 渲染边的起始点编号
    endPoint: number,    // 渲染边的终止点编号
    color: string = '#ffd1a0'    // 渲染颜色
) => void
```

## 图

<details>
<summary>展开查看</summary>

```ts
const context = {
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

...
console.log(graphRef.value.getConnectedPoints(0))
// [1, 2, 3]

console.log(graphRef.value.getGraph())
// {0: [1, 2, 3], 1: [0, 3, 2], 2: [0, 1], 3: [1, 0]}

console.log(graphRef.value.getPositions(0))
// {x: 300, y: 250}

console.log(graphRef.value.getPositions())
// [{ x: 300, y: 250 }, { x: 500, y: 250 }, { x: 300, y: 50 }, { x: 500, y: 50 }]
```

</details>

### 连接信息

`getConnectedPoints`会以`number[]`的形式返回节点图中编号为`targetPoint`的点所连接的点

```ts
getConnectedPoints = (
    targetPoint: number    // 查询点的编号
) => number[]
```

### 图信息

`getGraph`会以`{ [key: number]: number[] }`的形式返回节点图中图的邻接表信息

```ts
getGraph = () => { [key: number]: number[] }
```

### 位置信息

`getPositions`将返回`targetPoint`点在图中的位置坐标，如果不传入参数，则会按点的编号顺序返回图中所有点的坐标（已删除点会返回`undefined`）

```ts
getPositions = (
    targetPoint?: number    // 查询点的编号
) => (Position | undefined)[] | Position | undefined
```

### 等待

调用该方法会让节点图同步等待`time`秒，该方法是异步的

```ts
wait = async (
    time: number    // 等待时间，单位秒
) => void
```

## 文字

<div class="card">
    <textSettings />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="setText">显示文字</button>
    <button @click="delText">删除文字</button>
    <button @click="setTextColor">样式</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext } from 'tea-design'

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
```

```vue [ JavaScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="setText">显示文字</button>
    <button @click="delText">删除文字</button>
    <button @click="setTextColor">样式</button>
</template>

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)
const context = {
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

let id
const setText = () => {
    id = graphRef.value.setText('这是一段测试文字', { x: 300, y: 100 })
}

const delText = () => {
    graphRef.value.delText(id)
}

const setTextColor = () => {
    graphRef.value.setTextColor(id, '#0000ff', 4, 5)
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
```

:::

</details>

### 增加与删除

-   增加

调用`setText`方法会返回字符串作为这个文字元素的`id`值作为标识

如果想在初始时就设定文字，可在`onMounted`生命周期中调用该方法

```ts
setText = (
    content: string, // 文字内容
    position: Position, // 文字的位置坐标
    fontColor: string = '#000000', // 字体颜色
    fontStyle: string = '30px Arial', // 字体样式，类型为CanvasRenderingContext2D.font
    withoutAnimation: boolean = false // 是否关闭相关动画
) => string
```

-   删除

调用该方法需要传入创建文字元素时返回的`id`值

```ts
delText = (
    tid: string    // 删除文字的id值
) => void
```

### 样式

通过设置`startIndex`和`endIndex`可控制文字元素中字符串下标范围在`[startIndex, endIndex]`内的样式，可设置重叠的范围，遵循覆盖原则

调用该方法需要传入创建文字元素时返回的`id`值

```ts
setTextColor = (
    tid: string,    // 设置样式文字的id值
    color: string,    // 字体颜色
    startIndex: number,    // 设置样式文字的起始坐标
    endIndex: number,    // 设置样式文字的终止坐标
    withoutAnimation: boolean = false    // 是否关闭相关动画
) => void
```

## 锁

<div class="card">
    <lock />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="changeLockStatus">{{ lockStatus }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { GraphRef, GraphContext } from 'tea-design'

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
    background-color: #00aeec;
    padding: 10px 15px;
    margin: 0 auto;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

```vue [ JavaScript ]
<template>
    <t-graph ref="graphRef" :context="context" />
    <button @click="changeLockStatus">{{ lockStatus }}</button>
</template>

<script setup>
import { ref } from 'vue'

const graphRef = ref(null)
const context = {
    style: {
        canvasWidth: 850,
        canvasHeight: 350
    }
}

const lockStatus = ref('unlocked')

const changeLockStatus = () => {
    if (lockStatus.value === 'unlocked') {
        graphRef.value.lock(true)
        lockStatus.value = 'locked'
    } else {
        graphRef.value.lock(false)
        lockStatus.value = 'unlocked'
    }
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
</style>
```

:::

</details>

通过设置锁的状态可控制节点图是否响应拖拽行为

```ts
lock = (
    status: boolean    // 锁的目标状态
) => void
```

## 相关属性

| 属性名  | 说明     | 类型         | 默认值                         |
| ------- | -------- | ------------ | ------------------------------ |
| context | 配置信息 | GraphContext | defaultContext（见“基本用法”） |

## 相关方法

| 方法名             | 说明         | 类型                                           |
| ------------------ | ------------ | ---------------------------------------------- |
| addPoint           | 增加点       | 详见 [addPoint](./index.md#增加与删除)         |
| delPoint           | 删除点       | 详见 [delPoint](./index.md#增加与删除)         |
| moveTo             | 移动点       | 详见 [moveTo](./index.md#移动)                 |
| swap               | 交换点       | 详见 [swap](./index.md#交换)                   |
| shallowSwap        | 浅交换点     | 详见 [shallowSwap](./index.md#交换)            |
| setPointColor      | 设置点样式   | 详见 [setPointColor](./index.md#样式)          |
| blink              | 闪烁         | 详见 [blink](./index.md#闪烁)                  |
| setContent         | 设置点信息   | 详见 [setContent](./index.md#描述信息)         |
| addEdge            | 增加边       | 详见 [addEdge](./index.md#增加与删除-1)        |
| delEdge            | 删除边       | 详见 [delEdge](./index.md#增加与删除-1)        |
| setEdgeColor       | 设置边样式   | 详见 [setEdgeColor](./index.md#样式-1)         |
| renderEdge         | 渲染边       | 详见 [renderEdge](./index.md#渲染)             |
| getConnectedPoints | 获得连接信息 | 详见 [getConnectedPoints](./index.md#连接信息) |
| getGraph           | 获得图信息   | 详见 [getGraph ](./index.md#图信息)            |
| getPositions       | 获得位置信息 | 详见 [getPositions](./index.md#位置信息)       |
| wait               | 等待         | 详见 [wait](./index.md#等待)                   |
| setText            | 增加文字     | 详见 [setText](./index.md#增加与删除-2)        |
| delText            | 删除文字     | 详见 [delText](./index.md#增加与删除-2)        |
| setTextColor       | 设置文字样式 | 详见 [setTextColor](./index.md#样式-2)         |
| lock               | 控制锁       | 详见 [lock](./index.md#锁)                     |

<script setup>
import demo from './example/demo.vue'
import heapSort from './example/heapSort.vue'
import bubbleSort from './example/bubbleSort.vue'
import search from './example/search.vue'
import pointSettings from './example/pointSettings.vue'
import edgeSettings from './example/edgeSettings.vue'
import textSettings from './example/textSettings.vue'
import lock from './example/lock.vue'
</script>
