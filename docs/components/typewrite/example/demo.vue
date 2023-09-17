<template>
    <button @click="changeStatus">点击{{ status }}监听</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useTypewrite } from '../../../../src'

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite()
typewrite.start()

const status = ref<string>('关闭')
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
    background-color: #44bd87;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
