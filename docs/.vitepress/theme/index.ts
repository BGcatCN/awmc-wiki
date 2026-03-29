import DefaultTheme from 'vitepress/theme'
import StatChart from './components/StatChart.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StatChart', StatChart)
  }
}
