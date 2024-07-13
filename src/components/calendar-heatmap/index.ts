import type { App } from 'vue'
import calendarHeatmap from './src/calendar-heatmap.vue'

export const TCalendarHeatmapInstall = {
    install: (app: App) => {
        app.component(calendarHeatmap.name!, calendarHeatmap)
    }
}

export { calendarHeatmap as TCalendarHeatmap }
