<template>
    <transition-group :name="floatItemAnimation">
        <div class="t-float-item" v-if="floatVisible" :style="itemGap">
            <slot />
        </div>
    </transition-group>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { FloatButtonContextKey } from './settings.ts'
import '../style.less'

const { floatVisible, animation, gap } = inject(FloatButtonContextKey)!

const floatItemAnimation = computed(() => {
    return animation
})

const itemGap = computed(() => {
    return {
        marginBottom: gap + 'px'
    }
})

defineOptions({
    name: 't-float-item'
})
</script>
