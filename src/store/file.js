import moduleTemplate from './moduleTemplate'
import empty from '../data/emptyFile'

const _module = moduleTemplate(empty)

_module.state = {
  itemMap: {}
}

_module.getters = {
  current() {
    return {
      id: null,
      type: 'file',
      name: '',
      parentId: null,
      hash: 0
    }
  }
}

export default _module
