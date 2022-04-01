import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import expand from './modules/expand'
import drawer from './modules/drawer'
import picking from './modules/picking'
import workOrder from './modules/workOrder'
import myTree from './modules/myTree'
import warehousing from './modules/warehousing'
import produceTaskOrder from './modules/produceTaskOrder'
import editOrder from './modules/editOrder'
import dxOrder from './modules/dxOrder'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    expand,
    drawer,
    picking,
    workOrder,
    myTree,
    warehousing,
    produceTaskOrder,
    editOrder,
    dxOrder, // 代下单
  }
})
