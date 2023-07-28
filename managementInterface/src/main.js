import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'

import 'view-ui-plus/dist/styles/viewuiplus.css'

//SCSS
import "@/assets/css/app.scss"

// Import Components


const app = createApp(App)
app.use(store)
app.use(router)
app.use(ViewUIPlus)

app.mount('#app')
