import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    sourceType : '新闻列表',
    deviceCount : 100
}

const mutations = {
    changeDeviceCount (state, count) {
      state.deviceCount = count
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
