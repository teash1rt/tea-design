/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        vue(),
        DefineOptions(),
        visualizer({
            filename: 'stats.html',
            gzipSize: true
        }),
        dts({
            include: 'src',
            exclude: '**/test.spec.ts',
            outDir: 'dist/es'
        })
    ],
    build: {
        lib: {
            entry: path.resolve('src/index')
        },
        rollupOptions: {
            external: ['vue', '@vueuse/core'],
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    entryFileNames: '[name].js',
                    globals: {
                        vue: 'Vue'
                    },
                    exports: 'named',
                    dir: 'dist/es'
                },
                {
                    format: 'cjs',
                    globals: {
                        vue: 'Vue'
                    },
                    entryFileNames: '[name].cjs',
                    exports: 'named',
                    dir: 'dist/cjs'
                }
            ]
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
})
