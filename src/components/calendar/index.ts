import type { App } from 'vue'
import calendar from './src/calendar.vue'

export const TCalendarInstall = {
    install: (app: App) => {
        app.component(calendar.name, calendar)
    }
}

export { calendar as TCalendar }
