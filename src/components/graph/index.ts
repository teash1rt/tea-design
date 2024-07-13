import type { App } from 'vue'
import graph from './src/graph.vue'
import type Graph from './src/graph.vue'

export const TGraphInstall = {
    install: (app: App) => {
        app.component(graph.name!, graph)
    }
}

export { graph as TGraph }

export type { GraphContext } from './src/lib/settings'

export type GraphRef = InstanceType<typeof Graph>
