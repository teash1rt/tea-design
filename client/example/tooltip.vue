<template>
    <div class="tooltip">
        <t-tooltip message="这是一段 \n 测试">
            <template #trigger>
                <span>dark theme</span>
            </template>
        </t-tooltip>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.tooltip {
    position: fixed;
    top: 400px;
    left: 200px;

    span {
        border: 1px solid gray;
    }
}
</style>
