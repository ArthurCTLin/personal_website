import { defineConfig } from 'vitepress'

const base = process.env.NODE_ENV === 'production' ? '/personal_website/' : '/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: base,
  title: "AEGIS Lab",
  description: "Arthur's Advanced AI Solutions",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
