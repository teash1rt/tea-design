<template>
    <!-- <t-typewrite /> -->
    <button @click="change">{{ status }}</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useTypewrite, type TypewriteContext } from '../../src/components/typewrite'

onUnmounted(() => {
    typewrite.unmount()
})

const context: TypewriteContext = {
    fontColor: '#ff0000'
}

const typewrite = useTypewrite(context)
typewrite.start()

const status = ref<string>('关闭')
const change = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped></style>
