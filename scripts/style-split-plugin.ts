import path from 'path'
import fs from 'fs'
import less from 'less'
import { PluginOption } from 'vite'

interface TransTaskProps {
    id: string
    code: string
}

const styleSplitService = () => {
    const transList: TransTaskProps[] = []

    const delList: string[] = ['style.css']

    const addTransTask = (task: TransTaskProps) => transList.push(task)

    const transImpl = async (task: TransTaskProps) => {
        const { id, code } = task
        const matchResult = id.match(/.*\/tea-design\/src\/(.*)\.less/)
        if (!matchResult) {
            return
        }
        const { css } = await less.render(code, {
            paths: [path.dirname(id)],
            filename: id,
            javascriptEnabled: true,
            compress: true
        })

        fs.writeFileSync(path.resolve('dist/es', matchResult[1] + '.css'), css)
    }

    const handleTransTask = () => {
        transList.forEach(transImpl)
    }

    const addDelTask = (fileName: string) => delList.push(fileName)

    const handleDelTask = () => {
        delList.forEach(fileName => fs.unlinkSync(path.resolve('dist', 'es', fileName)))
    }

    return { addTransTask, handleTransTask, addDelTask, handleDelTask }
}

export const StyleSplit = (): PluginOption => {
    const { addTransTask, handleTransTask, addDelTask, handleDelTask } = styleSplitService()

    return {
        name: 'vite-plugin-style-split',
        transform(code, id) {
            if (id.endsWith('.less')) {
                addTransTask({ id, code })
            }

            return undefined
        },
        generateBundle(_, bundle) {
            Object.keys(bundle).forEach(fileName => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { code }: { code: string } = bundle[fileName] as any

                if (fileName.endsWith('.less.js')) {
                    addDelTask(fileName)
                    return
                }

                this.emitFile({
                    type: 'asset',
                    fileName,
                    source: code.replace(/\.less\.js/g, '.css')
                })
            })
        },
        writeBundle() {
            handleTransTask()
            handleDelTask()
        }
    }
}
