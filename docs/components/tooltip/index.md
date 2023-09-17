# 文字提示 Tooltip

> 为什么我在考试的时候没有这个？

鼠标悬浮时即可展示提示信息

## 基本用法

将需要展示信息的元素包裹在`<template #trigger>`模板中

通过`message`和`theme`分别设置提示信息（支持\n换行符）和颜色

<div class="card">
    <div class="row">
        <demo />
    </div>
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
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
```

</details>

## 相关属性

| 属性名  | 说明     | 类型                        | 默认值 |
| ------- | -------- | --------------------------- | ------ |
| message | 提示信息 | string \| null              | null   |
| theme   | 颜色主题 | 'dark' \| 'light' \| 'grey' | 'dark' |

<script setup>
import demo from './example/demo.vue'
</script>
