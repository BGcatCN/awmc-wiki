import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import StatChart from './components/StatChart.vue'
import ReadingTime from './components/ReadingTime.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StatChart', StatChart)
    app.component('ReadingTime', ReadingTime)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ReadingTime)
    })
  }
}
