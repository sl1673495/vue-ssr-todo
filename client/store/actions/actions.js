import model from '../../model/client-model'
import notify from '../../components/notification/function'

export default {
  async fetchTodos ({ commit }) {
    const data = await model.getAllTodos()
    commit('fillTodos', data)
  },
  async login ({ commit }, { username, password }) {
    console.log('password: ', password)
    console.log('username: ', username)
    const data = await model.login(username, password)
    commit('doLogin', data)
    notify({
      content: '登录成功'
    })
    return true
  },
  async addTodo ({commit}, todo) {
    const data = await model.createTodo(todo)
    commit('addTodo', data)
    notify({
      content: '你又多了一条待办事项哦！'
    })
  },
  async deleteTodo ({commit}, id) {
    await model.deleteTodo(id)
    commit('deleteTodo', id)
    notify({
      content: '删除成功'
    })
  },
  async updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    const data = await model.updateTodo(id, todo)
    commit('updateTodo', { id, todo: data })
  },
  async deleteAllCompleted ({commit, state}) {
    const ids = state.todos.filter(todo => !!todo.completed)
      .map(({ id }) => id)
    await model.deleteAllCompleted(ids)
    commit('deleteAllCompleted')
    notify({
      content: '删除了所有的已完成事项~'
    })
  }
}
