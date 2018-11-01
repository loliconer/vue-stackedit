import Vue from 'vue'
import Vuex from 'vuex'
import contentState from './contentState'
import content from './content'
import file from './file'
import layout from './layout'

const debug = true

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contentState,
    content,
    file,
    layout
  },
  state: {
    offline: false,
    minuteCounter: 0,
    url: '',
    scrollSync: true
  },
  mutations: {
    updateMinuteCounter(state) {
      state.minuteCounter += 1
    },
    setUrl(state, url) {
      state.url = url
    },
    setScrollSync(state) {
      state.scrollSync = !state.scrollSync
    }
  },
  actions: {
    toggleScrollSync({commit}) {
      commit('setScrollSync')
    }
  },
  strict: debug
})

setInterval(() => {
  store.commit('updateMinuteCounter')
}, 60 * 1000)

export default store
