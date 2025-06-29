<template>
    <div class="row">
        <t-radar-chart :context="context" @hover="handleHover" />
    </div>

    <div class="info-card" v-if="cardVisible" :style="cardStyle">
        <h3>个人能力图 {{ hoverElement! }}</h3>
        <ul>
            <li>
                学习<b>{{ data[hoverElement!][0] }}</b>
            </li>
            <li>
                吃饭<b>{{ data[hoverElement!][1] }}</b>
            </li>
            <li>
                睡觉<b>{{ data[hoverElement!][2] }}</b>
            </li>
            <li>
                游戏<b>{{ data[hoverElement!][3] }}</b>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { RadarChartContext } from '../../../../src'

const data = [
    [3, 9, 2, 4],
    [5, 2, 6, 8]
]
const context: RadarChartContext = {
    style: {
        edgeCount: 4,
        mainColor: ['#f93d78', '#eb8f3b'],
        fillColor: ['#ff0000', 'none']
    },
    axis: {
        axisMax: [10, 10, 10, 10],
        label: ['学习', '吃饭', '睡觉', '游戏']
    },
    data: data
}

const cardVisible = ref<boolean>(false)
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
})

const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
}

const cardStyle = computed(() => {
    return {
        top: `${mouseY.value + 20}px`,
        left: `${mouseX.value + 20}px`
    }
})

const hoverElement = ref<number | null>(null)
const handleHover = (value: number | null) => {
    if (value !== null) {
        cardVisible.value = true
        hoverElement.value = value
    } else {
        cardVisible.value = false
        hoverElement.value = null
    }
}

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="less" scoped>
.info-card {
    padding: 0 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 1px 2px 8px 3px;
    position: fixed;
    opacity: 0.8;

    h3 {
        margin-top: 20px;
    }

    li {
        font-size: 20px;

        b {
            margin-left: 30px;
        }
    }
}
</style>
