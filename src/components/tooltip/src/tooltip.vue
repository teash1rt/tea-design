<template>
    <div class="t-tooltip">
        <div v-if="!dom.triggerOutSide && props.message?.length" :class="isDisplay">
            <div class="message" :class="`message--${props.theme}`" :style="messagePosition" ref="message">
                <div v-for="(sentence, index) in props.message.split(/(?<!\\)\\n/)" :key="index">
                    {{ sentence }}
                    <br />
                </div>
            </div>
            <div class="arrow" :class="`arrow--${props.placement}--${props.theme}`" :style="arrowPosition"></div>
        </div>
        <div class="t-tooltip-trigger" ref="trigger">
            <slot name="trigger" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive, onBeforeUnmount } from 'vue'
import { TooltipProps } from './lib/settings'
import '../../../styles/tooltip.less'
import { useMouse } from '../../../common/functions'

const props = defineProps(TooltipProps)

const trigger = ref<HTMLDivElement | null>(null)
const message = ref<HTMLDivElement | null>(null)
const dom = reactive({
    triggerX: 0,
    triggerY: 0,
    triggerW: 0,
    triggerH: 0,
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
        const { elementPositionY, elementPositionX, elementWidth, elementHeight } = useMouse(trigger.value!.children[0])
        dom.triggerX = elementPositionX.value
        dom.triggerY = elementPositionY.value
        dom.triggerW = elementWidth.value
        dom.triggerH = elementHeight.value
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
    let left = ''
    let top = ''
    switch (props.placement) {
        case 'top':
            left = dom.triggerX + dom.triggerW / 2 - dom.messageW / 2 + 'px'
            top = dom.triggerY - dom.messageH - scrollTop.value - 9 + 'px'
            break
        case 'bottom':
            left = dom.triggerX + dom.triggerW / 2 - dom.messageW / 2 + 'px'
            top = dom.triggerY + dom.triggerH - scrollTop.value + 10 + 'px'
            break
        case 'right':
            left = dom.triggerX + dom.triggerW + 16 + 'px'
            top = dom.triggerY + dom.triggerH / 2 - dom.messageH / 2 - scrollTop.value + 'px'
            break
        case 'left':
            left = dom.triggerX - dom.messageW - 14 + 'px'
            top = dom.triggerY + dom.triggerH / 2 - dom.messageH / 2 - scrollTop.value + 'px'
            break
    }
    return {
        left,
        top
    }
})

const arrowPosition = computed(() => {
    let left = ''
    let top = ''
    switch (props.placement) {
        case 'top':
            left = dom.triggerX + dom.triggerW / 2 - 5 + 'px'
            top = dom.triggerY - scrollTop.value - 10 + 'px'
            break
        case 'bottom':
            left = dom.triggerX + dom.triggerW / 2 - 5 + 'px'
            top = dom.triggerY + dom.triggerH - scrollTop.value + 'px'
            break
        case 'right':
            left = dom.triggerX + dom.triggerW + 5 + 'px'
            top = dom.triggerY + dom.triggerH / 2 - scrollTop.value - 6 + 'px'
            break
        case 'left':
            left = dom.triggerX - 15 + 'px'
            top = dom.triggerY + dom.triggerH / 2 - scrollTop.value - 6 + 'px'
            break
    }
    return {
        left,
        top
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

defineOptions({
    name: 't-tooltip'
})
</script>
