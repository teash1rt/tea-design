import type { App } from 'vue'
import rollcall from './src/rollcall.vue'
import type Rollcall from './src/rollcall.vue'

export const TRollcallInstall = {
    install: (app: App) => {
        app.component(rollcall.name, rollcall)
    }
}

export { rollcall as TRollcall }

export type RollcallRef = InstanceType<typeof Rollcall>
