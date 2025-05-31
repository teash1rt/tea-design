import type { App } from 'vue'
import { components } from './components'
import './styles/root.less'
import './styles/var.less'

const TeaDesign = {
    install: (app: App) => {
        for (const component of components) {
            component.install(app)
        }
    }
}

export * from './components'

export { useDark } from './common/functions'

export type { Position } from './common/types'

export default TeaDesign
