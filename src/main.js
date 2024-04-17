import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/main.css'
import '@/css/button.css'
import '@/css/layout.css'

createApp(App).use(store).use(router).mount('#app')

