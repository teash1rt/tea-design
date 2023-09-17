# 日历 Calendar

> 6月31号请我吃饭？尊嘟假嘟 o.O

展示和查看日期信息的轻量级组件

## 基础用法

通过`lang`属性进行中英文切换

<div class="card">
  <demo />
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <t-calendar />
    <t-calendar lang="en" />
</template>
```

</details>

## 头部样式

通过`headerMode`属性设置不同的头部样式

<div class="card">
  <headerStyle />
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <t-calendar headerMode="today-between" />
    <t-calendar headerMode="month-center" />
    <t-calendar headerMode="year-month-center" />
    <t-calendar headerMode="simple-center" />
</template>
```

</details>

## 周一优先

> 经过不严谨调查，还是会有人习惯周一排在最左列

通过`mondayFirst`属性设置日历周一优先

<div class="card">
  <mondayFirst />
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <t-calendar lang="zh" mondayFirst />
    <t-calendar lang="en" mondayFirst />
</template>
```

</details>

## 尺寸

通过`size`属性设置不同的尺寸

<div class="card">
  <size />
</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <t-calendar lang="en" size="large" />
    <t-calendar lang="en" size="medium" />
    <t-calendar lang="en" size="small" />
    <t-calendar lang="en" size="mini" />
</template>
```

</details>

## 颜色

通过`theme`属性设置不同的颜色

<div class="card">
  <color />
</div>

<details>

<summary>展开查看</summary>

```vue
<template>
    <t-calendar theme="info" />
    <t-calendar theme="wine" />
</template>
```

</details>

## 相关属性

| 属性名      | 说明     | 类型                                                                        | 默认值          |
| ----------- | -------- | --------------------------------------------------------------------------- | --------------- |
| lang        | 显示语言 | 'zh' \| 'en'                                                                | 'zh'            |
| headerMode  | 头部样式 | 'today-between' \| 'month-center' \| 'year-month-center' \| 'simple-center' | 'today-between' |
| size        | 尺寸     | 'large' \| 'medium' \| 'small' \| 'mini'                                    | 'medium'        |
| theme       | 颜色主题 | 'tea' \| 'info' \| 'wine'                                                   | 'tea'           |
| mondayFirst | 周一优先 | Boolean                                                                     | false           |

<script setup>
import demo from './example/demo.vue'
import headerStyle from './example/headerStyle.vue'
import mondayFirst from './example/mondayFirst.vue'
import size from './example/size.vue'
import color from './example/color.vue'
</script>
