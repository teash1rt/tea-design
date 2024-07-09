import type { App } from 'vue'
import tooltip from './src/tooltip.vue'

export const TTooltipInstall = {
    install: (app: App) => {
        app.component(tooltip.name!, tooltip)
    }
}

export { tooltip as TTooltip }
