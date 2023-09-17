<template>
    <button @click="changeStatus">{{ status }}自定义配置</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useTypewrite, type TypewriteContext } from '../../../../src'

const context: TypewriteContext = {
    keyboardMap: {
        Control: '⌃',
        Alt: '⌥',
        Escape: '⎋'
    },
    ignoreList: [' ', 'Enter', 'Meta'],
    fontColor: '#f278b6',
    backgroundColor: '#2d2e2f',
    bottom: 700,
    opacity: [0.8, 0.3],
    combo: 'showAll'
}

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite(context)

const status = ref<string>('开启')
const changeStatus = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped>
button {
    background-color: #027bd5;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
