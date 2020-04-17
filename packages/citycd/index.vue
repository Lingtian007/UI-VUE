<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="40%" class="diatitle" title="请修改">
      <!-- 改变项目组合 -->
      <!-- <div v-show="toggleshow==0" class="dialogcontainer">
        <ItemGroupSelect :index="itemselectindex"></ItemGroupSelect>
      </div> -->
      <!-- 改变测点 -->
      <div v-show="toggleshow==1" class="optiondialogcontainer">
        <div class="dialogheader">
          <selectlist :Types='manager' :url='url' itemGroup ='group' @change="listenPointChange" :placeholder="placeholder" ></selectlist>
          <div @click="SavePointGroup" class="bt_query">保存组</div>
          <div @click="DeletePointGroup" class="bt_querys">删除组</div>
          <div @click="UpdatePointGroup" class="bt_querys">更新组</div>
        </div>
        <div style="overflow-y:scroll;" class="dialogcontent">
          <el-tree :data="treedata" @check="checkPoint" show-checkbox node-key="stcode" :default-expanded-keys="defaultCheckedKeys" ref="tree" :props="defaultProps" @check-change="treecheckchange"></el-tree>
        </div>
      </div>
    </el-dialog>
    <div @click="hideOrshow" class="bt_query">展示隐藏</div>
  </div>
</template>
<script>
//   :default-checked-keys='defaultCheckedKeys'-默认勾选的节点的 key 的数组 :default-expanded-keys="defaultExpendKeyKeys"-默认展开的节点的 key 的数组   @check-change="treecheckchange"
import selectlist from '../selectlist/index'
import ItemGroupSelect from '../ItemGroup/index'
// import dialogmodel from '../../../api/report/dialogModle/dialog_model'
import axios from 'axios'
export default {
  name: 'city-cd',
  components: {
    selectlist,
    ItemGroupSelect
  },
  props: {
    manager: {
      // 业务类型
      type: String,
      default: ''
    },
    url: {
      // 请求路径
      type: String,
      default: ''
    },
    showOrhide: {
      // 请求路径
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: false,
      clickclose: false,
      toggleshow: 1,
      cedianselect: [],
      //   allPointData:[],
      cvalue: '',
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        itemIndex: 0
      },
      placeholder: '',
      pointtype: '', //  测点业务名称
      itemselectindex: -1,
      nctype: '',
      pointindex: 0,
      pointselect: [],
      nodeKey: [],
      clickdata: [],
      expendKey: [],
      defaultExpendKeyKeys: [],
      defaultCheckedKeys: [],
      setDefault: false,
      showhide: false
    }
  },
  watch: {
    pointgroup (val) {
      console.log('当前数据 1111111 ', 1111111)
      this.cedianselect = val
      this.placeholder = this.cedianselect[0].label
    },
    cvalue (val) {
      console.log('当前数据 val ', val)
      // this.cedianselect = val
      this.placeholder = val
    },
    ncmoduletype (val) {
      this.pointtype = val
    },
    zjsmoduletype (val) {
      this.pointtype = val
    },
    itemselectindex_index (val) {
      this.itemselectindex = val
    }
    // moduletype (val) {
    //   if (val === 'eqic') {
    //     //  农村
    //     this.pointtype = this.$store.state.ncmoduletype
    //   } else if (val === 'hmeqia') {
    //     this.pointtype = this.$store.state.zjsmoduletype
    //   } else if (val === 'eqiw_l') {
    //     this.pointtype = 'eqiw_r'
    //   } else {
    //     this.pointtype = val
    //   }
    // }
  },
  computed: {
    // moduletype () {
    //   // return this.$store.state.moduletype
    // },
    pointgroup () {
      return sessionStorage.getItem('pointgroup') 
    }
    // ncmoduletype () {
    //   // return this.$store.state.ncmoduletype
    // },
    // zjsmoduletype () {
    //   // return this.$store.state.zjsmoduletype
    // },
    // itemselectindex_index () {
    //   // return this.$store.state.itemgroup.index
    // }
  },
  methods: {
    hideOrshow () {
      this.dialogVisible = !this.dialogVisible
      this.cedianselect = []
      // this.pointindex = i
      //  改变测点
      this.dialogVisible = true
      this.toggleshow = 1
      console.log(12312)
      //  获取点位组合名称
      var response = JSON.parse(sessionStorage.getItem('pointgroup'))
      this.treedata = JSON.parse(sessionStorage.getItem('treedata'))
      console.log('response', response)
      let array = response
      //    this.allPointData = response;
      this.cedianselect = array
      this.$emit('hideOrshow', '展示或隐藏')
    },
    getArrIndex (arr, obj) {
      let index = null
      let key = Object.keys(obj)[0]
      arr.every(function (value, i) {
        if (value[key] === obj[key]) {
          index = i
          return false
        }
        return true
      })
      return index
    },
    checkPoint (a, b) {
      //  console.log(b.chec,akedKeys);
      console.log('aaaaaa', a, b)
      let point = b.checkedKeys.join(',')
      // this.$store.commit('isTpoint', point)
      this.isTpoint = point
      console.log('point', point)
      let pointStr = ''
      b.checkedKeys.map((item, index) => {
        if (item !== '') {
          if (item && index < b.checkedKeys.length - 1) {
            pointStr += `'${item}',`
          } else {
            pointStr += `'${item}'`
          }
        }
      })
      console.log('point222', pointStr)
      let strComtent = pointStr.split(',')
      let ComtentArr = []
      if (
        this.manager.indexOf('eqin') === -1 &&
        this.manager.indexOf('eqia') === -1
      ) {
        strComtent.map(item => {
          if (item.split('.').length === 3) {
            ComtentArr.push(item)
          }
        })

        console.log('ComtentArr', ComtentArr, strComtent)
      } else {
        strComtent.map(item => {
          if (item.split('.').length === 2) {
            ComtentArr.push(item)
          }
        })
      }

      ComtentArr = ComtentArr.join(',')

      sessionStorage.setItem('pointdata', ComtentArr) //  缓存选中测点代码
    },
    nodeExpend (vaue) {},
    treecheckchange (value) {
      //  console.log("value",value)
      let concent = []
      this.nodeKey = ['']
      let checkedpoint = this.$refs.tree.getCheckedKeys()
      //  console.log('checkedpoint',checkedpoint);
      checkedpoint.map((item, index) => {
        if (item !== '') {
          concent.push(`'${item}'`)
        }
      })
      // let pointStr = concent.join(',')
      //  console.log('pointStr',pointStr);
    },
    listenPointChange (obj, index) {
      console.log('当前数据 obj ======', obj)
      this.cvalue = obj.label
      // var point
      if (obj.fldPointContent) {
      } else {
        // return
      }
      this.treedata = []
      let sw = false
      // this.$store.commit('getupdatepointgroup', obj)
      if (index !== '-1') {
        this.setDefault = true
        this.pointindex = index
        this.pointselect = obj
        var point
        if (obj.fldPointContent) {
          point = this.isTpoint
        } else {
          point = ''
        }
        console.log('point==========', point)
        this.treedata = JSON.parse(sessionStorage.getItem('treedata'))
        //  console.log("this.treedata",this.treedata)
        if (index === 0) {
          if (
            point === null ||
            point === undefined ||
            point === '' ||
            point.length === 0
          ) {
            //  console.log('444444')
            this.defaultCheckedKeys = []
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys([])
            })
            return
          }
        }
        if (
          point !== null &&
          point !== undefined &&
          point !== '' &&
          point.length !== 0
        ) {
          var content = point
          sw = true
        } else {
          var content = obj.fldPointContent
        }
        content = content.replace(/\'/g, '').split(',')
        let newcomtent = []
        content.map(item => {
          if (item !== '') {
            newcomtent.push(item)
          }
        })
        this.defaultCheckedKeys = newcomtent
        //  this.$store.commit("updatescreenpoint", newcomtent);
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(newcomtent)
        })
      }
      if (sw) {
        // console.log(sw)
        // this.$store.commit('isTpoint', '')
      }
    },
    SavePointGroup () {
      //  点击保存组时
      //   this.$nextTick(() => {
      let comtent = this.$refs.tree.getCheckedKeys()

      comtent = comtent.filter(
        item => item.substr(-2) !== '.1' && item.substr(-2) !== '.2'
      )
      console.log('保存1', comtent)
      var pointStr = ''
      comtent.map((item, index) => {
        if (item !== '') {
          if (item && index < comtent.length - 1) {
            pointStr += `'${item}',`
          } else {
            pointStr += `'${item}'`
          }
        }
      })
      comtent = pointStr
      // let dialog = new dialogmodel()
      this.$confirm(
        '<input id="newPointGroupName" placeholder="请输入组合名称" style="width:20vw;height:2em;"/>',
        '请输入组合名称',
        { dangerouslyUseHTMLString: true, cancelButtonText: '取消' }
      ).then(() => {
        var groupName = document.getElementById('newPointGroupName').value
        // console.log('this.moduletype', this.moduletype)
        if (groupName !== '') {
          if (comtent.length !== 0) {
            let parameter = {
              Judge: '1',
              fldName: groupName,
              fldObject: this.manager,
              fldPointContent: comtent,
              fldType: 0,
              fldUserID: '578',
              fldYear: '2020'
            }
            axios.post(`${this.url}` + 'actionapi/PiontGroup/addGroup', parameter).then((response) => {
              // console.log('当前数据 res==== ', response)
              if (response.data.data === -1) {
                this.$alert('输入组名重复，保存失败', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              } else if (response.data.data === 0) {
                this.$alert(response.data.msg, '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                })
              } else {
                this.cvalue = groupName
                this.$alert('保存成功', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                }).then(() => {
                  this.cedianselect.push({
                    value: groupName,
                    label: groupName,
                    fldName: groupName,
                    fldObject: this.pointtype,
                    fldAutoID: response.data.data.fldAutoID,
                    fldPointContent: comtent,
                    fldUserID: '578'
                  })
                  this.cvalue = groupName
                  sessionStorage.setItem(
                    'pointgroup',
                    JSON.stringify(this.cedianselect)
                  )
                  // this.$store.commit('updatepointgroup', this.cedianselect)
                  console.log('保存成功', this.cedianselect)
                  this.pointselect = this.cedianselect[this.cedianselect.length - 1]
                  //  更新当前选中项
                  this.pointindex = this.cedianselect.length - 1 //  更新当前选中索引
                })
              }
            }
            )
          } else {
            this.$alert('请至少选择一个测点', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        } else {
          this.$alert('请输入组合名称', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      })
      //   })
    },
    DeletePointGroup () {
      //   //  点击删除组时
      this.$confirm('即将删除该组,确定删除该组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let groupid = null
        // let pointdata = []
        //   this.allPointData.map((item, index) => {
        //     if (item.fldName == this.cvalue) {
        //       groupid = item.fldAutoID;
        //     }
        //   })
        console.log('当前数据  state', this.cedianselect)
        this.cedianselect.map((item, index) => {
          if (item.fldName === this.cvalue) {
            groupid = item.fldAutoID
          }
        })
        let parameter = {
          fldAutoID: groupid,
          fldObject: this.manager,
          Judge: '1'
        }
        axios.post(`${this.url}` + 'actionapi/PiontGroup/DeleteGroup_V2', parameter).then((response) => {
          var i = this.getArrIndex(this.cedianselect, {
            value: this.cvalue,
            label: this.cvalue
          })
          this.cedianselect.splice(i, 1)
          sessionStorage.setItem(
            'pointgroup',
            JSON.stringify(this.cedianselect)
          )
          // this.$store.commit('updatepointgroup', this.cedianselect)
          console.log('删除成功', this.cedianselect)
          console.log('删除成功this.cvalue', this.cvalue)
          this.cvalue = this.cedianselect[0].label
          this.setDefault = true
          this.listenPointChange(this.cedianselect[0], 0)
          if (response.data.status === 'ok') {
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
            this.cvalue = this.cedianselect[0].label
          } else {
            this.$alert('删除失败', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      })
    },
    UpdatePointGroup () {
      //  点击更新组时
      this.$nextTick(() => {  
        let groupid = null
        //   this.allPointData.map((item, index) => {
        //     if (item.fldName == this.cvalue) {
        //       groupid = item.fldAutoID;
        //     }
        //   })
        this.cedianselect.map((item, index) => {
          if (item.fldName === this.cvalue) {
            groupid = item.fldAutoID
          }
        })
        let comtent = this.$refs.tree.getCheckedKeys()
        let pointStr = ''
        comtent.map((item, index) => {
          if (item !== '') {
            if (item && index < comtent.length - 1) {
              pointStr += `'${item}',`
            } else {
              pointStr += `'${item}'`
            }
          }
        })
        comtent = pointStr
        //  console.log("点击更新组时comtent",comtent);
        if (comtent !== '') {
          let parameter = {
            'fldAutoID': groupid,
            'fldName': this.cvalue,
            'fldUserID': '578',
            'fldObject': this.manager,
            'fldYear': '2017',
            'fldPointContent': pointStr,
            'fldType': 0,
            'Judge': '1'
          }
          axios.post(`${this.url}` + 'actionapi/PiontGroup/UpdateGroup', parameter).then((response) => {
            if (response.data.status === 'ok') {
              //   this.allPointData.map((item, index) => {
              //     if (item.fldName == this.cvalue) {
              //       item.fldPointContent = comtent;
              //     }
              //   })
              this.cedianselect.map((item, index) => {
                if (item.fldName === this.cvalue) {
                  item.fldPointContent = comtent
                }
              })
              sessionStorage.setItem(
                'pointgroup',
                JSON.stringify(this.cedianselect)
              )
              // this.$store.commit('updatepointgroup', this.cedianselect)
              console.log('更新成功', this.cedianselect)
              this.$alert('更新成功', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
            }
          }
          )
        } else {
          this.$alert('请至少选择一项', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      })
    }
  },
  created () {
    //  判断业务类型，给测点组合和因子组合附上相同业务的不同业务名称
    // if (this.$store.state.moduletype === 'eqic') {
    //   //  农村
    //   //  给其赋值
    //   this.pointtype = this.$store.state.ncmoduletype
    // } else if (this.$store.state.moduletype === 'hmeqia') {
    //   //  console.log('this.$store.state.zjsmoduletype',this.$store.state.zjsmoduletype);
    //   this.pointtype = this.$store.state.zjsmoduletype
    // } else if (this.$store.state.moduletype === 'eqiw_l') {
    //   this.pointtype = 'eqiw_r'
    // } else {
    //   this.pointtype = this.$store.state.moduletype
    // }
  },

  mounted () {
    // this.itemselectindex = this.itemselectindex_index
    // Bus.$on('changeItem', i => {
    //   this.itemselectindex = i
    //   this.toggleshow = 0
    //   //  改变项目因子
    //   this.dialogVisible = true
    // })
    // Bus.$on('changeOption', i => {
    //  this.allPointData=[];
    // this.cedianselect = []
    // this.pointindex = i
    // //  改变测点
    // this.dialogVisible = true
    // this.toggleshow = 1
    // console.log(12312)
    // //  获取点位组合名称
    // var response = JSON.parse(sessionStorage.getItem('pointgroup'))
    // this.treedata = JSON.parse(sessionStorage.getItem('treedata'))
    // console.log('response', response)
    // let array = response
    // //    this.allPointData = response;
    // this.cedianselect = array
    // console.log('2222', array, i)
    // this.placeholder = this.cedianselect[i].label
    // this.cvalue = this.cedianselect[i].label
    // this.$nextTick(() => {
    //   this.setDefault = true
    //   this.listenPointChange(this.cedianselect[i], i)
    // })
    //  }
    // })
  }
}
</script>
<style scope>
.dialogcontainer {
  width: 100%;
  height: 55vh;
  background: #dddddd;
  padding: 0 12px;
}
.el-dialog__header {
  background-color: rgba(8, 117, 252, 0.85);
}
.el-dialog__title {
  color: #ffffff;
}
.optiondialogcontainer {
  width: 100%;
  height: 55vh;
  background: #dddddd;
  padding: 0 12px;
}
.dialogcontent {
  height: 45vh;
  position: relative;
  background: #ffffff;
  overflow: hidden;
}
.dialogheader {
  line-height: 8vh;
  height: 8vh;
  display: flex;
  align-items: center;
  vertical-align: center;
}
.selstyle {
  height: 28px;
  margin-right: 5px;
}
.diatitle {
  /* background-color: rgba(8, 117, 252, 0.85); */
  color: #fff;
}
.bt_query {
  display: inline-block;
  vertical-align: middle;
  background-color: rgba(8, 117, 252, 0.85);
  color: #fff;
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
  font-size: 12px;
  margin-left: 5px;
}
.bt_query:hover {
  cursor: pointer;
  background-color: #58c6ea;
  color: #ffffff;
}
.bt_query:focus {
  cursor: pointer;
  background-color: #58c6ea;
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
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
  font-size: 12px;
  margin-left: 10px;
}
.bt_querys:hover {
  cursor: pointer;
  background-color: #58c6ea;
}
.bt_querys:focus {
  cursor: pointer;
  background-color: #58c6ea;
}

.bt_add {
  display: inline-block;
  vertical-align: middle;
  background-color: #ffffff;
  color: rgba(8, 117, 252, 0.85);
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #dddddd;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
  font-size: 12px;
  margin: 5px 0 5px 5px;
}
.bt_add:focus {
  border: solid 2px #87cefa;
  background-color: #ffffff;
  color: #2d8afc;
}
.bt_add:hover {
  border: solid 2px #87cefa;
  background-color: #ffffff;
  color: #2d8afc;
}
.btn_add {
  display: inline-block;
  vertical-align: middle;
  background-color: #ffffff;
  color: rgba(8, 117, 252, 0.85);
  white-space: nowrap;
  text-align: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
  font-size: 12px;
  border-top: solid 2px #87cefa;
  border-bottom: solid 2px #87cefa;
  border-left: solid 2px #87cefa;
  z-index: 9999;
  position: relative;
  margin: 5px 0 5px 5px;
}
.bt_clear {
  display: inline-block;
  vertical-align: middle;
  background-color: #ffffff;
  color: rgba(8, 117, 252, 0.85);
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #dddddd;
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  padding: 0 5px;
  font-size: 12px;
  margin: 5px 0 5px 5px;
}
.bt_clear:focus {
  background-color: #ffffff;
  border: solid 2px #87cefa;
  color: #2d8afc;
}
.bt_clear:hover {
  background-color: #ffffff;
  border: solid 2px #87cefa;
  color: #2d8afc;
}
.search {
  height: 28px;
  width: 150px;
  border: solid 1px #a5a9ab;
  font-size: 12px;
}
.bt_additem {
  vertical-align: middle;
  background-color: rgba(8, 117, 252, 0.85);
  color: #fff;
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  padding: 0 5px;
  font-size: 10px;
  margin: 5px;
  float: right;
}
.bt_additem:hover {
  cursor: pointer;
  background-color: #58c6ea;
  color: #ffffff;
}
.bt_additem:focus {
  cursor: pointer;
  background-color: #58c6ea;
}

.bt_cancel {
  height: 25px;
  line-height: 25px;
  float: right;
  margin: 5px 0 5px 5px;
  border-radius: 4px;
  padding: 0 5px;
  font-size: 10px;
  background-color: #a5a9ab;
  color: #fff;
}
.bt_cancel:hover {
  background-color: #959595;
  color: #ffffff;
}
.bt_cancel:focus {
  border: 0 !important;
  background-color: #959595;
  color: #ffffff;
}
.itemlist {
  list-style: none;
  margin: 0;
  padding: 1em 0px;
  padding-left: 8px;
  height: 41vh;
  overflow-y: scroll;
  margin-top: 1.5em;
  font-size: 12px;
}
.content_button_group {
  position: absolute;
  right: 0;
}
.content_button_group::after {
  content: '';
  display: block;
  clear: both;
}
.item_group {
  position: fixed;
  background: #ffffff;
  width: 20vw;
  height: 55vh;
  border-left: solid 2px #87cefa;
  border-right: solid 2px #87cefa;
  border-bottom: solid 2px #87cefa;
  border-top: solid 2px #87cefa;
  overflow: hidden;
}
.item_group ul {
  list-style: none;
  padding-left: 1em;
  padding-top: 1em;
  margin-right: -12px;
  height: 80%;
  overflow-y: scroll;
}
.closebtn {
  float: right;
  margin-right: 0.2em;
  cursor: pointer;
  margin-top: 7px;
}
.item_group_header {
  line-height: 6vh;
  padding-left: 1em;
  position: relative;
  border-bottom: solid 1px #000000;
  align-items: center;
  vertical-align: center;
}
.item_group_header i {
  position: absolute;
  right: 5px;
  top: 5px;
}
.item_group_footer {
  height: 8vh;
  position: relative;
  line-height: 5vh;
  padding-left: 1em;
  border-top: solid 1px #000000;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
}
.el-dialog__headerbtn .el-dialog__close:hover {
  color: #000000;
}
</style>
