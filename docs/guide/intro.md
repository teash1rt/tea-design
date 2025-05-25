# 介绍

Tea Design 是一个 Vue3 组件库，专注于冷门但是实用的前端组件

它使用 TypeScript 和 Vite 全家桶进行开发和测试

## 特点

### 针对性

相比于其他通用组件库，Tea Design 更加关注前端开发者的特殊需求，追求创新与实用的结合

### 一致性

Tea Design 组件与主流组件库的使用流程保持一致，并且遵循用户的使用逻辑和习惯

### 约定性

Tea Design 以约定大于配置作为设计原则，为组件属性提供适配的默认值，开发者可按需求选择性的配置

### 简洁性

-   样式简洁：组件的样式风格在设计与开发过程中追求简洁美观
-   API 简洁：组件的 API 简洁且易用，具有高度可组合性，在参数异常时会提供详细的位置定位和更改建议
-   体积简洁：组件库整体打包体积小，耦合性低，并且组件全面支持按需引入

### 完整性

-   组件功能完整：组件提供完整且稳定的功能
-   开发流程完整：遵循“需求分析--设计--开发--测试--文档编写--维护”的流程

## 数据

-   打包体积

| style.css | dist    |
| --------- | ------- |
| 17 B      | 62.4 kB |

-   测试覆盖率

Tea Design 所有组件的测试总覆盖率 &#8805; 94%

## 社区

我们鼓励前端开发者和设计者共同学习、分享和探索前端开发中的最佳实践和创意

Tea Design 地址: [Tea Design](https://github.com/teash1rt/tea-design)

## 贡献

<VPTeamMembers size="small" :members="members" />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/95997368?v=4',
    name: 'TeaShirt',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/teash1rt' }
    ]
  }
]
</script>
