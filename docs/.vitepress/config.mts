import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AWMC Bot & Services",
  description: "AWMC Bot 及其相关服务的官方帮助文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '帮助文档', link: '/guide/introduction' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是 AWMC Bot?', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: '其他服务',
        items: [
          { text: '服务概览', link: '/services/overview' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present AWMC'
    }
  }
})
