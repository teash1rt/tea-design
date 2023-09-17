# 雷达图 Radar Chart

> who is 六边形战士

用于多维度数据的比较和分析的雷达图组件

## 基本使用

通过`context`属性传入类型为`RadarChartContext`的数据来设置雷达图的外观，坐标信息和数据内容

<div class="card">
    <demo />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-radar-chart :context="context" />
</template>

<script setup lang="ts">
import type { RadarChartContext } from 'tea-design'

const context: RadarChartContext = {
    style: {
        canvasSize: 550,
        baseLineCount: 1,
        mainColor: ['#0083d0'],
        fillColor: ['#29a7ff']
    },
    axis: {
        label: ['属性A', '属性B', '属性C', '属性D', '属性E', '属性F'],
        axisMax: [120, 70, 150, 80, 90, 25]
    },
    data: [[85, 57, 88, 36, 72, 19]]
}
</script>
```

```vue [ JavaScript ]
<template>
    <t-radar-chart :context="context" />
</template>

<script setup>
const context = {
    style: {
        canvasSize: 550,
        baseLineCount: 1,
        mainColor: ['#0083d0'],
        fillColor: ['#29a7ff']
    },
    axis: {
        label: ['属性A', '属性B', '属性C', '属性D', '属性E', '属性F'],
        axisMax: [120, 70, 150, 80, 90, 25]
    },
    data: [[85, 57, 88, 36, 72, 19]]
}
</script>
```

:::

</details>

## 参数定义

`RadarChartContext`中所有属性均为可选项，如果没有传入则会与默认值合并

传入数据时应保证数据的合理性和一致性，详情请参考下面的类型定义说明

```ts
// RadarChartContext 定义
type RadarChartContext = {
    style?: {
        canvasSize?: number // 边长大小
        edgeCount?: number // 雷达图边形数量（应大于2）
        baseLineCount?: number // 基准线条数
        mainColor?: string[] // 点和边的颜色（支持命名颜色，rgb，rgba，hex格式）
        fillColor?: string[] // 填充颜色（支持命名颜色，rgb，rgba，hex格式）
    }
    axis?: {
        label?: string[] // 坐标名称（长度应与edgeCount保持一致）
        labelStyle: string // 坐标字体样式（类型为CanvasRenderingContext2D.font）
        labelColor: string // 坐标字体颜色（支持命名颜色，rgb，rgba，hex格式）
        axisMax?: number[] // 坐标最大值（长度应与edgeCount保持一致）
    }
    data?: number[][] // 数据（第二维长度应与edgeCount保持一致）
}

// RadarChartContext 默认值
const defaultContext = {
    style: {
        canvasSize: 600,
        edgeCount: 6,
        baseLineCount: 2,
        mainColor: ['#91cc75', '#4aa7e3', '#f1a731', '#ee6666', '#8055cd'],
        fillColor: ['#00ff00', '#00aeec', '#ffff00', '#ff0000', '#800080']
    },
    axis: {
        label: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'],
        labelStyle: '22px Arial',
        labelColor: '#000000',
        axisMax: [100, 100, 100, 100, 100, 100]
    },
    data: [[65, 65, 65, 65, 65, 65]]
}
```

## 多组数据

你可以在同一张图上渲染多组数据

<div class="card">
    <multiple />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <t-radar-chart :context="context" />
</template>

<script setup lang="ts">
import type { RadarChartContext } from 'tea-design'

const context: RadarChartContext = {
    style: {
        edgeCount: 5
    },
    axis: {
        labelStyle: 'bold 24px sans-serif',
        labelColor: 'grey',
        axisMax: [100, 100, 100, 100, 100]
    },
    data: [
        [85, 30, 30, 30, 30],
        [30, 85, 30, 30, 30],
        [30, 30, 85, 30, 30],
        [30, 30, 30, 85, 30],
        [30, 30, 30, 30, 85]
    ]
}
</script>
```

```vue [ JavaScript ]
<template>
    <t-radar-chart :context="context" />
</template>

<script setup>
const context = {
    style: {
        edgeCount: 5
    },
    axis: {
        labelStyle: 'bold 24px sans-serif',
        labelColor: 'grey',
        axisMax: [100, 100, 100, 100, 100]
    },
    data: [
        [85, 30, 30, 30, 30],
        [30, 85, 30, 30, 30],
        [30, 30, 85, 30, 30],
        [30, 30, 30, 85, 30],
        [30, 30, 30, 30, 85]
    ]
}
</script>
```

:::

</details>

## 悬浮选择

通过绑定`hover`事件来接受悬浮图标的反馈，该事件只在悬浮主体发生变化时触发，返回值为该图在数据中的下标或`null`（只有从悬浮状态离开时才会返回空值）

特别地，当设置某个图的`fillColor`属性为`none`的时候，它将不会渲染填充颜色，悬浮也只在边缘处触发

<div class="card">
    <hover />
</div>

<details>
<summary>展开查看</summary>

:::code-group

```vue [ TypeScript ]
<template>
    <div class="row">
        <t-radar-chart :context="context" @hover="handleHover" />
    </div>

    <div class="info-card" v-if="cardVisible" :style="cardStyle">
        <h3>个人能力图 {{ hoverElement! }}</h3>
        <ul>
            <li>
                学习<b>{{ data[hoverElement!][0] }}</b>
            </li>
            <li>
                吃饭<b>{{ data[hoverElement!][1] }}</b>
            </li>
            <li>
                睡觉<b>{{ data[hoverElement!][2] }}</b>
            </li>
            <li>
                游戏<b>{{ data[hoverElement!][3] }}</b>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { RadarChartContext } from 'tea-design'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const data = [
    [3, 9, 2, 4],
    [5, 2, 6, 8]
]
const context: RadarChartContext = {
    style: {
        edgeCount: 4,
        mainColor: ['#f93d78', '#eb8f3b'],
        fillColor: ['#ff0000', 'none']
    },
    axis: {
        axisMax: [10, 10, 10, 10],
        label: ['学习', '吃饭', '睡觉', '游戏']
    },
    data: data
}

const cardVisible = ref<boolean>(false)
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
})

const handleMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
}

const cardStyle = computed(() => {
    return {
        top: mouseY.value + 20 + 'px',
        left: mouseX.value + 20 + 'px'
    }
})

const hoverElement = ref<number | null>(null)
const handleHover = (value: number | null) => {
    if (value !== null) {
        cardVisible.value = true
        hoverElement.value = value
    } else {
        cardVisible.value = false
        hoverElement.value = null
    }
}

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="less" scoped>
.info-card {
    padding: 0 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 1px 2px 8px 3px;
    position: fixed;
    background-color: white;

    h3 {
        margin-top: 20px;
    }

    li {
        font-size: 20px;

        b {
            margin-left: 30px;
        }
    }
}
</style>
```

```vue [ JavaScript ]
<template>
    <div class="row">
        <t-radar-chart :context="context" @hover="handleHover" />
    </div>

    <div class="info-card" v-if="cardVisible" :style="cardStyle">
        <h3>个人能力图 {{ hoverElement }}</h3>
        <ul>
            <li>
                学习<b>{{ data[hoverElement][0] }}</b>
            </li>
            <li>
                吃饭<b>{{ data[hoverElement][1] }}</b>
            </li>
            <li>
                睡觉<b>{{ data[hoverElement][2] }}</b>
            </li>
            <li>
                游戏<b>{{ data[hoverElement][3] }}</b>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const data = [
    [3, 9, 2, 4],
    [5, 2, 6, 8]
]
const context = {
    style: {
        edgeCount: 4,
        mainColor: ['#f93d78', '#eb8f3b'],
        fillColor: ['#ff0000', 'none']
    },
    axis: {
        axisMax: [10, 10, 10, 10],
        label: ['学习', '吃饭', '睡觉', '游戏']
    },
    data: data
}

const cardVisible = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
})

const handleMouseMove = e => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
}

const cardStyle = computed(() => {
    return {
        top: mouseY.value + 20 + 'px',
        left: mouseX.value + 20 + 'px'
    }
})

const hoverElement = ref(null)
const handleHover = value => {
    if (value !== null) {
        cardVisible.value = true
        hoverElement.value = value
    } else {
        cardVisible.value = false
        hoverElement.value = null
    }
}

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="less" scoped>
.info-card {
    padding: 0 30px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 1px 2px 8px 3px;
    position: fixed;
    background-color: white;

    h3 {
        margin-top: 20px;
    }

    li {
        font-size: 20px;

        b {
            margin-left: 30px;
        }
    }
}
</style>
```

:::

</details>

## 相关属性

| 属性名  | 说明     | 类型              | 默认值                         |
| ------- | -------- | ----------------- | ------------------------------ |
| context | 配置信息 | RadarChartContext | defaultContext（见“基本用法”） |

## 相关事件

| 事件名 | 说明             | 回调参数              |
| ------ | ---------------- | --------------------- |
| hover  | 悬浮时触发该事件 | value: number \| null |

<script setup>
import demo from './example/demo.vue'
import multiple from './example/multiple.vue'
import hover from './example/hover.vue'
</script>
