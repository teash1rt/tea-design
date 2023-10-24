<template>
    <div class="tooltip">
        <div class="top">
            <t-tooltip message="在上边!" placement="top" theme="grey">
                <template #trigger>
                    <span>上边</span>
                </template>
            </t-tooltip>
        </div>
        <div class="line">
            <t-tooltip message="在左边!" placement="left" theme="grey">
                <template #trigger>
                    <span>左边</span>
                </template>
            </t-tooltip>
            <t-tooltip message="在右边!" placement="right" theme="grey">
                <template #trigger>
                    <span>右边</span>
                </template>
            </t-tooltip>
        </div>
        <div class="bottom">
            <t-tooltip message="在下边!" placement="bottom" theme="grey">
                <template #trigger>
                    <span>下边</span>
                </template>
            </t-tooltip>
        </div>
    </div>
</template>

<style lang="less" scoped>
.tooltip {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 15px;
    margin: 40px auto;
}

.top,
.bottom {
    display: flex;
    justify-content: center;
}
.line {
    display: flex;
    justify-content: space-around;
}

span {
    border: 1px solid #dcdfe6;
    padding: 6px 18px;
    border-radius: 10px;
    cursor: pointer;
}
</style>
