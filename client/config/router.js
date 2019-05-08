import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    base: '/public',
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // parseQuery () {

    // },
    // stringifyQuery () {

    // },
    fallback: true
  })
}
