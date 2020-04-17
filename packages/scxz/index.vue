<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 17:26:52
 * @LastEditTime: 2019-08-29 16:36:27
 * @LastEditors: Please set LastEditors
 -->
<template>
<div>
  <div class='bt_querys' style='background:orange;' @click='hideOrshow'>沙尘选择</div>
  <div id='scxz' :style="{width:strtransition(sz_width)+'px',width:strtransition(sz_height)+'px'}" v-if='isFalse'>
    <div class='slhk' style='background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;height: 40px;margin:0;padding:0 30px;'>沙尘选择
    </div>
    <div class='radioDiv'>
      <el-tabs type='border-card' v-model='scArr.controlLevel'>
        <el-radio-group v-model='yinzi' class='yz'>
          <el-radio label='1'>PM2.5
          </el-radio>
          <el-radio label='2'>PM10
          </el-radio>
          <el-radio label='0'>PM2.5+PM10</el-radio>
        </el-radio-group>
        <el-tab-pane label='国控' name='gk'>
          <div class='treeDiv'>
            <el-tree :data='treedata' show-checkbox node-key='id' ref='tree1' accordion :props='defaultProps'
              @check-change='handleCheckChange'></el-tree>
          </div>
        </el-tab-pane>
        <el-tab-pane label='省控' name='sk' v-if='showSK'>
          <div class='treeDiv'>
            <el-tree :data='treedata2' show-checkbox node-key='id' ref='tree2' accordion :props='defaultProps'
              @check-change='handleCheckChange2'></el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'sc-xz',
  props: {
    url: {
      // url
      type: String,
      default: ''
    },
    sz_width: {
      // 默认scxz长度
      type: String,
      default: '500'
    },
    sz_height: {
      // 默认scxz高度
      type: String,
      default: '500'
    }
  },
  data () {
    return {
      yinzi: '0',
      showSK: true,
      saveValue: '',
      isIndeterminate: true,
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      dataModel: [],
      treedata: [],
      treedata2: [], // 省控
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultnodes: [],
      scArr: { gk: [], sk: [], yinzi: '', controlLevel: 'gk' },
      isFalse: false
    }
  },
  mounted () {},
  created () {
    this.getdata()
  },
  computed: {
  },
  watch: {
    pagename (val) {
    }
  },
  updated () {
    this.handleCheckChange()
    this.handleCheckChange2()
  },
  methods: {
    hideOrshow () {
      this.isFalse = !this.isFalse
      // this.handleCheckChange()
      // this.handleCheckChange2()
    },
    strtransition (str) {
      // 处理处进来的长度
      if (parseInt(str)) {
        return parseInt(str)
      } else {
        return 115
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      let res = this.$refs.tree1.getCheckedNodes()
      let nodes = []
      res.map(item => {
        if (item.children === undefined) {
          nodes.push(item.label)
        }
      })
      this.scArr.gk = nodes
      //  this.scArr.controlLevel = this.controlLevel;
      this.$emit('getNodes', this.scArr)
    },
    handleCheckChange2 (data, checked, indeterminate) {
      let res = this.$refs.tree2.getCheckedNodes()
      let nodes = []
      res.map(item => {
        if (item.children === undefined) {
          nodes.push(item.label)
        }
      })
      this.scArr.sk = nodes

      //  this.scArr.controlLevel = this.controlLevel;
      this.$emit('getNodes', this.scArr)
    },
    getdata () {
      this.scArr.yinzi = this.yinzi
      axios.post(`${this.url}` + 'actionapi/GetEQIRawData/GetEQIA_SandData', {"lstWhere": null}).then(result => {
        let sanddata = result.data.data.filter(i => i.fldPLevel === '1')
        let sanddata2 = result.data.data.filter(i => i.fldPLevel === '2')
        axios.post(`${this.url}` + 'actionapi/GetEQIRawData/GetEQIA_SandYesOrNoData', {"lstWhere": ''}).then(result => {
          console.log('当前数据  result', result)
          let res = result.data.data.filter(i => i.fldPLevel === '1')
          let res2 = result.data.data.filter(i => i.fldPLevel === '2')
          console.log('123456', res)
          let years = []
          let years2 = []
          res.map(item => {
            if (years.indexOf(item.fldYear) === -1) {
              years.push(item.fldYear)
            }
          })
          res2.map(item => {
            if (years2.indexOf(item.fldYear) === -1) {
              years2.push(item.fldYear)
            }
          })
          this.treedata = []
          this.treedata2 = []
          years.map(item => {
            let temp = []
            let arr = []
            let add = 0

            res.map(it => {
              if (item === it.fldYear) {
                arr = sanddata.filter(rr => {
                  return (
                    rr.fldSignDate.split('/')[0] === item &&
                    rr.fldSignDate.split('/')[1] === it.fldMonth
                  )
                })
                let num = arr.length
                add += num
                temp.push({
                  label: item + '.' + it.fldMonth + ' (' + num + '天)',
                  id: Number(item + '' + it.fldMonth)
                })
              }
            })
            this.treedata.push({
              label: item + ' (' + add + '天)',
              children: temp,
              id: item
            })
          })
          years2.map(item => {
            let temp = []
            let arr = []
            let add = 0

            res2.map(it => {
              if (item === it.fldYear) {
                arr = sanddata2.filter(rr => {
                  return (
                    rr.fldSignDate.split('/')[0] === item &&
                    rr.fldSignDate.split('/')[1] === it.fldMonth
                  )
                })
                let num = arr.length
                add += num
                temp.push({
                  label: item + '.' + it.fldMonth + ' (' + num + '天)',
                  id: Number(item + '' + it.fldMonth)
                })
              }
            })
            this.treedata2.push({
              label: item + ' (' + add + '天)',
              children: temp,
              id: item
            })
          })
          this.defaultnodes = []
          res.map(it => {
            this.defaultnodes.push({
              label: it.fldYear + '.' + it.fldMonth,
              id: Number(it.fldYear + '' + it.fldMonth)
            })
          })

          setTimeout(() => {
            this.defaultnodes = []
            // this.$refs.tree1.setCheckedNodes(this.defaultnodes)
            // this.$refs.tree2.setCheckedNodes(this.defaultnodes)
            let nodes = []
            let nodes2 = []
            this.defaultnodes.map(item => {
              if (item.children === undefined) {
                nodes.push(item.label)
                nodes2.push(item.label)
              }
            })
            this.$emit('getNodes', this.scArr)
          }, 100)
        })
      })
    }
  }
}
</script>
<style scoped>
#scxz {
  border-radius: 4px;
  height: 50vh;
}
.radioDiv {
  height: 50px;
}
.bt_querys {
  display: inline-block;
  vertical-align: middle;
  background-color: rgba(8, 117, 252, 0.85);
  color: #fff;
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 5px;
  font-size: 13px;
  margin-left: 10px;
  height: 28px;
  line-height: 28px;
  &:hover {
    cursor: pointer;
    background-color: #58c6ea;
  }
}
.treeDiv {
  height: 28vh;
  overflow: auto;
  display: block !important;
  border: 1px solid #ccc;
  border-left-width: 3px;
  border-bottom-width: 3px;
  border-radius: 8px;
  /* border: none; */
}
.slhk {
  display: flex;
  align-items: center;
  margin: 0 30px;
  text-align: center;
}
.yz {
  margin-bottom: 2vh;
}
.el-tabs--border-card {
  box-shadow: none;
  border-bottom: none;
}
</style>
