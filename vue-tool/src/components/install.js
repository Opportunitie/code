import Vue from 'vue'
// import AjaxTable from './ajaxTable'
import MyTable from './myTable'
import AjaxForm from './ajaxForm'
import AddSelect from './addSelect'
import BottomBar from './bottomBar'

const components = {
  // AjaxTable,
  MyTable,
  AjaxForm,
  AddSelect,
  BottomBar
}

const install = (Vue) => {
  Object.keys(components).forEach(component => Vue.component(component, components[component]))
}

install(Vue, true);

export default {
  install,
  ...components
}