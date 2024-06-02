import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import '@/css/main.css'
import '@/css/button.css'
import '@/css/layout.css'
import '@/css/custom.css'
import pinia from './store';

import logger from './service/logger'; // Import the logger

//const mainApp = createApp(App).use(store).use(router).mount('#app')
//const mainApp = createApp(App).use(router).mount('#app')

const mainApp = createApp(App);
mainApp.use(router);
mainApp.use(pinia);
mainApp.config.globalProperties.$logger = logger;

mainApp.mount('#app');
console.log("mainApp", mainApp);


//Shortcuts Functions

