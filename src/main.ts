import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roteador from './roteador'

createApp(App)
    .use(roteador)      //Apontando pro vue que a aplicação tem o roteador
    .mount('#app')
