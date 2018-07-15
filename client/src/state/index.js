import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pedestalState: {label: 'label'},
    infoState: true
  },
  mutations: {
    changePed (state, data) {
      state.pedestalState = data
    },
    changeState (state, info) {
      state.infoState = info
    }
  }
})

export default store
