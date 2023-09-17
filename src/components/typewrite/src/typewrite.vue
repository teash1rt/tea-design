<template>
    <div class="t-typewrite" v-if="isStart && inputQueue.length > 0">
        <div class="t-typewrite-content" v-for="(list, i) in inputQueue" :key="i + list.join(',')" :style="contentStyle(i)">
            <span v-for="(valve, j) in list" :key="j + i + valve">
                {{ valve }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { TypewriteProps, defaultContext } from './lib/settings'
import type { TypewriteInfoRequired } from './lib/settings'
import { merge } from '../../../common/functions'
import '../../../styles/typewrite.less'

const props = defineProps(TypewriteProps)
const defaultContextCopy = JSON.parse(JSON.stringify(defaultContext))
const mergeContext = merge(defaultContextCopy, props.context) as TypewriteInfoRequired
const inputQueue = ref<string[][]>([])

let lastTimeStamp: number | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null

// 是否在连击状态内
let isCombo = false
const handleKeyDown = (event: KeyboardEvent) => {
    if (isStart.value && !mergeContext.ignoreList.includes(event.key)) {
        const key = event.key in mergeContext.keyboardMap ? mergeContext.keyboardMap[event.key] : event.key
        const currentTimeStamp = new Date().getTime()
        const timeDiff = lastTimeStamp ? currentTimeStamp - lastTimeStamp : 0

        // 大于固定间隔进行上移
        if (timeDiff > mergeContext.interval * 1000) {
            isCombo = false
            setTimeout(() => {
                inputQueue.value.pop()
            }, mergeContext.duration * 1000)
            inputQueue.value.unshift([key])
        } else if (mergeContext.combo === 'showAll') {
            inputQueue.value.length ? inputQueue.value[0].push(key) : inputQueue.value.unshift([key])
        } else if (mergeContext.combo === 'multiple') {
            const header = inputQueue.value[0]
            if (header) {
                const lastElement = inputQueue.value[0][header.length - 1]
                const lastKey = isCombo ? inputQueue.value[0][header.length - 2] : lastElement
                const comboCount = isCombo ? parseInt(lastElement.substring(3, lastElement.length - 1)) : 1
                if (lastKey === key) {
                    isCombo ? inputQueue.value[0].pop() : (isCombo = true)
                    inputQueue.value[0].push(` ∗ ${comboCount + 1} `)
                } else {
                    isCombo = false
                    inputQueue.value[0].push(key)
                }
            } else {
                inputQueue.value.unshift([key])
            }
        }

        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            inputQueue.value.pop()
            clearTimeout(timeoutId!)
        }, mergeContext.duration * 1000)

        lastTimeStamp = currentTimeStamp
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

const contentStyle = (i: number) => {
    return {
        bottom: i * 90 + mergeContext.bottom + 'px',
        right: mergeContext.right + 'px',
        color: mergeContext.fontColor,
        backgroundColor: mergeContext.backgroundColor,
        fontSize: mergeContext.fontSize + 'rem',
        opacity: i ? mergeContext.opacity[1] : mergeContext.opacity[0],
        animation: i ? 'slide-up 0.3s ease-out' : 'none'
    }
}

const isStart = ref<boolean>(false)

const start = () => {
    isStart.value = true
}

const stop = () => {
    inputQueue.value = []
    isStart.value = false
}

defineExpose({
    start,
    stop
})

defineOptions({
    name: 't-typewrite'
})
</script>
