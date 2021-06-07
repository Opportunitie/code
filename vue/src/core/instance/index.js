import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
/*  Vue的构造函数  */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

initMixin(Vue)  // 挂在初始化方法（__init）
stateMixin(Vue) // 挂在状态处理方法
eventsMixin(Vue) // 挂在事件的方法
lifecycleMixin(Vue) // 挂在生命周期方法
renderMixin(Vue) // 挂在与渲染有关的方法

export default Vue
