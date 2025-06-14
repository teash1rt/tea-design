<template>
    <div class="t-heatmap-tooltip">
        <div v-if="!dom.triggerOutSide" :class="isDisplay">
            <div class="message" :class="`message--${props.theme}`" :style="messagePosition" ref="message">
                <div v-for="(sentence, index) in props.tipInfo.split(/(?<!\\)\\n/)" :key="index">
                    {{ sentence }}
                    <br />
                </div>
            </div>
            <div class="arrow" :class="`arrow--top--${props.theme}`" :style="arrowPosition"></div>
        </div>
        <div class="heatmap-tooltip-trigger" ref="trigger">
            <slot name="trigger" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive, onBeforeUnmount } from 'vue'
import { useMouse } from '../../../../common/functions'
import { HeatMapTooltipProps } from './settings'
import '../style.less'

const props = defineProps(HeatMapTooltipProps)

const trigger = ref<HTMLDivElement | null>(null)
const message = ref<HTMLDivElement | null>(null)
const dom = reactive({
    triggerX: 0,
    triggerY: 0,
    triggerW: 0,
    triggerOutSide: false,
    messageW: 0,
    messageH: 0
})

const scrollTop = ref(0)
const handleScroll = () => {
    scrollTop.value = window.scrollY
}

const isDisplay = ref<string | null>('beforeMount')

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    const { isOutside } = useMouse(trigger.value!.children[0])
    watch(isOutside, newV => {
        dom.triggerOutSide = newV
        const { elementPositionY, elementPositionX, elementWidth } = useMouse(trigger.value!.children[0])
        dom.triggerX = elementPositionX.value
        dom.triggerY = elementPositionY.value
        dom.triggerW = elementWidth.value
    })
    isDisplay.value = null
    dom.triggerOutSide = true
})

watch(message, newV => {
    const { elementWidth, elementHeight } = useMouse(newV!)
    dom.messageW = elementWidth.value
    dom.messageH = elementHeight.value
})

const messagePosition = computed(() => {
    return {
        left: dom.triggerX + dom.triggerW / 2 - dom.messageW / 2 + 'px',
        top: dom.triggerY - dom.messageH - scrollTop.value - 9 + 'px'
    }
})

const arrowPosition = computed(() => {
    return {
        left: dom.triggerX + dom.triggerW / 2 - 5 + 'px',
        top: dom.triggerY - scrollTop.value - 10 + 'px'
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
