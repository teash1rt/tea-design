<template>
    <Layout>
        <template #home-features-after>
            <home />
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import home from './home.vue'

const { Layout } = DefaultTheme
</script>
