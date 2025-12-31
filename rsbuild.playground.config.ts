import { resolve } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const root = resolve(__dirname);

export default defineConfig({
  root,
  mode: 'development',
  plugins: [pluginReact()],
  source: {
    entry: {
      playground: resolve(root, 'src', 'playground', 'index.tsx'),
    },
    tsconfigPath: resolve(root, 'tsconfig.json'),
  },
  output: {
    distPath: resolve(root, 'playground-dist'),
    filename: {
      js: '[name].js',
    },
    target: 'web',
    module: true,
    cleanDistPath: true,
  },
  server: {
    port: 4173,
  },
});

