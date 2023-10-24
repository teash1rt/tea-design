<template>
    <div class="box">
        <div class="top">
            <t-tooltip message="在上边!" placement="top" theme="grey">
                <template #trigger>
                    <span>top</span>
                </template>
            </t-tooltip>
        </div>
        <div class="line">
            <t-tooltip message="在左边!" placement="left" theme="grey">
                <template #trigger>
                    <span>left</span>
                </template>
            </t-tooltip>
            <t-tooltip message="在右边!" placement="right" theme="grey">
                <template #trigger>
                    <span>right</span>
                </template>
            </t-tooltip>
        </div>
        <div class="bottom">
            <t-tooltip message="在下边!" placement="bottom" theme="grey">
                <template #trigger>
                    <span>bottom</span>
                </template>
            </t-tooltip>
        </div>
    </div>
</template>

<style lang="less" scoped>
.box {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 15px;
    margin: 0 auto;

    .line {
        display: flex;
        justify-content: space-around;
    }
}

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
