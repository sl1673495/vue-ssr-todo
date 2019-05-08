import Vue from 'vue'
import LoadingFullScreen from './loading-full-screen.vue'

const LoadingConstructor = Vue.extend(LoadingFullScreen)

let instance = null

export function loadingStart () {
  if (!instance) {
    instance = new LoadingConstructor()
    instance.$mount()
  }
  document.body.appendChild(instance.$el)
}

export function loadingEnd () {
  document.body.removeChild(instance.$el)
}
