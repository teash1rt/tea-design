<template>
    <div ref="t-tooltip">
        <div v-if="!dom.triggerOutSide && props.message?.length" :class="isDisplay">
            <div class="message" :class="`message--${props.theme}`" :style="messagePosition" ref="message">
                <div v-for="(sentence, index) in props.message.split(/(?<!\\)\\n/)" :key="index">
                    {{ sentence }}
                    <br />
                </div>
            </div>
            <div class="arrow" :class="`arrow--${props.theme}`" :style="arrowPosition"></div>
        </div>
        <div class="t-tooltip-trigger" ref="trigger">
            <slot name="trigger" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { MaybeElement, useMouseInElement } from '@vueuse/core'
import { ref, computed, watch, onMounted, reactive, onBeforeUnmount } from 'vue'
import { TooltipProps } from './lib/settings'
import '../../../styles/tooltip.less'

const props = defineProps(TooltipProps)

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
    const triggerDom = ref(trigger.value!.children[0] as MaybeElement)
    const { isOutside } = useMouseInElement(triggerDom)
    watch(isOutside, newV => {
        dom.triggerOutSide = newV
        const { elementPositionY, elementPositionX, elementWidth } = useMouseInElement(triggerDom)
        dom.triggerX = elementPositionX.value
        dom.triggerY = elementPositionY.value
        dom.triggerW = elementWidth.value
    })

    isDisplay.value = null
    dom.triggerOutSide = true
})

watch(message, newV => {
    const { elementWidth, elementHeight } = useMouseInElement(newV)
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

defineOptions({
    name: 't-tooltip'
})
</script>
