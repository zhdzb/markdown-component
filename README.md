# Markdown 组件 (v2)

## 技术栈

- React 18.0.0
- TypeScript 5.9.2
- styled-components 5.3.3
- 构建工具：Rsbuild（基于 rspack）

## 结构概览

- `src/components/`: 最终导出的组件逻辑，不含 playground；
- `src/playground/`: 供开发时调试的 playground，其中包含 “全屏” 与 “可缩放嵌套” 两种模式；
- `rsbuild.component.config.ts`: 单纯打组件的配置，输出 `dist/` 并把 React/Styled-components 作为外部依赖；
- `rsbuild.playground.config.ts`: 仅用于跑 playground 的 dev/build，不会混入到 `dist/`；
- `tsconfig.json`: 全局 TypeScript 配置，覆盖 React JSX、声明文件输出等。

## 运行与构建

- `npm run build`：使用 `rsbuild.component.config.ts` 打包，产物在 `dist/`，只包含组件相关代码；
- `npm run playground:dev`：启动 playground 的开发服务器，内置全屏与嵌套模式预览；
- `npm run playground:build`：为 playground 生成独立的 `playground-dist/`，仅供调试；
- `npm run typecheck`：运行 TypeScript 的类型检查（不会产出 JS 文件）。

## playground 特性

1. **全屏模式（Full Screen）**：模拟组件独占视口的样子，方便确认组件在大屏场景下的表现；
2. **可缩放嵌套模式（Resizable Playground）**：可以通过鼠标拖动改变容器尺寸，滚轮控制 scale，与宿主容器的适配度一目了然；
3. **Playground 只在开发时加载**：`.playground` 相关路径没有被包含在 `rsbuild.component.config.ts` 的入口配置中，打包出的 `dist/` 不会带入任何 playground 逻辑或依赖。

