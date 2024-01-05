import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'
import router from './router'
import './assets/index.css'

import { createI18n, useI18n } from 'vue-i18n'
import { languages, defaultLocale } from './i18n'

const messages = Object.assign(languages)
const localeStorageLang = localStorage.getItem('lang')
const i18n = createI18n({
  legacy: false,
  locale: localeStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages
})

const app = createApp(App, {
  setup() {
    const { t } = useI18n()
    return { t }
  }
})

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
