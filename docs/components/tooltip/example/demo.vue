<template>
    <div class="row">
        <t-tooltip message="但偏偏风渐渐把距离吹得好远">
            <template #trigger>
                <span>dark theme</span>
            </template>
        </t-tooltip>
        <t-tooltip message="终于落下休止符的那首歌" theme="light">
            <template #trigger>
                <span>light theme</span>
            </template>
        </t-tooltip>
        <t-tooltip message="犯错\n像迷恋镜花水月的无聊" theme="grey">
            <template #trigger>
                <span>grey theme</span>
            </template>
        </t-tooltip>
    </div>
</template>

<style lang="less" scoped>
span {
    border: 1px solid #dcdfe6;
    padding: 6px 18px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        color: green;
    }
}
</style>
