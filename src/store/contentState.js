import moduleTemplate from './moduleTemplate';
import empty from '../data/emptyContentState';

const _module = moduleTemplate(empty, true);

_module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[`${rootGetters['file/current'].id}/contentState`] || empty(),
};

_module.actions = {
  ...module.actions,
  patchCurrent({ getters, commit }, value) {
    commit('patchItem', {
      ...value,
      id: getters.current.id,
    });
  },
};

export default _module;
