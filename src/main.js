import Vue from 'vue'
import Vonic from 'vonic'
import store from './store/store'

import VueResource from 'vue-resource';
Vue.use(VueResource);

import ConfirmButton from 'src/components/ConfirmButton'
Vue.component('ConfirmButton', ConfirmButton)

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

// Page Components
import Index from './components/Index.vue'
import AddShare from './page/addShare/AddShare.vue'
import ChooseSource from './page/addShare/ChooseSource.vue'
import ChooseDevices from './page/addShare/ChooseDevices.vue'
import NewsList from './page/addShare/NewsList.vue'
import SetContent from './page/addShare/SetContent.vue'
import TaskProcess from './page/addShare/TaskProcess.vue'
import TaskList from './page/addShare/TaskList.vue'

const NotFoundComponent = { template: '<div style="font-size:40px; text-align:center; margin-top:100px">404 Not Found</div>' }

const routes = [
  {path: '*', component: NotFoundComponent},
  {path: '/', component: Index},
  {path: '/addShare', component: AddShare},
  {path: '/chooseSource', component: ChooseSource},
  {path: '/chooseDevices', component: ChooseDevices},
  {path: '/newsList', component: NewsList},
  {path: '/setContent', component: SetContent},
  {path: '/taskProcess', component: TaskProcess},
  {path: '/taskList', component: TaskList}
]

Vue.use(Vonic.app, {
  mode: 'history',
  routes : routes,
  store : store,
})

// TODO:
// 新闻页面+设备页面的选择 ✅
// 网络请求 ✅
// 开关按钮的报错优化 ✅
//新闻列表的样式调整+勾选选择存储 ✅
//web图片懒加载
//上拉加载分页 ✅
