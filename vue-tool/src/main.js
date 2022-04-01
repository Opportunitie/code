import Vue from 'vue'
import router from './router'
import vueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import '@c/install.js'
import 'vue-directive-image-previewer/dist/assets/style.css'
import './styles/index.less'
import App from './App'
import axios from 'axios'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import '@/utils/directive'
import '@/assets/iconfont/iconfont.css'
// import '@/assets/iconfont/fontclass.css'
import mitt from 'mitt'
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})

Vue.prototype.$axios = axios
Vue.prototype.emitter = mitt()
Vue.prototype.$echarts = Echarts

Vue.use(vueDirectiveImagePreviewer)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
