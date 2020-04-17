<template>
  <div class='select_container_nw' :style="{width:strtransition(sl_width)+'px'}">
    <div class='select_main' style="" @click='sllistshow' :class='{select_showlist:slshow}'>
      <input type='hidden' :value='value'>
      <span class='select_content' v-show='showPlaceholder' :style="{width:(strtransition(sl_width)-40)+'px'}">{{placeholder}}</span>
      <span class='select_content' v-show='!showPlaceholder' :style="{width:(strtransition(sl_width)-40)+'px'}">{{label}}</span>
      <span class='select_arrow' :class='{cast_rotate:!slshow}'></span>
      <span class='select_arrow_after ' :class='{cast_rotate:!slshow}' style='margin-top: 1px;'></span>
    </div>
    <div class='select_list' v-show='slshow' :style="{'min-width':strtransition(sl_width)+'px'}">
      <div class='select_list_body' style='position: relative; overflow: scroll;margin-right: -17px;height: 100%;max-height: 274px;    margin-bottom: -17px;'>
        <div style='position: relative; top: 0px; left: 0px;'>
          <ul class='select_list_ul' v-if='opintdata.length > 0'>
            <li v-for='(item,index) in opintdata' :key='index' @click.stop='slchang(item,index)' :class='{current:focusIndex==index}'>{{item.label}}</li>
          </ul>
          <ul class='select_Nolist_ul' v-else>
            <li>无数据</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Api from './api.js'
import axios from 'axios'
export default {
  name: 'select-list',
  props: {
    sl_width: {
      // 默认select长度
      type: String,
      default: '115'
    },
    opintdatas: {
      // 默认select数据
      type: [Array, Object],
      default () {
        return []
      }
    },
    value: {
      // v-model值
      type: [String, Number, Array],
      default: '合肥市2'
    },
    placeholder: {
      // 初始显示的内容
      type: String,
      default: '请选择'
    },
    disabled: {
      // 是否禁用当前组件
      type: Boolean,
      default: false
    },
    url: {
      // url
      type: String,
      default: ''
    },
    Types: {
      type: String,
      default: 'eqia_r'
    },
    itemGroup: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      slshow: false,
      focusIndex: -1,
      model: this.value,
      showPlaceholder: true,
      label: '',
      Route: 'actionapi/PointAll/GetPiont_V2',
      parameter: '',
      opintdata: []
    }
  },
  created () {
    console.log('当前数据 itemGroup ', this.itemGroup)
    this.opintchang()
    if (this.Types === 'eqia_r') {
      this.parameter = {'UserID': '578', 'type': 'eqia_r', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': '安徽省'}
    } else if (this.Types === 'eqiw_d') {
      this.parameter = {'UserID': '578', 'type': 'eqiw_d', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': '安徽省'}
    } else if (this.Types === 'eqia_p') {
      this.parameter = {'UserID': '578', 'type': 'eqia_p', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': '安徽省'}
    } else if (this.Types === 'eqia_rd') {
      this.parameter = {'UserID': '578', 'type': 'eqia_rd', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': '安徽省'}
    } else if (this.Types === 'eqiw_r') {
      this.parameter = {'UserID': '578', 'type': 'eqiw_r', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': '安徽省'}
    } else if (this.Types === 'eqiw_l') {
      this.parameter = {'UserID': '578', 'type': 'eqiw_l', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else if (this.Types === 'eqiw_lt') {
      this.parameter = {'UserID': '578', 'type': 'eqiw_lt', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else if (this.Types === 'eqin_t') {
      this.parameter = {'UserID': '578', 'type': 'eqin_t', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else if (this.Types === 'eqin_f') {
      this.parameter = {'UserID': '578', 'type': 'eqin_f', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else if (this.Types === 'eqin_a') {
      this.parameter = {'UserID': '578', 'type': 'eqin_a', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else if (this.Types === 'eqia_r_point') {
      this.parameter = {'UserID': '578', 'type': 'eqia_r_point', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    } else {
      this.parameter = {'UserID': '578', 'type': 'eqia_r', 'year': '2020', 'cityID': 2, 'where': '', 'screenflied': '', 'DName': '', 'Judge': 1, 'fldProvince': null}
    }
    this.getData()
  },
  mounted () {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) this.slshow = false
    })
  },
  watch: {
    value (val) {
      this.model = val
      this.opintchang()
    },
    opintdatas (val) {
      this.opintdata = val
      this.opintchang()
    },
    Types (val) {

    },
    url (val) {
      console.log('当前数据 val ', val)
    }

  },
  methods: {
    strtransition (str) {
      // 处理处进来的长度
      if (parseInt(str)) {
        return parseInt(str)
      } else {
        return 115
      }
    },
    sllistshow () {
      // 控制list显示不显示
      this.slshow = !this.slshow
    },
    slchang (item, index, isnotchange = true) {
      // list点击事件
      this.model = item.label
      this.label = item.label
      this.slshow = false
      this.focusIndex = index
      this.showPlaceholder = false
      this.$emit('input', item.value) // 触发 input 事件，并传入新值
      if (isnotchange) {
        console.log('change', item)
        this.$emit('change', item, index)
      }
    },
    handleClose () {
      // 关闭list列表
      this.slshow = false
    },
    opintchang () {
      if (this.value !== '' && this.opintdata.length > 0) {
        // console.log('this.opintdata',this.opintdata);
        this.opintdata.map((item, index) => {
          if (this.value === item.value) {
            this.slchang(item, index, false)
            this.showPlaceholder = false
          }
        })
      }
    },
    getData (val) {
      axios.post(`${this.url}` + 'actionapi/PointAll/GetPiont_V2', this.parameter).then((res) => {
        console.log('当前数据 res==== ', res)
        sessionStorage.setItem('treedata', JSON.stringify(res.data.data[0]))
        if (this.itemGroup === 'item') {
          this.opintdata = res.data.data[0][0].children
        } else {
          let groupname = res.data.data[1]
          this.opintdata = [{label: '请选择', value: '请选择'}]
          groupname.map((item, index) => {
            this.opintdata.push({
              label: item.fldName,
              value: item.fldName,
              fldName: item.fldName,
              fldPointContent: item.fldPointContent,
              fldAutoID: item.fldAutoID,
              fldObject: item.fldObject,
              fldUserID: item.fldUserID
            })
          })
          sessionStorage.setItem('pointgroup', JSON.stringify(this.opintdata))
        }
      })
    }
  }
}
</script>
<style >
/* #dfe4ed: #dfe4ed;
#5a5e66: #5a5e66; */
.select_container_nw {
  position: relative;
  font-size: 12px;
  font-family: 'Helvetica Neue', arial, sans-serif;
  font-weight: 300;
  letter-spacing: 1px;
  display: inline-block;
}

.disabled {
  pointer-events: none;
  cursor: default;
  filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
  -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
  opacity: 0.5; /*其他，透明度50%*/
}

.select_main {
  border-radius: 5px !important;
  position: relative;
  border: 1px solid #dfe4ed;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  background-color: #fff;
}
.select_main:hover {
  border-color: #409eff;
}

.select_showlist {
  border-color: #409eff;
}

.select_content {
  display: block;
  padding: 0px 0px 0px 7px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
}

.select_content::after {
  content: ' ';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  border-radius: 0 2px 2px 0;
  box-shadow: inset -55px 0 25px -20px #fff;
}

.select_input {
  padding-left: 10px;
  padding-right: 32px;
  font-size: 12px;
  overflow: hidden;
  outline: none;
  height: 25px;
  border: none;
  border-bottom: 1px solid #dfe4ed;
  z-index: 1;
}

.search_svg {
  position: absolute;
  top: 2px;
  right: 3px;
  z-index: 2;
}
.select_arrow,
.select_arrow_after {
  content: ' ';
  position: absolute;
  right: 6px;
  top: 38%;
  border: 8px solid transparent;
  border-top: 8px solid #dfe4ed;
  z-index: 1;
  -webkit-transform-origin: 50% 20%;
  -moz-transform-origin: 50% 20%;
  -ms-transform-origin: 50% 20%;
  transform-origin: 50% 20%;
  transition: all 150ms ease-in-out;
  cursor: pointer;
}

.select_arrow_after {
  cursor: pointer;
  margin-top: -1px;
  right: 6px;
}

.select_list {
  position: absolute;
  left: 0px;
  top: 100%;
  border: 1px solid #dfe4ed;
  margin: 2px 0 0 0;
  overflow: hidden;
  transform-origin: center top 0px;
  border-radius: 2px;
  background-color: #fff;
  outline: none;
  z-index: 2020;
}

.select_list > .select_list_body ul {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  display: block;
}

.select_list > .select_list_body ul li {
  font-size: 14px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #5a5e66;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}
.select_list_ul li {
  cursor: pointer;
}
.select_list_ul li:hover {
  background-color: #f5f7fa;
  color: #5a5e66;
}

.current {
  background-color: #f5f7fa;
  color: #409eff !important;
  font-weight: 700;
}

.cast_rotate {
  transform-origin: 50% 20%;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.select_list_body {
  max-height: 200px;
  overflow: hidden;
}

.list_current {
  display: none;
}

.no_result {
  display: none;
  text-align: center;
  color: #dfe4ed;
}
.list_open {
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
