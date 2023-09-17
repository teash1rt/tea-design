import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'overview',
        component: () => import('./example/overview.vue'),
        meta: {
            title: '总览'
        }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('./example/calendar.vue'),
        meta: {
            title: '日历'
        }
    },
    {
        path: '/calendar-heatmap',
        name: 'calendar-heatmap',
        component: () => import('./example/calendar-heatmap.vue'),
        meta: {
            title: '日历热力图'
        }
    },
    {
        path: '/tooltip',
        name: 'tooltip',
        component: () => import('./example/tooltip.vue'),
        meta: {
            title: '文字提示'
        }
    },
    {
        path: '/float-button',
        name: 'float-button',
        component: () => import('./example/float-button.vue'),
        meta: {
            title: '浮动按钮'
        }
    },
    {
        path: '/rollcall',
        name: 'rollcall',
        component: () => import('./example/rollcall.vue'),
        meta: {
            title: '随机生成器'
        }
    },
    {
        path: '/radar-chart',
        name: 'radar-chart',
        component: () => import('./example/radar-chart.vue'),
        meta: {
            title: '雷达图'
        }
    },
    {
        path: '/typewrite',
        name: 'typewrite',
        component: () => import('./example/typewrite.vue'),
        meta: {
            title: '按键显示'
        }
    },
    {
        path: '/graph',
        name: 'graph',
        component: () => import('./example/graph.vue'),
        meta: {
            title: '节点图'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
