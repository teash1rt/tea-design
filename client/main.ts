import { createApp } from 'vue'
import App from './App.vue'
import TeaDesign from '../src'
import router from './router'
import './style.less'

createApp(App).use(router).use(TeaDesign).mount('#app')
