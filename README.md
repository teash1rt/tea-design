<div align="center">
  <img width="130px" style="margin-bottom:24px;" src="https://raw.githubusercontent.com/teashirtt/tea-design/master/docs/public/header.png">
<h1 style="margin-top: 0px;">Tea Design</h1>

<p>基于Vue3，专注于实际需求的非通用组件库</p>

<p align="center" style="margin-top:24px;">
  <a href="https://github.com/ChaiMayor/hview-ui">
    <img src="https://img.shields.io/badge/vite-4.4.0%2B-blue"/>
  </a>
  <a href="https://github.com/ChaiMayor/hview-ui">
    <img src="https://img.shields.io/badge/vue-3.3.0%2B-blue"/>
  </a>
  <a href="https://www.npmjs.com/package/hview-plus">
    <img src="https://img.shields.io/badge/coverage-&#8805;94%25-green">
  </a>
  <a href="https://github.com/ChaiMayor/hview-ui">
    <img src="https://img.shields.io/badge/license-MIT-green"/>
  </a>
  <br>
</p>

</div>

## 介绍

Tea Design 是一个专注于实际需求的非通用 Vue3 组件库，它使用 TypeScript 和 Vite 全家桶进行开发和测试

**组件库文档：https://teashirtt.github.io/tea-design**

## 特性

-   🌟使用 TypeScript 开发，提供完整的类型定义
-   🔐通过 Eslint 搭配 Prettier 规范代码
-   🛠️支持按需引入和暗黑模式
-   💪单元测试覆盖率 &#8805; 94%
-   🎯参数异常时提供精准的定位和提示信息
-   💡遵循约定大于配置的设计原则

## 快速开始

-   安装

```shell
npm install tea-design
```

-   使用

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import TeaDesign from 'tea-design'
import 'tea-design/dist/style.css'

createApp(App).use(TeaDesign).mount('#app')
```

## 项目构建

-   核心：vue3，typescript，less，vite
-   规范：eslint，prettier，husky，commitlint
-   测试：vitest，@vue/test-utils
-   文档：vitepress
