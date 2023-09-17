<template>
    <div class="row">
        <t-rollcall :data="foods" startText="今天中午吃什么" rollMethod="byCountDown" :duration="5" />
        <t-rollcall :data="foods" startText="今天中午吃什么" selectMethod="unique" />
    </div>
</template>

<script setup lang="ts">
const foods = ['汉堡', '披萨', '米饭', '面条', '烧烤']
</script>
