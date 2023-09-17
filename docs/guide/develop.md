# 开发

## 启动项目

:::code-group

```shell [ npm ]
npm install
```

```shell [ pnpm ]
pnpm install
```

:::

这将会下载开发所需要的全部依赖

:::code-group

```shell [ npm ]
npm run dev
```

```shell [ pnpm ]
pnpm run dev
```

:::

这将会启动 client/App.vue ，它是开发时的预览文件

## 运行测试

:::code-group

```shell [ npm ]
npm run test
```

```shell [ pnpm ]
pnpm run test
```

:::

这将会运行项目中所有的 vitest 测试文件

:::code-group

```shell [ npm ]
npm run coverage
```

```shell [ pnpm ]
pnpm run coverage
```

:::

这将会计算测试覆盖率，并在根目录下生成 coverage 覆盖率可视化目录，运行 coverage 目录下的的 index.html 可查看各组件的测试覆盖情况

## 代码检查

:::code-group

```shell [ npm ]
npm run lint
```

```shell [ pnpm ]
pnpm run lint
```

:::

这将会执行 eslint 代码规范检查，并执行 prettier 格式化，如果只想格式化代码而不进行代码检查，可执行下面的命令：

:::code-group

```shell [ npm ]
npm run format
```

```shell [ pnpm ]
pnpm run format
```

:::

## 编辑文档

:::code-group

```shell [ npm ]
npm run docs:dev
```

```shell [ pnpm ]
pnpm run docs:dev
```

:::

这将会启动 vitepress 文档

## 项目打包

:::code-group

```shell [ npm ]
npm run build
```

```shell [ pnpm ]
pnpm run build
```

:::

这将会打包项目，并在根目录下生成 stats.html 打包结果可视化文件，运行可查看各组件的打包体积大小

:::code-group

```shell [ npm ]
npm run docs:build
```

```shell [ pnpm ]
pnpm run docs:build
```

:::

这将会打包 vitepress 文档