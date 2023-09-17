# 打字显示 Typewrite

> 这回你终于知道我是怎么退出 vim 的了吧

开启后能够监听并显示键盘按键输入

## 基本用法

调用`useTypewrite(context?: TypewriteContext)`方法以挂载组件实例，然后通过`start()`和`stop()`方法控制是否监听和显示。在切换页面时可以通过`unmount()`方法卸载组件

:::warning 组合式 API 使用时需要置顶生命周期钩子

useTypewrite 是一个异步操作，在组合式 API 中你需置顶生命周期钩子以确保与其他组件实例关联

:::

你可以使用下面的按钮来控制在打字时是否进行显示

<demo />

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <button @click="changeStatus">点击{{ status }}监听</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useTypewrite } from 'tea-design'

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite()

typewrite.start()

const status = ref<string>('关闭')
const changeStatus = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped>
button {
    background-color: #44bd87;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

```vue [ JavaScript ]
<template>
    <button @click="changeStatus">点击{{ status }}监听</button>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useTypewrite } from 'tea-design'

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite()

typewrite.start()

const status = ref('关闭')
const changeStatus = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped>
button {
    background-color: #44bd87;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

:::

</details>

## 个性化配置

传入类型为`TypewriteContext`的数据来配置打字显示的样式

:::tip 气泡

-   在连续输入的过程中，如果连续两次按键的输入间隔大于特定间隔（TypewriteContext.interval），那么之前显示的气泡则会上移并不再更新，在原来的气泡位置重新生成一个新的气泡作为当前主区域

-   不管是主气泡还是上移气泡，只要在特定时间内（TypewriteContext.duration）没有更新，都会从屏幕中消失

:::

```ts
// TypewriteContext 定义
type TypewriteContext = {
    keyboardMap?: { [key: string]: string } // 实际按键与显示图标的映射关系
    ignoreList?: string[] // 忽略显示的按键列表
    duration?: number // 显示持续时间
    interval?: number // 触发显示气泡分离的时间间隔
    fontColor?: string // 字体颜色
    backgroundColor?: string // 背景颜色
    fontSize?: number // 字体大小（单位 rem）
    bottom?: number // 距离底边间距（单位 px）
    right?: number // 距离右侧间距（单位 px）
    combo?: comboMethod // 连击时的处理方式，'multiple'为用乘号连接次数，'showAll'为全部显示不做处理
    opacity?: number[] // [主气泡透明度，上移气泡透明度]：应传入长度为2，范围0~1的数组
}

// TypewriteContext 默认值
const defaultContext = {
    keyboardMap: {
        Control: 'ctrl',
        Meta: 'win',
        ArrowUp: '↑',
        ArrowDown: '↓',
        ArrowLeft: '←',
        ArrowRight: '→',
        Escape: 'esc',
        Shift: '⇧',
        Enter: '⏎ ',
        Backspace: '⌫',
        ' ': '⎵'
    },
    ignoreList: [],
    duration: 3,
    interval: 0.5,
    fontColor: '#ffffff',
    backgroundColor: '#000000',
    fontSize: 2,
    bottom: 180,
    right: 180,
    combo: 'multiple',
    opacity: [1, 1]
}
```

你可以根据实际需求定制显示方案

<config />

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <button @click="changeStatus">点击{{ status }}监听</button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useTypewrite, type TypewriteContext } from 'tea-design'

const context: TypewriteContext = {
    keyboardMap: {
        Control: '⌃',
        Alt: '⌥',
        Escape: '⎋'
    },
    ignoreList: [' ', 'Enter', 'Meta'],
    fontColor: '#f278b6',
    backgroundColor: '#2d2e2f',
    bottom: 700,
    opacity: [0.8, 0.3],
    combo: 'showAll'
}

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite(context)

const status = ref<string>('开启')
const changeStatus = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped>
button {
    background-color: #027bd5;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

```vue [ JavaScript ]
<template>
    <button @click="changeStatus">点击{{ status }}监听</button>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useTypewrite } from 'tea-design'

const context = {
    keyboardMap: {
        Control: '⌃',
        Alt: '⌥',
        Escape: '⎋'
    },
    ignoreList: [' ', 'Enter', 'Meta'],
    fontColor: '#f278b6',
    backgroundColor: '#2d2e2f',
    bottom: 700,
    opacity: [0.8, 0.3],
    combo: 'showAll'
}

onUnmounted(() => {
    typewrite.unmount()
})

const typewrite = useTypewrite(context)

const status = ref('开启')
const changeStatus = () => {
    if (status.value === '关闭') {
        typewrite.stop()
        status.value = '开启'
    } else {
        typewrite.start()
        status.value = '关闭'
    }
}
</script>

<style lang="less" scoped>
button {
    background-color: #027bd5;
    padding: 15px 25px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

:::

</details>

## 相关属性

| 属性名 | 说明     | 类型             | 默认值                         |
| ------ | -------- | ---------------- | ------------------------------ |
| /      | 配置信息 | TypewriteContext | defaultContext（见“基本用法”） |

## 相关方法

| 方法名    | 说明         | 类型       |
| --------- | ------------ | ---------- |
| start     | 开始监听键盘 | () => void |
| stop      | 停止监听键盘 | () => void |
| unmounted | 卸载组件实例 | () => void |

<script setup>
import demo from './example/demo.vue'
import config from './example/config.vue'
</script>
