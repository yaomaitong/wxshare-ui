import Vue from 'vue'
import Vonic from 'vonic'

// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'

// Routes
const routes = [
  {path: '/', component: Index},
  {path: '/about', component: About},
  {path: '/login', component: Login}
]

Vue.use(Vonic.app, {
  routes: routes
})
