# 日历热力图 Calendar Heatmap

> 我看你上周github压根没有提交记录，steam倒是天天在线

本组件提供了日历热力图最核心的数据分析和展示功能

## 基础用法

通过设置`mapData`的值传入相关数据，使用`@hover`会在用户悬浮日历格子时执行回调，搭配`tipInfo`可实现悬浮时文字提示

在`@hover`方法可接受一个类型为`{ date: string, count: number | undefined }`的对象，为该位置所对应的数据

:::warning mapData 数据格式

请确保传入的数据是{ [key: string]: number }的形式，且其中键的值应为'YYYY-MM-DD'的格式

:::

<div class="card">
    <demo />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue-vue [ TypeScript ]
<template>
    <t-calendar-heatmap :mapData="data" @hover="showInfo" title="github提交图" :tipInfo="msg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data: { [key: string]: number } = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}共有${v['count']}次贡献` : `${v['date']}没有贡献`
}
</script>
```

```vue-vue [ JavaScript ]
<template>
    <t-calendar-heatmap :mapData="data" @hover="showInfo" title="github提交图" :tipInfo="msg" />
</template>

<script setup>
import { ref } from 'vue'
const data = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
const msg = ref('')
const showInfo = v => {
    msg.value = v['count'] ? `${v['date']}共有${v['count']}次贡献` : `${v['date']}没有贡献`
}
</script>
```

:::

</details>

## 自定义阈值

你可以根据使用场景自定义变色的阈值，通过设置`thresholds`属性来使用组件提供的四种渐变颜色

假如传入`[k1, k2, k3, k4]`，那么

| 范围 | (-∞, k1] | (k1, k2] | (k2, k3] | (k3, k4] | (k4, +∞) |
| ---- | -------- | -------- | -------- | -------- | -------- |
| 颜色 | 默认     | 颜色1    | 颜色2    | 颜色3    | 颜色4    |

:::warning thresholds 数据格式

请确保传入的数据是长度为4的递增数组

:::

<div class="card">
    <thresholds />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue-vue [ TypeScript ]
<template>
    <t-calendar-heatmap :mapData="data" :thresholds="thresholds" @hover="showInfo" title="降水量" :tipInfo="msg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const thresholds: number[] = [100, 200, 300, 400]
const data: { [key: string]: number } = {
   {{ LIST2_FOR_MD[0] }}: 134,
   {{ LIST2_FOR_MD[1] }}: 27,
   {{ LIST2_FOR_MD[2] }}: 388,
   {{ LIST2_FOR_MD[3] }}: 400,
   {{ LIST2_FOR_MD[4] }}: 5,
   {{ LIST2_FOR_MD[5] }}: 610,
   {{ LIST2_FOR_MD[6] }}: 241,
   {{ LIST2_FOR_MD[7] }}: 238,
   {{ LIST2_FOR_MD[8] }}: 190,
   {{ LIST2_FOR_MD[9] }}: 10,
   {{ LIST2_FOR_MD[10] }}: 111,
   {{ LIST2_FOR_MD[11] }}: 120,
   {{ LIST2_FOR_MD[12] }}: 130
}
const msg = ref<string>('')
const showInfo = (v: { date: string; count: number | undefined }) => {
    msg.value = v['count'] ? `${v['date']}\n降水量：${v['count']}mm` : `${v['date']}\n无降水`
}
</script>
```

```vue-vue [ JavaScript ]
<template>
    <t-calendar-heatmap :mapData="data" :thresholds="thresholds" @hover="showInfo" title="降水量" :tipInfo="msg" />
</template>

<script setup>
import { ref } from 'vue'
const thresholds = [100, 200, 300, 400]
const data = {
    {{ LIST2_FOR_MD[0] }}: 134,
    {{ LIST2_FOR_MD[1] }}: 27,
    {{ LIST2_FOR_MD[2] }}: 388,
    {{ LIST2_FOR_MD[3] }}: 400,
    {{ LIST2_FOR_MD[4] }}: 5,
    {{ LIST2_FOR_MD[5] }}: 610,
    {{ LIST2_FOR_MD[6] }}: 241,
    {{ LIST2_FOR_MD[7] }}: 238,
    {{ LIST2_FOR_MD[8] }}: 190,
    {{ LIST2_FOR_MD[9] }}: 10,
    {{ LIST2_FOR_MD[10] }}: 111,
    {{ LIST2_FOR_MD[11] }}: 120,
    {{ LIST2_FOR_MD[12] }}: 130
}
const msg = ref('')
const showInfo = v => {
    msg.value = v['count'] ? `${v['date']}\n降水量：${v['count']}mm` : `${v['date']}\n无降水`
}
</script>
```

:::

</details>

## 触发方式

绑定`@hover`事件会在悬浮元素时执行回调，除此之外组件还提供在点击时触发的`@pick`事件

<div class="card">
    <pick />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue-vue [ TypeScript ]
<template>
    <t-calendar-heatmap :mapData="data" @pick="logInfo" />
</template>

<script setup lang="ts">
const data: { [key: string]: number } = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
const logInfo = (v: { date: string, count: number | undefined }) => {
    console.log(v)
}
</script>
```

```vue-vue [ JavaScript ]
<template>
    <t-calendar-heatmap :mapData="data" @pick="logInfo" />
</template>

<script setup>
const data = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
const logInfo = v => {
    console.log(v)
}
</script>
```

:::

</details>

## 颜色与尺寸

设置属性`theme`以调整主题颜色，`col`以调整渲染列数

<div class="card">
    <appearance />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue-vue [ TypeScript ]
<template>
    <t-calendar-heatmap :mapData="data" theme="info" :col="45" />
    <t-calendar-heatmap :mapData="data" theme="wine" :col="10" />
</template>

<script setup lang="ts">
const data: { [key: string]: number } = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
</script>
```

```vue-vue [ JavaScript ]
<template>
    <t-calendar-heatmap :mapData="data" theme="info" :col="45" />
    <t-calendar-heatmap :mapData="data" theme="wine" :col="10" />
</template>

<script setup>
const data = {
    {{ LIST1_FOR_MD[0] }}: 1,
    {{ LIST1_FOR_MD[1] }}: 2,
    {{ LIST1_FOR_MD[2] }}: 3,
    {{ LIST1_FOR_MD[3] }}: 4,
    {{ LIST1_FOR_MD[4] }}: 5,
    {{ LIST1_FOR_MD[5] }}: 6,
    {{ LIST1_FOR_MD[6] }}: 7,
    {{ LIST1_FOR_MD[7] }}: 8,
    {{ LIST1_FOR_MD[8] }}: 9,
    {{ LIST1_FOR_MD[9] }}: 10,
    {{ LIST1_FOR_MD[10] }}: 11,
    {{ LIST1_FOR_MD[11] }}: 12,
    {{ LIST1_FOR_MD[12] }}: 13
}
</script>
```

:::

</details>

## 相关属性

| 属性名     | 说明                         | 类型                      | 默认值       |
| ---------- | ---------------------------- | ------------------------- | ------------ |
| mapData    | 数据信息，格式见“基本用法”   | Object                    | {}           |
| thresholds | 变色阈值，格式见“自定义阈值” | number[]                  | [1, 3, 5, 7] |
| title      | 标题内容                     | string \| null            | null         |
| tipInfo    | 显示文字提示的内容           | string \| null            | null         |
| theme      | 颜色主题                     | 'tea' \| 'info' \| 'wine' | 'tea'        |
| col        | 渲染列数                     | number                    | 40           |

## 相关事件

| 事件名 | 说明             | 回调参数                                |
| ------ | ---------------- | --------------------------------------- |
| hover  | 悬浮时触发该事件 | value: \{ date: string, count: number } |
| pick   | 点击时触发该事件 | value: \{ date: string, count: number } |

<script setup>
import demo from './example/demo.vue'
import thresholds from './example/thresholds.vue'
import pick from './example/pick.vue'
import appearance from './example/appearance.vue'
import {LIST1_FOR_MD, LIST2_FOR_MD} from './get-date-list'
</script>
