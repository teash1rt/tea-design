<template>
    <button @click="changeTheme">{{ theme }} Theme</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '../../../src'

const theme = ref<string>('Light')

const changeTheme = () => {
    let isDark = useDark()
    isDark = useDark(!isDark)
    theme.value = isDark ? 'Dark' : 'Light'
}
</script>

<style lang="less" scoped>
button {
    background-color: #44bd87;
    padding: 10px 20px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
