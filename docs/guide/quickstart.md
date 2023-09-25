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

目前实现了两种按需引入的方式，引入的路径规则为`tea-design/dist/es/ + 组件名（短横线命名）`

如果你的项目是`vue3 + ts`，则需要新建`.ts`或`.d.ts`文件，在里面使用`declare module [路径]`的形式声明该模块

- 全局按需注册

全局注册时组件引入的名称为`T + 组件名（大驼峰命名） + Install`，然后可以在全局中使用

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { TCalendarHeatmapInstall } from 'tea-design/dist/es/calendar-heatmap'
import { TGraphInstall } from 'tea-design/dist/es/graph'
import 'tea-design/dist/style.css'

createApp(App).use(TCalendarHeatmapInstall).use(TGraphInstall).mount('#app')
```

- 直接按需引入

直接引入时组件引入的名称为`T + 组件名（大驼峰命名）`，然后可以在该文件的模板中使用

```ts
// main.ts
import 'tea-design/dist/style.css'

// vue 组件中
import { TCalendarHeatmap } from 'tea-design/dist/es/calendar-heatmap'
import { TGraph } from 'tea-design/dist/es/graph'
```