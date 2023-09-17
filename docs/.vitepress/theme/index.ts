import TeaDesign from '../../../src'
import DefaultTheme from 'vitepress/theme'
import layout from '../../home/layout.vue'
import './var.css'

export default {
    ...DefaultTheme,
    enhanceApp: async ({ app }) => {
        app.use(TeaDesign)
    },
    Layout: layout
}
