import Vue from 'vue'
import Vonic from 'vonic'
import './components/global'

//
import ConfirmButton from 'src/components/ConfirmButton'

Vue.component('ConfirmButton', ConfirmButton)

// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'

import AddShare from './page/addShare/AddShare.vue'
import ChooseSource from './page/addShare/ChooseSource.vue'
import ChooseDevices from './page/addShare/ChooseDevices.vue'
import NewsList from './page/addShare/NewsList.vue'
import SetContent from './page/addShare/SetContent.vue'

// Routes
const routes = [
  {path: '/', component: Index},
  {path: '/about', component: About},
  {path: '/login', component: Login},
  {path: '/addShare', component: AddShare},
  {path: '/chooseSource', component: ChooseSource},
  {path: '/chooseDevices', component: ChooseDevices},
  {path: '/newsList', component: NewsList},
  {path: '/setContent', component: SetContent}
]

Vue.use(Vonic.app, {
  routes: routes
})
