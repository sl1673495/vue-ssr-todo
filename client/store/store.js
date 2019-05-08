import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
import { errorPlugin } from './plugin'
import bus from '../util/bus'

import notify from '../components/notification/function'

const handleError = (err) => {
  console.log('err: ', err)
  // 处理错误
  if (err.code === 401) {
    notify({
      content: '请先登录。'
    })
    bus.$emit('auth')
  } else {
    notify({
      content: err.message
    })
  }
}

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [errorPlugin({
      onActionError: (e) => {
        handleError(e)
      }
    })]
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
