import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
