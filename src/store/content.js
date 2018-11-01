import moduleTemplate from './moduleTemplate'
import empty from '../data/emptyContent'
import utils from '../services/utils'

const _module = moduleTemplate(empty)

_module.getters = {
  ..._module.getters,
  current: (state, getters, rootState, rootGetters) => {
    if (state.revisionContent) {
      return state.revisionContent;
    }
    return state.itemMap[`${rootGetters['file/current'].id}/content`] || empty();
  },
  currentProperties: (state, getters) => utils.computeProperties(getters.current.properties),
  isCurrentEditable: (state, getters, rootState, rootGetters) => rootState.layout.showEditor
}

_module.actions = {
  ..._module.actions,
  patchCurrent({ state, getters, commit }, value) {
    const id = getters.current.id;
    if (id && !state.revisionContent) {
      commit('patchItem', {
        ...value,
        id,
      });
    }
  }
}

export default _module
