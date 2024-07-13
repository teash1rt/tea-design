/// <reference types="vitest" />
import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

const customEntry = {}
const commons = ['canvas', 'errors', 'functions', 'generics', 'checks']
for (const e of commons) {
    customEntry[e] = path.resolve(__dirname, `src/common/${e}.ts`)
}
customEntry['index'] = path.resolve(__dirname, 'src/index')

fs.readdirSync(path.resolve(__dirname, 'src/components')).map(name => {
    if (!name.endsWith('.ts')) {
        customEntry[name] = path.join(__dirname, 'src/components/' + name + '/index.ts')
    }
})

export default defineConfig({
    plugins: [
        vue(),
        DefineOptions(),
        visualizer({
            open: true,
            filename: 'stats.html',
            gzipSize: true
        }),
        dts({
            exclude: '**/test.spec.ts'
        })
    ],
    build: {
        lib: {
            entry: customEntry,
            name: 'tea-design',
            formats: ['es', 'cjs'],
            fileName: (format, name) => {
                if (name === 'index') {
                    return format === 'es' ? 'index.mjs' : 'index.cjs'
                } else if (commons.includes(name)) {
                    return format === 'es' ? `common/${name}.mjs` : `common/${name}.cjs`
                } else {
                    return format === 'es' ? `es/${name}/index.mjs` : `lib/${name}/index.cjs`
                }
            }
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        outDir: 'dist'
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
