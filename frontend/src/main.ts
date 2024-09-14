import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

app.use(VueLazyload, {
    preLoad: 15,
    error: '/image01.jpg',
    loading: '/image01.jpg',
    attempt: 1
});

app.use(createPinia())
app.use(router)

app.mount('#app')
