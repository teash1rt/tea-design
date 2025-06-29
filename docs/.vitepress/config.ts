import pkg from '../../package.json'

export default {
    base: '/tea-design/',
    lang: 'zh-CN',
    title: 'Tea Design',
    head: [['link', { rel: 'icon', href: '/header.png' }]],
    themeConfig: {
        logo: '/header.png',
        outline: [2, 3],
        nav: [
            { text: '指南', link: '/guide/quickstart' },
            { text: '组件', link: '/components/calendar-heatmap/' },
            { text: `v${pkg.version}`, link: '/guide/version' }
        ],
        search: {
            provider: 'local'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/teash1rt/tea-design' }],
        sidebar: {
            '/guide/': [
                {
                    text: '基础',
                    items: [
                        { text: '介绍', link: '/guide/intro' },
                        { text: '快速开始', link: '/guide/quickstart' },
                        { text: '暗黑模式', link: '/guide/dark' }
                    ]
                },
                {
                    text: '进阶',
                    items: [
                        { text: '版本', link: '/guide/version' },
                        { text: '开发', link: '/guide/develop' }
                    ]
                }
            ],
            '/components/': [
                {
                    text: '图表',
                    items: [
                        { text: '节点图 Graph', link: '/components/graph/' },
                        { text: '日历热力图 Calendar Heatmap', link: '/components/calendar-heatmap/' },
                        { text: '雷达图 Radar Chart', link: '/components/radar-chart/' }
                    ]
                },
                {
                    text: '装饰',
                    items: [
                        { text: '日历 Calendar', link: '/components/calendar/' },
                        { text: '悬浮按钮 Float Button', link: '/components/float-button/' },
                        { text: '随机生成器 Rollcall', link: '/components/rollcall/' }
                    ]
                },
                {
                    text: '反馈',
                    items: [
                        { text: '文字提示 Tooltip', link: '/components/tooltip/' },
                        { text: '打字显示 Typewrite', link: '/components/typewrite/' }
                    ]
                }
            ]
        },
        footer: {
            copyright: 'Copyright © 2023-present Teashirt'
        }
    }
}
