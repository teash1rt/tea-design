export const BuildOutputConfig = (isBuildingES: boolean) => {
    if (isBuildingES) {
        return {
            format: 'es',
            preserveModules: true,
            entryFileNames: '[name].js',
            globals: {
                vue: 'Vue'
            },
            exports: 'named',
            dir: 'dist/es',
            inlineDynamicImports: false
        } as const
    }

    return {
        format: 'cjs',
        globals: {
            vue: 'Vue'
        },
        entryFileNames: '[name].cjs',
        exports: 'named',
        dir: 'dist/cjs'
    } as const
}
