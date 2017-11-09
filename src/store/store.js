import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    sourceType : '请选择',
    deviceCount : 0,
    chosenNews : [],
    customShareInfo : {
        title : '',
        url : '',
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
        state.deviceCount = 0
        state.chosenNews = []
    },
    setChosenNews (state, array) {
        state.chosenNews = array;
        state.sourceType = '新闻列表'
    },
    setCustomShareInfo (state, {title, url}) {
        state.customShareInfo.title = title
        state.customShareInfo.url = url
        state.sourceType = '手动设置'
    },
    changeDeviceCount (state, count) {
        state.deviceCount = count
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
