<template>
    <div >
    <div @click="showOrhide" class="bt_query">展示隐藏</div>
    <div class="dialogcontainer" v-if='isSshow'>
    <div class="dialogheader">
      <selectlist :Types='manager' :url='url' @change="listenchange" :opintdata="itemoptions" class="selstyle" v-model="hvalue"></selectlist>
      <div class="bt_query" type="primary" @click="saveclass">保存组</div>
      <div class="bt_querys" type="primary" @click="deleteclass">删除组</div>
      <div class="bt_querys" type="primary" @click="updateclass">更新组</div>
    </div>
    <div  class="dialogcontent">
      <div class="content_button_group">
        <div style="width:60px;float:left">
          <div type="primary" size="mini" @click="clearall" class="bt_clear">清除
            <i class="el-icon-delete"></i>
          </div>
        </div>
        <div style="width:60px;float:right">
          <div type="primary" size="mini" id="btn_add" @click="showadditem" class="bt_add">新增
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <ul class="itemlist">
        <li @dblclick="grouptoall(item,index)" v-for="(item,index) in itemlist" :key="index">{{item.fldItemName}}({{item.fldItemCode}})
          <i @click="deleteItem(item,index)" class="el-icon-close closebtn"></i>
        </li>
      </ul>
    </div>
    <div v-show="allitemgroup" class="item_group" id="item_group">
      <!-- 点击新增按钮显示的全部因子下拉框 -->
      <div class="item_group_header">
        <input v-model="selectcontent" class="search" type="text">
        <div size="mini" class="bt_query">搜索</div>
        <i @click="hiddenadditem" class="el-icon-close"></i>
      </div>
      <ul>
        <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
          <li @dblclick="alltogroup(item,key)" v-for="(item,key) in searchData" :key="key">
            <el-checkbox :label="item.fldItemName">{{item.fldItemName}}</el-checkbox>
          </li>
        </el-checkbox-group>
      </ul>
      <div class="item_group_footer">
        <el-checkbox style="float:left;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div @click="addalltogroup" class="bt_additem" size="mini">添加项目</div>
        <div @click="hiddenadditem" class="bt_cancel" size="mini">取消</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
/*****
 */
import selectlist from '../Itemlist/index'

import axios from 'axios'
export default {
  name: 'item-group',
  components: {
    selectlist
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
    }
  },
  data () {
    return {
      dayNight: [
        {
          text: '昼间'
        },
        {
          text: '夜间'
        }
      ],
      itemoptions: [
        {
          label: '请选择',
          value: -1
        }
      ],
      itemlist: [],
      hvalue: -1,
      allitemgroup: false,
      checkAll: false,
      checked: [],
      isIndeterminate: true,
      selectcontent: '',
      AllitemList: [],
      allitemdata: '',
      checkeditems: [], // 添加因子框当前选中的因子
      groupselect: { item: '', index: -1 }, // 项目组合当前选中索引
      load: false,
      pointtype: '',
      isSshow: false
    }
  },
  methods: {
    showOrhide () {
      this.isSshow = !this.isSshow
      this.$emit('hideOrshow', '展示或隐藏')
    },
    getitemall (val, callback) {
      this.load = false
      // var dialog = new dialogmodel()
      // 获取全部因子的代码和名称
      this.AllitemList = []
      console.log('ItemGroupSelect', val)
      let parameter = {
        modeltype: '',
        typetwo: val
      }
      axios.post(`${this.url}` + 'actionapi/Item/GetItemAll', parameter).then((response) => {
        console.log('ItemGroupSelect-response', response)
        this.load = true
        this.allitemdata = JSON.stringify(response.data.data)
        response.data.data.map((item, index) => {
          this.AllitemList.push(item)
        })
        if (callback !== undefined) {
          callback(response.data.data)
        }
      })
      this.itemoptions = [{ label: '请选择', value: '请选择' }]
      this.hvalue = -1
      let parameters = {
        UserID: '578',
        modeltype: val
      }
      axios.post(`${this.url}` + 'actionapi/ItemGroup/QueryItemGroup', parameters).then((response) => {
        console.log('response', response)
        response.data.data.map(item => {
          this.itemoptions.push({
            label: item.fldName,
            value: item.fldName,
            fldAutoID: item.fldAutoID,
            fldObject: item.fldObject,
            fldUserID: item.fldUserID,
            fldName: item.fldName,
            fldItemContent: item.fldItemContent
          })
        })
        console.log('this.itemoptions', this.itemoptions)
        console.log('this.index', this.index)
        if (this.index !== undefined) {
          this.hvalue = this.itemoptions[this.index].fldName
          // this.listenchange(this.itemoptions[this.index], this.index)
        } else {
          this.hvalue = '请选择'
        }
      })
    },
    listenchange (val, index) {
      // 项目组合改变
      console.log('listenchange', val, index)
      this.itemlist = []
      if (val && val.value !== '请选择') {
        val.fldItemContent.split(',').map(item => {
          this.itemlist.push(this.translateitem(item)) // 添加因子数据到展示层
        })
      }
      this.groupselect = { item: val, index: index }
      // this.$store.commit('updateitemgroup', {
      //   data: this.itemoptions,
      //   index: index
      // })
    },
    saveclass () {
      // 点击保存组
      this.$confirm(
        '<input id="newGroupName" placeholder="请输入组合名称" style="width:20vw;height:2em;"/>',
        '请输入组合名称',
        { dangerouslyUseHTMLString: true }
      ).then(() => {
        var newGroupname = document.getElementById('newGroupName').value
        // let dialog = new dialogmodel()
        let codearray = []
        this.itemlist.map((item, index) => {
          codearray.push(item.fldItemCode)
        })
        console.log('this.itemlist', this.itemlist)
        console.log('codearray1', codearray)
        codearray = codearray.join(',')
        console.log('codearray2', codearray)
        if (newGroupname.length !== '') {
          let params = {
            fldAutoID: 0,
            fldUserID: 578,
            fldObject: this.manager,
            fldName: newGroupname,
            fldItemContent: codearray
          }
          console.log('当前数据params ', params)
          axios.post(`${this.url}` + 'actionapi/ItemGroup/AddItemGroup', params).then((response) => {
            let item = response.data.data
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
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              }).then(() => {
                console.log('点击保存组', response)
                this.itemoptions.push({
                  label: item.fldName,
                  value: item.fldName,
                  fldAutoID: item.fldAutoID,
                  fldObject: item.fldObject,
                  fldUserID: item.fldUserID,
                  fldName: item.fldName,
                  fldItemContent: item.fldItemContent
                })
                this.hvalue = item.fldName
                sessionStorage.setItem(
                  'itemgroup',
                  JSON.stringify(this.itemoptions)
                )
                // this.$store.commit('updateitemgroup', {
                //   data: this.itemoptions,
                //   index: this.itemoptions.length - 1
                // })
              })
            }
          }
          )
        } else {
          this.$alert('请输入组合名称', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    deleteclass () {
      // 点击删除组
      this.$confirm('即将删除该组,确定删除该组？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        if (this.groupselect.index >= 1) {
          // dialog.DeleteItemGroup_V2(
          //   this.groupselect.item.fldAutoID,
          //   this.pointtype,
          //   response => {
          let params = {
            fldAutoID: this.groupselect.item.fldAutoID,
            fldObject: this.manager
          }
          axios.post(`${this.url}` + 'actionapi/ItemGroup/DeleteItemGroup_V2', params).then((response) => {
            this.hvalue = '请选择'
            this.itemoptions.splice(this.groupselect.index, 1)
            // this.$store.commit('updateitemgroup', {
            //   data: this.itemoptions,
            //   index: 0
            // })
            this.$alert('删除成功', '提示', {
              confirmButtonText: '确定'
            })
          }
          )
        }
      })
    },
    updateclass () {
      // 更新组合
      let name = this.groupselect.item.label
      let codearray = []
      this.itemlist.map((item, index) => {
        codearray.push(item.fldItemCode)
      })
      codearray = codearray.join(',')
      if (this.groupselect.index >= 1) {
        // dialog.UpdateItemGroup(
        //   this.groupselect.item.fldAutoID,
        //   this.pointtype,
        //   name,
        //   '578',
        //   codearray,
        //   response => {
        let params = {
          fldAutoID: this.groupselect.item.fldAutoID,
          fldObject: this.manager,
          fldName: name,
          fldUserID: 578,
          flditemcontent: codearray
        }
        axios.post(`${this.url}` + 'actionapi/ItemGroup/UpdateItemGroup', params).then((response) => {
          this.itemoptions[this.groupselect.index].fldItemContent = codearray
          this.$alert('更新组成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
          this.hiddenadditem()
          // this.$store.commit('updateitemgroup', {
          //   data: this.itemoptions,
          //   index: this.groupselect.index
          // })
        }
        )
      } else {
        this.$alert('请先选择一个组', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    clearall () {
      // 清除因子
      this.itemlist = []
    },
    hiddenadditem () {
      // 隐藏添加因子框
      var add = document.getElementById('btn_add')
      add.setAttribute('class', 'bt_add')
      this.allitemgroup = false
    },
    showadditem () {
      // 显示添加因子框
      // 点击新增按钮
      var add = document.getElementById('btn_add')
      add.setAttribute('class', 'btn_add')
      this.allitemgroup = !this.allitemgroup
      // if (this.allitemgroup) {
      //   var item = document.getElementById('item_group')
      //   item.style.top = add.getBoundingClientRect().top + 'px'
      //   item.style.left =
      //     add.getBoundingClientRect().left +
      //     add.getBoundingClientRect().width -
      //     2.5 +
      //     'px'
      // } else {
      //   add.setAttribute('class', 'bt_add')
      // }
    },
    grouptoall (item, index) {
      // 展示框双击删除当前点击选项
      this.itemlist.splice(index, 1)
    },
    deleteItem (item, index) {
      // 展示框单击删除当前点击选项
      // 点击删除某个
      this.itemlist.splice(index, 1)
    },
    handleCheckAllChange (val) {
      // 添加因子框因子的全选
      let all = []
      this.AllitemList.map(item => {
        all.push(item.fldItemCode)
      })
      this.checked = val ? all : []
      this.isIndeterminate = false
    },
    alltogroup (item, index) {
      // 双击添加因子框里面的选项
      this.itemlist.push(item)
      this.AllitemList.splice(index, 1)
    },
    handleCheckedCitiesChange (value) {
      // 添加因子框单个因子的选中
      let checkedCount = value.length
      this.checkAll = checkedCount === this.searchData.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.searchData.length
    },
    addalltogroup () {
      // 添加因子框添加选中因子
      this.checked.map(item => {
        this.itemlist.push(this.translateitem(item)) // 添加因子数据到展示层
      })
    },
    translateitem (val) {
      // 翻译因子
      let item = JSON.parse(this.allitemdata).find(value => {
        if (value.fldItemName === val || value.fldItemCode === val) {
          return value
        }
      })
      return item
    }
  },
  computed: {
    searchData: function () {
      // 实现搜索功能
      var search = this.selectcontent
      if (search) {
        return this.AllitemList.filter(function (AllitemList) {
          return Object.keys(AllitemList).some(function (key) {
            return (
              String(AllitemList[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.AllitemList
    }
    // moduletype () {
    //   return this.$store.state.moduletype
    // },
    // ncmoduletype () {
    //   return this.$store.state.ncmoduletype
    // },
    // zjsmoduletype () {
    //   return this.$store.state.zjsmoduletype
    // }
  },
  watch: {
    // moduletype (val) {
    //   // 观察当前业务
    //   this.itemlist = [] // 清除原来选择的因子
    //   if (val === 'eqic') {
    //     // 农村
    //     // 给其赋值
    //     this.pointtype = this.$store.state.ncmoduletype
    //   } else if (val === 'hmeqia') {
    //     // 重金属
    //     this.pointtype = this.$store.state.zjsmoduletype
    //   } else {
    //     this.pointtype = val
    //   }
    //   //  this.pointtype = val;
    //   if (this.pointtype !== 'eqin_t' && this.pointtype !== 'eqin_a') {
    //     // this.getitemall(this.pointtype)
    //   }
    // },
    // ncmoduletype (val) {
    //   this.pointtype = val
    //   console.log('ncmoduletypeitem', this.pointtype)
    // },
    // zjsmoduletype (val) {
    //   this.pointtype = val
    //   console.log('zjsmoduletypeitem', this.pointtype)
    // },
    // index (val) {
    //   // 观察页面选中的项目组合的索引来更新当前选中的因子组合
    //   console.log('index', val, this.itemoptions)
    //   if (val !== undefined && this.itemoptions.length > 0) {
    //     this.hvalue = this.itemoptions[val].fldName
    //     this.listenchange(this.itemoptions[val], val)
    //   } else {
    //     this.hvalue = -1
    //   }
    // },
    // itemlist (val) {
    //   // 观察当前选好的因子来控制添加因子框要展示那些因子
    //   this.checkeditems = []
    //   if (val.length > 0) {
    //     val.map(item => {
    //       this.checkeditems.push(item.fldItemCode)
    //     })
    //     this.$store.commit('updateitemselectall', this.checkeditems.join(','))
    //   }
    //   this.AllitemList = []
    //   if (this.load) {
    //     JSON.parse(this.allitemdata).map(item => {
    //       if (this.checkeditems.indexOf(item.fldItemCode) === -1) {
    //         this.AllitemList.push(item)
    //       }
    //     })
    //   }
    // },
    // load (val) {
    //   console.log('load', val)
    //   if (val) {
    //     JSON.parse(this.allitemdata).map(item => {
    //       if (this.checkeditems.indexOf(item.fldItemCode) === -1) {
    //         this.AllitemList.push(item)
    //       }
    //     })
    //     this.listenchange(this.itemoptions[this.index], this.index)
    //   }
    // }
  },
  created () {
    // 判断业务类型，给测点组合和因子组合附上相同业务的不同业务名称
    this.getitemall(this.manager)
    // if (this.$store.state.moduletype === 'eqic') {
    //   // 农村
    //   // 给其赋值
    //   this.pointtype = this.$store.state.ncmoduletype
    // } else if (this.$store.state.moduletype === 'hmeqia') {
    //   this.pointtype = this.$store.state.zjsmoduletype
    // } else {
    //   this.pointtype = this.$store.state.moduletype
    // }
    // console.log('itempoint', this.pointtype)
    // console.log(
    //   'this.$store.state.ncmoduletype',
    //   this.$store.state.ncmoduletype
    // )
    // if (this.pointtype !== 'eqin_t' && this.pointtype !== 'eqin_a') {
    //   // this.getitemall(this.pointtype) // 组件初始化根据当前业务获取因子以及项目组合
    // }
  }
}
</script>

<style scoped>
.dialogcontainer {
  /* width: 100%;
  height: 55vh; */
  width: 500px;
  height: 55vh;
  background: #dddddd;
  padding: 0 12px;
  position: relative;
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
  /* height: 20vh;
  width: 500px; */
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
  height: 30px;
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
  height: 30px;
  line-height: 30px;
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
  height: 30px;
  line-height: 30px;
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
  height: 30px;
  line-height: 30px;
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
  height: 30px;
  line-height: 30px;
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
  height: 30px;
  line-height: 30px;
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
  height: 30px;
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
  cursor: pointer;
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
  position: absolute;
  top: 0;
  left: 100% !important;
  /* margin-left: 20px; */
  background: #ffffff;
  width: 16vw;
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
i {
  cursor: pointer;
}
.itemlist li {
  cursor: pointer;
}
</style>
