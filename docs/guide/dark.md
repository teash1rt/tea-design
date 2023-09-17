# 暗黑模式

在暗黑模式下，我们为组件赋予了更加适配的色彩和样式

## 基本用法

:::warning canvas 组件的暗黑模式

Tea Design 中**雷达图**与**节点图**使用 canvas 进行绘制，这会导致在切换主题时字体样式不会变化，提供两种解决方法供参考

-   初始成兼容的颜色(如灰色)

-   配置不同的颜色样式，参考下面代码首先判断全局所处于的主题模式，然后使用 v-if 渲染不同的配置

:::

-   通过使用 Tea Design 提供的`useDark(value: boolean)`方法动态的控制暗黑模式的开启和关闭

```ts
import { useDark } from 'tea-design'

useDark(true)
```

-   该方法会返回当前状态是否为暗黑模式

<div class="card">
    <useDark />
</div>

```vue
<template>
    <button @click="changeTheme">{{ theme }} Theme</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from 'tea-design'

const theme = ref<string>('Light')

const changeTheme = () => {
    let isDark = useDark()
    isDark = useDark(!isDark)
    theme.value = isDark ? 'Dark' : 'Light'
}
</script>

<style lang="less" scoped>
button {
    background-color: #44bd87;
    padding: 10px 20px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1rem;
}
</style>
```

## 进阶配置

`useDark`的原理是在html标签上添加`class="dark"`，且该方法只会改变组件本身的样式而非页面样式，你可以自定义补充暗黑模式下的其他样式

```css
/* 全局样式中 */
html.dark {
    background-color: #000000;
    color: #dededf;
}
```

<script setup>
import useDark from './example/useDark.vue'
</script>
