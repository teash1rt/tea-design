/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'
import { StyleSplit, BuildOutputConfig } from './scripts'

export default defineConfig(({ mode }) => {
    const isBuildingES = mode === 'es'

    const esPlugin = isBuildingES
        ? [
              dts({
                  include: 'src',
                  exclude: '**/test.spec.ts',
                  outDir: 'dist/es'
              }),
              StyleSplit()
          ]
        : []

    return {
        plugins: [
            vue(),
            DefineOptions(),
            visualizer({
                filename: 'stats.html',
                gzipSize: true
            }),
            ...esPlugin
        ],
        build: {
            lib: {
                entry: path.resolve('src/index')
            },
            rollupOptions: {
                external: ['vue', '@vueuse/core'],
                output: [BuildOutputConfig(isBuildingES)],
                onwarn: (warning, defaultHandler) => {
                    if (warning.code !== 'FILE_NAME_CONFLICT') {
                        defaultHandler(warning)
                    }
                }
            }
        },
        test: {
            environment: 'happy-dom',
            setupFiles: ['./vitest.setup.ts'],
            server: {
                deps: {
                    inline: ['vitest-canvas-mock']
                }
            },
            testTimeout: 20000
        }
    }
})
