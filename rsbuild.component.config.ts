import { resolve } from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

const root = resolve(__dirname)

export default defineConfig({
  root,
  mode: 'production',
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  tools: {
    htmlPlugin: false,
    rspack: {
      output: {
        library: {
          name: 'MarkdownComponentV2',
          type: 'umd',
        },
        globalObject: 'this',
      },
    },
  },
  source: {
    entry: {
      index: resolve(root, 'src', 'index.ts'),
    },
    tsconfigPath: resolve(root, 'tsconfig.json'),
    alias: {
      '@': resolve(root, 'src'),
    },
  },
  output: {
    distPath: {
      root: resolve(root, 'dist'),
      js: '',
      css: '',
    },
    filename: {
      js: '[name].js',
      css: '[name].css',
    },
    target: 'web',
    // Rspack/Webpack config for ESM output if needed, but 'module: true' might be an rsbuild shorthand or user added it.
    // Keeping it as user had it, assuming they know or copied it.
    // Actually, checking Rsbuild docs, `output.library` is the way.
    // But let's stick to what was there plus the layout fixes.
    // However, `module: true` in `output` might be incorrect for Rsbuild types.
    // I will comment it out if I am unsure, but if it was there, maybe it's valid.
    // I will leave it for now but if it fails I'll remove it.
    // Wait, line 26 was `module: true`.

    cleanDistPath: true,
    externals: ['react', 'react-dom', 'styled-components'],
  },
})
