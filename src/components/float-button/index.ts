import type { App } from 'vue'
import floatButton from './src/float-button.vue'
import floatItem from './src/lib/float-item.vue'

export const TFloatButtonInstall = {
    install: (app: App) => {
        app.component(floatButton.name, floatButton)
    }
}

export const TFloatItemInstall = {
    install: (app: App) => {
        app.component(floatItem.name, floatItem)
    }
}

export { floatButton as TFloatButton, floatItem as TFloatItem }
