<template>
    <div class="t-calendar-heatmap">
        <div class="t-calendar-heatmap-title" v-if="props.title">
            {{ props.title }}
        </div>
        <div class="t-calendar-heatmap-grid">
            <div class="col" v-for="i in props.col" :key="i">
                <div class="row" v-for="j in row" :key="i * 1000 + j">
                    <t-tooltip clickTrigger :message="props.tipInfo" v-if="props.tipInfo" :theme="useDark() ? 'grey' : 'dark'">
                        <template #trigger>
                            <div
                                class="t-calendar-heatmap-day"
                                :class="getClassName(i, j)"
                                :id="`(${props.col - i},${row - j})`"
                                :date="getDate(props.col - i, row - j)"
                                v-if="i != props.col || j <= weeks"
                                @mouseover="handlePick(getDate(props.col - i, row - j), 0)"
                                @click="handlePick(getDate(props.col - i, row - j), 1)" />
                        </template>
                    </t-tooltip>
                    <div
                        class="t-calendar-heatmap-day"
                        v-else-if="i != props.col || j <= weeks"
                        :class="getClassName(i, j)"
                        :id="`(${props.col - i},${row - j})`"
                        :date="getDate(props.col - i, row - j)"
                        @mouseover="handlePick(getDate(props.col - i, row - j), 0)"
                        @click="handlePick(getDate(props.col - i, row - j), 1)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as utils from './lib/utils'
import { CalendarHeatMapEmits, CalendarHeatMapProps } from './lib/settings'
import '../../../styles/calendar-heatmap.less'
import { default as TTooltip } from '../../tooltip/src/tooltip.vue'
import { useDark } from '../../../common/functions'

const props = defineProps(CalendarHeatMapProps)
const emit = defineEmits(CalendarHeatMapEmits)

const date = new Date()
const weeks = date.getDay()

const row = 7

const getDate = (x: number, y: number) => {
    // 获取该格子与今天的时间间隔
    const interval = 7 * x + y - 7 + weeks
    return utils.formatDate(new Date(date.getTime() - interval * 86400000))
}

const getLevel = (count: number) => {
    let className = props.theme
    if (count > props.thresholds[0] && count <= props.thresholds[1]) {
        return className + '--level1'
    } else if (count > props.thresholds[1] && count <= props.thresholds[2]) {
        return className + '--level2'
    } else if (count > props.thresholds[2] && count <= props.thresholds[3]) {
        return className + '--level3'
    } else if (count > props.thresholds[3]) {
        return className + '--level4'
    }
    return null
}

const handlePick = (dateString: string, op: number) => {
    const data = { date: dateString, count: props.mapData[dateString] }
    op ? emit('pick', data) : emit('hover', data)
}

const getClassName = (i: number, j: number) => {
    return props.mapData[getDate(props.col - i, row - j)] ? getLevel(props.mapData[getDate(props.col - i, row - j)]) : null
}

defineOptions({
    name: 't-calendar-heatmap'
})
</script>
