<template>
    <div class="t-float-button" :style="buttonPosition">
        <div class="t-float-content">
            <div class="t-float-home" @click="changeVisible">
                <slot />
            </div>
            <div class="t-float-items">
                <slot name="menu" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { FloatButtonProps, FloatButtonContextKey } from './lib/settings'
import type { FloatButtonContext } from './lib/settings'
import './style.less'

const props = defineProps(FloatButtonProps)
const floatVisible = ref<boolean>(false)

const floatButtonContextValue: FloatButtonContext = {
    floatVisible: floatVisible,
    animation: props.animation,
    gap: props.gap
}

provide(FloatButtonContextKey, floatButtonContextValue)

const changeVisible = () => {
    floatVisible.value = !floatVisible.value
}

const buttonPosition = computed(() => {
    return {
        right: `${props.right}px`,
        bottom: `${props.bottom}px`
    }
})

defineOptions({
    name: 't-float-button'
})
</script>
