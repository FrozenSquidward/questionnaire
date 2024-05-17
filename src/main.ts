import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/router'

const app = createApp(App);
app.use(ElementPlus) //根组件的挂载在 ElementPlus 的使用之后
app.use(router)
app.mount('#app')
