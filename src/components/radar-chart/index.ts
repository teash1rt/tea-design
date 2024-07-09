import type { App } from 'vue'
import radarChart from './src/radar-chart.vue'

export const TRadarChartInstall = {
    install: (app: App) => {
        app.component(radarChart.name!, radarChart)
    }
}

export { radarChart as TRadarChart }

export type { RadarChartContext } from './src/lib/settings'
