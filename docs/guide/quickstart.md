# 快速开始

Tea Design 仅支持 Vue3

## 安装

:::code-group

```shell [ npm ]
npm install tea-design
```

```shell [ pnpm ]
pnpm install tea-design

```

:::

## 全局引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import TeaDesign from 'tea-design'
import 'tea-design/dist/style.css'

createApp(App).use(TeaDesign).mount('#app')
```

## 按需引入

Tea Design 组件支持 tree shaking，样式暂时需要全额引入

```ts
// main.ts
import 'tea-design/dist/style.css'

// vue 组件中
import { TCalendarHeatmap } from 'tea-design'
import { TGraph } from 'tea-design'
```