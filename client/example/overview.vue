<template>
    <div class="menu">
        <router-link v-for="e in components" :key="e.router" :to="{ name: e.router }">
            <div class="card">
                {{ e.name }}
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { routes } from '../router'

const components = routes.map(item => {
    return {
        router: item.name,
        name: item.meta.title
    }
})
components.splice(0, 1)
</script>

<style lang="less" scoped>
.menu {
    display: flex;
    gap: 20px;
    padding: 20px;

    .card {
        border: 1px solid #e1e1e1;
        box-shadow: 1px 1px 2px rgba(185, 185, 185, 0.5);
        border-radius: 5px;
        padding: 10px 20px;
        overflow: auto;
        text-align: center;
    }
}
</style>
