import { createVNode, render } from 'vue'
import Typewrite from './src/typewrite.vue'
import type { TypewriteContext } from './src/lib/settings'

export const useTypewrite = (context?: TypewriteContext) => {
    const vm = createVNode(Typewrite, { context: context })
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(vm, container)

    return {
        start: vm.component!.exposed!.start,
        stop: vm.component!.exposed!.stop,
        unmount: () => {
            render(null, container)
            document.body.removeChild(container)
        }
    }
}

export type { TypewriteContext }
