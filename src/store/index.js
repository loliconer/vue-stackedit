import Vue from 'vue'
import Vuex from 'vuex'
import contentState from './contentState'
import content from './content'
import file from './file'
import layout from './layout'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contentState,
    content,
    file,
    layout
  },
  state: {
    url: '',
    scrollSync: true
  },
  mutations: {
    setUrl(state, url) {
      state.url = url
    },
    toggleScrollSync(state) {
      state.scrollSync = !state.scrollSync
    }
  }
})

export default store
