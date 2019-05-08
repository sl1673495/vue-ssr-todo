import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: '/'
})

request.interceptors.response.use(
  function handleSuccess (resp) {
    return new Promise((resolve, reject) => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    })
  },
  function handleError (error) {
    const resp = error.response
    return Promise.reject(createError(resp.status, resp.data.message))
  })

export default {
  getAllTodos () {
    return request.get('/api/todos')
  },
  login (username, password) {
    return request.post('/user/login', { username, password })
  },
  updateTodo (id, todo) {
    return request.put(`/api/todo/${id}`, todo)
  },
  createTodo (todo) {
    return request.post('/api/todo', todo)
  },
  deleteTodo (id) {
    return request.delete(`/api/todo/${id}`)
  },
  deleteAllCompleted (ids) {
    return request.post('api/delete/completed', {ids})
  }
}
