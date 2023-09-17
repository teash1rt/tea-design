<template>
    <div class="navbar">
        <router-link :to="{ name: 'overview' }">
            <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path
                    d="M135.168 276.48h462.848c176.128 0 317.44 141.312 317.44 317.44s-141.312 317.44-317.44 317.44H389.12c-12.288 0-20.48 8.192-20.48 20.48s8.192 20.48 20.48 20.48h208.896c198.656 0 358.4-159.744 358.4-358.4s-159.744-358.4-358.4-358.4h-462.848l139.264-139.264c8.192-8.192 8.192-20.48 0-28.672-8.192-8.192-20.48-8.192-28.672 0l-174.08 174.08c-8.192 8.192-8.192 20.48 0 28.672l174.08 174.08c8.192 8.192 20.48 8.192 28.672 0 8.192-8.192 8.192-20.48 0-28.672l-139.264-139.264z"></path>
            </svg>
        </router-link>
        <div>
            {{ route.meta.title }}
        </div>
        <div>
            切换主题
            <button @click="changeTheme">{{ theme }}</button>
        </div>
    </div>
    <RouterView />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '../src/common/functions'
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = ref<string>('light')

const changeTheme = () => {
    let isDark = useDark()
    isDark = useDark(!isDark)
    theme.value = isDark ? 'dark' : 'light'
}
</script>

<style lang="less" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid gray;

    button {
        border: 1px solid #ced5dd;
        width: 64px;
        height: 36px;
        border-radius: 3px;
        cursor: pointer;
        transition: all 0.1s linear;
        font-size: 0.9rem;

        &:hover {
            color: #10b310;
            border-color: #1cb11c;
        }
    }
}
</style>
