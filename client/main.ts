import { createApp } from 'vue'
import TeaDesign from '../src'
import App from './App.vue'
import router from './router'
import './style.less'

createApp(App).use(router).use(TeaDesign).mount('#app')
