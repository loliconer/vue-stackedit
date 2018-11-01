export default {
  namespaced: true,
  state: {
    canUndo: false,
    canRedo: false,
    showEditor: true,
    showNavigationBar: true,
    showPreview: true,
    fullscreen: false,
    inlineImage: true
  },
  mutations: {
    setCanUndo(state, value) {
      state.canUndo = value
    },
    setCanRedo(state, value) {
      state.canRedo = value
    },
    setShowEditor(state) {
      if (state.showEditor && !state.showPreview) return
      state.showEditor = !state.showEditor
    },
    setShowPreview(state) {
      if (!state.showEditor && state.showPreview) return
      state.showPreview = !state.showPreview
    },
    setShowNavigationBar(state) {
      state.showNavigationBar = !state.showNavigationBar
    },
    setFullscreen(state) {
      state.fullscreen = !state.fullscreen
    }
  },
  actions: {
    toggleEditor({ commit }) {
      commit('setShowEditor')
    },
    togglePreview({ commit }) {
      commit('setShowPreview')
    },
    toggleNavigationBar({ commit }) {
      commit('setShowNavigationBar')
    },
    toggleFullscreen({ commit }) {
      commit('setFullscreen')
    }
  }
}
