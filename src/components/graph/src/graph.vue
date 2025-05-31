<template>
    <div class="t-graph">
        <canvas ref="graphRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { merge } from '../../../common/functions'
import type { Position } from '../../../common/types'
import { Graph } from './lib/Graph'
import { GraphProps, defaultContext } from './lib/settings'
import type { GraphContextRequired } from './lib/settings'
import './style.less'

const props = defineProps(GraphProps)
const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
const mergeContext = merge(defaultContextCopy, props.context) as GraphContextRequired

const graphRef = ref<HTMLCanvasElement | null>(null)

let graph: Graph | null = null

onMounted(() => {
    graphRef.value!.width = mergeContext.style.canvasWidth
    graphRef.value!.height = mergeContext.style.canvasHeight
    graph = new Graph(graphRef.value!, mergeContext)
})

const moveTo = async (targetPoint: number, targetPosition: Position) => {
    await graph!.moveTo(targetPoint, targetPosition)
}

const swap = async (pointA: number, pointB: number) => {
    await graph!.swap(pointA, pointB)
}

const shallowSwap = async (pointA: number, pointB: number) => {
    await graph!.shallowSwap(pointA, pointB)
}

const renderEdge = async (startPoint: number, endPoint: number, color: string = '#ffd1a0') => {
    await graph!.renderEdge(startPoint, endPoint, color)
}

const addPoint = (
    content: string | number | undefined = undefined,
    position: Position,
    arcColor: string = '#000000',
    fillColor: string = '#ffffff',
    fontColor: string = '#000000',
    withoutAnimation: boolean = false
) => {
    graph!.addPoint(content, position, arcColor, fillColor, fontColor, withoutAnimation)
}

const delPoint = (targetPoint: number) => {
    graph!.delPoint(targetPoint)
}

const addEdge = (startPoint: number, endPoint: number, color: string = '#000000', withoutAnimation: boolean = false) => {
    graph!.addEdge(startPoint, endPoint, color, withoutAnimation)
}

const delEdge = (startPoint: number, endPoint: number) => {
    graph!.delEdge(startPoint, endPoint)
}

const setPointColor = (
    targetPoint: number,
    arcColor: string = '#000000',
    fillColor: string = '#000000',
    fontColor: string = '#ffffff',
    withoutAnimation: boolean = false
) => {
    graph!.setPointColor(targetPoint, arcColor, fillColor, fontColor, withoutAnimation)
}

const setContent = (targetPoint: number, content: string | number, withoutAnimation: boolean = false) => {
    graph!.setContent(targetPoint, content, withoutAnimation)
}

const setEdgeColor = (startPoint: number, endPoint: number, color: string = '#39fadd', withoutAnimation: boolean = false) => {
    graph!.setEdgeColor(startPoint, endPoint, color, withoutAnimation)
}

const setText = (
    content: string,
    position: Position,
    fontColor: string = '#000000',
    fontStyle: string = '30px Arial',
    withoutAnimation: boolean = false
) => {
    return graph!.setText(content, position, fontColor, fontStyle, withoutAnimation)
}

const setTextColor = (tid: string, color: string, startIndex: number, endIndex: number, withoutAnimation: boolean = false) => {
    return graph!.setTextColor(tid, color, startIndex, endIndex, withoutAnimation)
}

const delText = (tid: string) => {
    graph!.delText(tid)
}

const blink = async (
    targetPoint: number,
    count: number,
    arcColor: string = '#ffc67a',
    fillColor: string = '#ffc67a',
    fontColor: string = '#000000'
) => {
    await graph!.blink(targetPoint, count, arcColor, fillColor, fontColor)
}

const lock = (status: boolean) => {
    graph!.lock(status)
}

const wait = async (time: number) => {
    await graph!.wait(time)
}

const getPositions = (targetPoint?: number) => {
    return graph!.getPositions(targetPoint)
}

const getConnectedPoints = (targetPoint: number) => {
    return graph!.getConnectedPoints(targetPoint)
}

const getGraph = () => {
    return graph!.getGraph()
}

defineExpose({
    moveTo,
    swap,
    shallowSwap,
    renderEdge,
    addPoint,
    delPoint,
    addEdge,
    delEdge,
    setPointColor,
    setContent,
    setEdgeColor,
    setText,
    setTextColor,
    delText,
    blink,
    lock,
    wait,
    getPositions,
    getConnectedPoints,
    getGraph
})

defineOptions({
    name: 't-graph'
})
</script>
