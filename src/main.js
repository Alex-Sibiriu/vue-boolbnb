import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import router from './router'
import axios from 'axios'
import http from './data/index.js'

const app = createApp(App)

app.use(router)

// Configurazione globale
app.config.globalProperties.$http = axios;
app.config.globalProperties.$customHttp  = http;

app.mount('#app')
