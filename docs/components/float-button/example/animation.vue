<template>
    <div class="box">
        <t-float-button :bottom="50" :right="30" animation="edge">
            边缘
            <template #menu>
                <t-float-item>按钮A</t-float-item>
                <t-float-item>按钮B</t-float-item>
            </template>
        </t-float-button>
        <t-float-button :bottom="50" :right="180" animation="origin">
            原点
            <template #menu>
                <t-float-item>按钮A</t-float-item>
                <t-float-item>按钮B</t-float-item>
            </template>
        </t-float-button>
        <t-float-button :bottom="50" :right="330" animation="none">
            默认
            <template #menu>
                <t-float-item>按钮A</t-float-item>
                <t-float-item>按钮B</t-float-item>
            </template>
        </t-float-button>
    </div>
</template>

<style lang="less" scoped>
.box {
    background-color: rgb(225, 225, 225);
    height: 300px;
    transform: rotate(360deg);
}
</style>
