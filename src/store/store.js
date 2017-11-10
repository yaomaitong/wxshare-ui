import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    sourceType : '请选择',
    deviceCount : '全部',
    chosenNews : [],
    chosenDevices :[],
    isAllDevice : true,
    customShareInfo : {
        title : '',
        url : '',
        desc : '',
        imgUrl : null
    },
}

const mutations = {
    setImageUrl (state, url) {
        state.customShareInfo.imgUrl = url;
    },
    clear (state) {
        state.customShareInfo.title = ''
        state.customShareInfo.url = ''
        state.customShareInfo.imgUrl = null
        state.sourceType = '请选择'
        state.deviceCount = '全部'
        state.isAllDevice = true
        state.chosenNews = []
    },
    setChosenNews (state, array) {
        state.chosenNews = array;
        state.sourceType = '新闻列表'
    },
    setCustomShareInfo (state, {title, url, desc}) {
        state.customShareInfo.title = title
        state.customShareInfo.url = url
        state.customShareInfo.desc = desc
        state.sourceType = '手动设置'
    },
    changeChosenDevices (state, {devices, isAll}) {
        state.chosenDevices = devices
        console.log('======');
        console.log(isAll);
        if (isAll) {
            state.deviceCount = '全部'
            state.isAllDevice = true
        } else {
            state.deviceCount = devices.length + '台'
            state.isAllDevice = false
        }
    },
    changeIsAllDevice (state, isAll) {
        state.isAllDevice = isAll
    },
    changeSourceType (state, text) {
      state.sourceType = text
    }
}

var store = new Vuex.Store({
    state,
    mutations
})

export default store
