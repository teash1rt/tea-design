import type { App } from 'vue'
import { components } from './components'

const TeaDesign = {
    install: (app: App) => {
        for (const component of components) {
            component.install(app)
        }
    }
}

export * from './components/index'

export { useDark } from './common/functions'

export type { Position } from './common/types'

export default TeaDesign
