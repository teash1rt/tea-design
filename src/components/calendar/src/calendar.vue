<template>
    <div class="t-calendar">
        <div class="t-calendar-header" :class="`header--${headerMode}`">
            <div v-if="headerMode === 'month-center'">
                <span class="header-prev" @click="changeDate(-1, 0)">&lt;</span>
                <span :class="`header-date--${size}`">{{ utils.getDateName(year, month + 1, lang, size) }}</span>
                <span class="header-next" @click="changeDate(1, 0)">&gt;</span>
            </div>
            <div v-else-if="headerMode === 'year-month-center'">
                <span class="header-prev" @click="changeDate(0, -1)">&lt;&lt;</span>
                <span class="header-prev" @click="changeDate(-1, 0)">&lt;</span>
                <span :class="`header-date--${size}`">{{ utils.getDateName(year, month + 1, lang, size) }}</span>
                <span class="header-next" @click="changeDate(1, 0)">&gt;</span>
                <span class="header-next" @click="changeDate(0, 1)">&gt;&gt;</span>
            </div>
            <div v-else-if="headerMode === 'today-between'">
                <span :class="`header-date--${size}`">{{ utils.getDateName(year, month + 1, lang, size) }}</span>
                <span class="header-today-group">
                    <span class="header-prev" @click="changeDate(-1, 0)">&lt;</span>
                    <span class="header-today" @click="backToToday">{{ lang === 'zh' ? '今日' : 'today' }}</span>
                    <span class="header-next" @click="changeDate(1, 0)">&gt;</span>
                </span>
            </div>
            <div v-else-if="headerMode === 'simple-center'">
                <span :class="`header-date--${size}`">{{ utils.getDateName(year, month + 1, lang, size) }}</span>
            </div>
        </div>
        <div class="t-calendar-body">
            <div class="t-calendar-week">
                <div v-for="e in weakName" :key="e" :class="`t-calendar-week-elm--${size}`">
                    {{ e }}
                </div>
            </div>
            <div v-for="m in 6" :key="m" class="t-calendar-day">
                <span
                    v-for="n in 7"
                    :key="m * 10 + n"
                    :class="[
                        `t-calendar-day-elm--${size}`,
                        dayStatus(getVisibleDays[(m - 1) * 7 + (n - 1)], month, year),
                        dayAnimationClass
                    ]">
                    {{ getVisibleDays[(m - 1) * 7 + (n - 1)].getDate() }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as utils from './lib/utils'
import { CalendarProps } from './lib/settings'
import './style.less'

const props = defineProps(CalendarProps)

const date = new Date()
const month = ref<number>(date.getMonth())
const year = ref<number>(date.getFullYear())

const weakName = computed(() => {
    return utils.getWeekName(props.lang, props.mondayFirst)
})

const dayAnimationClass = ref<string | null>(null)

const getVisibleDays = computed(() => {
    let firstDay: Date = new Date(year.value, month.value, 1)
    let weeks = firstDay.getDay() === 0 ? 7 : firstDay.getDay()
    let firstDate = new Date(firstDay.getTime() - (props.mondayFirst ? weeks - 1 : weeks) * 86400000) // 24 * 60 * 60 * 1000
    let arr = []
    for (let i = 0; i < 42; i++) {
        arr.push(new Date(firstDate.getTime() + i * 86400000))
    }
    return arr
})

const changeDate = (opMonth: number, opYear: number) => {
    dayAnimationClass.value = null
    setTimeout(() => {
        dayAnimationClass.value = opMonth + opYear === 1 ? 'top' : 'down'
    }, 0)
    if (opMonth === -1 && month.value === 0) {
        year.value -= 1
        month.value = 11
    } else if (opMonth === 1 && month.value === 11) {
        year.value += 1
        month.value = 0
    } else {
        month.value += opMonth
        year.value += opYear
    }
}

const backToToday = () => {
    month.value = date.getMonth()
    year.value = date.getFullYear()
}

const dayStatus = (date: Date, month: number, year: number) => {
    if (utils.isToday(date)) {
        return `is-today--${props.theme}`
    } else if (utils.isCurMonth(date, month, year)) {
        return `cur-month--${props.theme}`
    }

    return `not-cur-month--${props.theme}`
}

defineOptions({
    name: 't-calendar'
})
</script>
