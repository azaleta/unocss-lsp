import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/*.ts',
  ],
  // format: [
  //   'cjs',
  // ],
  external: ['vscode'],
  sourcemap: true,
  clean: true,
  dts: true,
})
