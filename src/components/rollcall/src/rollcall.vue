<template>
    <div class="t-rollcall">
        <div class="t-rollcall-content">
            <div class="entity" v-if="props.data.length">
                {{ idx !== null ? data[idx!] : props.startText }}
            </div>
            <div class="no-data" v-else>
                {{ props.noDataText }}
            </div>
        </div>
        <div class="t-rollcall-footer" v-if="!props.withoutFooter">
            <div class="divider" />
            <button @click="startRollcall" v-if="!isRolling">开始</button>
            <button @click="stopRollcall" v-else-if="props.rollMethod === 'byClick'">停止</button>
            <div class="loading" v-else-if="props.rollMethod === 'byCountDown'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as utils from './lib/utils'
import { RollcallProps } from './lib/settings'
import '../../../styles/rollcall.less'

const props = defineProps(RollcallProps)

const idx = ref<number | null>(null)
const speed = ref<number>(50)
const isRolling = ref(false)

async function delay(interval: number) {
    return new Promise(resolve => setTimeout(resolve, interval))
}

let data: (number | string)[] = props.data
let shouldContinue = true
let rollResult: string | number | null = null

async function roll() {
    isRolling.value = true
    shouldContinue = true
    data = utils.shuffle(data)
    idx.value = 0
    for (let i = 0; shouldContinue; i++) {
        idx.value = (idx.value + 1) % data.length
        await delay(speed.value)
    }
    rollResult = data[idx.value]
}

let timeoutId: ReturnType<typeof setTimeout>
const startRollcall = () => {
    rollResult = null
    if (!props.data.length) {
        return
    }

    if (idx.value !== null && props.selectMethod === 'unique') {
        data.length === 1 ? (data = props.data) : data.splice(idx.value, 1)
    }

    if (props.rollMethod === 'byCountDown') {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            stopRollcall()
        }, props.duration * 1000)
    }
    roll()
}

const stopRollcall = () => {
    if (props.rollMethod === 'byCountDown') {
        clearTimeout(timeoutId)
    }
    isRolling.value = false
    shouldContinue = false
}

const start = () => {
    startRollcall()
}

const stop = () => {
    stopRollcall()
}

const get = () => {
    return rollResult
}

defineExpose({
    start,
    stop,
    get
})

defineOptions({
    name: 't-rollcall'
})
</script>
