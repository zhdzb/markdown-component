import { resolve } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const root = resolve(__dirname);

export default defineConfig({
  root,
  mode: 'production',
  plugins: [pluginReact()],
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
    distPath: resolve(root, 'dist'),
    filename: {
      js: '[name].js',
    },
    target: 'web',
    module: true,
    cleanDistPath: true,
    externals: ['react', 'react-dom', 'styled-components'],
  },
});

