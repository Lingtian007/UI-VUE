import { version } from '../package.json'
import Button from '../packages/button'
import Icon from '../packages/icon'
import $Dialog from '../packages/dialog/dialog.js'
import $Toast from '../packages/toast/toast.js'
import SelectTime from '../packages/selecttime/index.vue'
import SelectList from '../packages/selectlist/index.vue'
import ItemGroup from '../packages/ItemGroup/index.vue'
import Itemlist from '../packages/Itemlist/index.vue'
import Scxz from '../packages/scxz/index.vue'
import DataSource from '../packages/datasource/index.vue'
import HSet from '../packages/HSet/index.vue'
import Citycd from '../packages/citycd/index.vue'
import Export2Excel from '../packages/Export2Excel/index.vue'
import Comchart from '../packages/comchart/index.vue'
import vuebigdatatable from '../packages/vue-bigdata-table'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
// 字符串处理
import S from 'string'
window.S = S
window.moment = moment
// 组件通讯
// var Bus = new Vue ()
// window.Bus = Bus

const install = function (Vue) {
  if (install.installed) return
  Vue.use(ElementUI)
  // Vue.use(ElementUI)
  Vue.component(Button.name, Button)
  Vue.component(Icon.name, Icon)
  Vue.component(SelectTime.name, SelectTime)
  Vue.component(SelectList.name, SelectList)
  Vue.component(ItemGroup.name, ItemGroup)
  Vue.component(Itemlist.name, Itemlist)
  Vue.component(Scxz.name, Scxz)
  Vue.component(DataSource.name, DataSource)
  Vue.component(HSet.name, HSet)
  Vue.component(Citycd.name, Citycd)
  Vue.component(Export2Excel.name, Export2Excel)
  Vue.component(Comchart.name, Comchart)
  Vue.component(vuebigdatatable.name, vuebigdatatable)

  Vue.prototype.$dialog = $Dialog
  Vue.prototype.$toast = $Toast
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  Button,
  Icon,
  $Dialog,
  $Toast,
  SelectTime,
  ElementUI,
  SelectList,
  ItemGroup,
  Scxz,
  DataSource,
  HSet,
  Citycd,
  Itemlist,
  Export2Excel,
  Comchart,
  vuebigdatatable
}
