<template>
    <t-rollcall :data="foods" startText="今天中午吃什么" rollMethod="byCountDown" :duration="5" />
    <t-rollcall :data="foods" startText="今天中午吃什么" selectMethod="unique" ref="rollcall" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RollcallRef } from '../../src'

const rollcall = ref<RollcallRef | null>(null)

const foods = ['汉堡', '披萨', '米饭', '面条', '烧烤']

onMounted(() => {
    rollcall.value!.start()
})
</script>

<style lang="less" scoped></style>
