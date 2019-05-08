import Vue from 'vue'
import Component from './func-notification'

const SPACE = 16

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 0

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - SPACE
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  // 兼容只传内容的写法
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }

  const { autoClose = 3000, ...rest } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose
    }
  })

  const id = `notification_${++seed}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + SPACE
  })
  verticalOffset += SPACE
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
