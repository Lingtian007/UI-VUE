<template>
  <div class="eqiw_lt_condition_lanzao">
    <div class="sltime">
      <div ref='dialogs' style="display:flex;align-items: center;margin: 9px 10px;">
        <div class="bt_querys" style="background:orange;" @click="showHightSet">高级设置</div>
        <div v-if="hightset" style="z-index:100;position:absolute;top: 45px;clear:both;display:flex;flex-direction: column;width:350px;border-radius:8px;background:#fefefe;overflow:hidden;box-shadow:rgba(0, 0, 0,0.2) 0px 0px 2px 2px !important;">
          <div class="slhk" style="background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;">高级设置
          </div>
          <div class="slhk" >
            超标依据：
            <el-select v-model="dvalue" placeholder="请选择" @change="getRiverName" style="width:100px;margin-right:10px;" size="mini">
              <el-option v-for="item in doptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="dvaluelevel" placeholder="请选择" @change="getRiverLevel" style="width:75px;" size="mini">
              <el-option v-for="item in doptionslevel" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div v-else-if="hightset_eqiw_d" style="z-index:100;position:absolute;top: 45px;clear:both;display:flex;flex-direction: column;width:400px;border-radius:8px;background:#fefefe;overflow:hidden;box-shadow:rgba(0, 0, 0,0.2) 0px 0px 2px 2px !important;">
          <div class="slhk" style="background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;">高级设置
          </div>
          <div class="slhk">
            地表水超标依据：
          <el-select v-model="dvalue" placeholder="请选择" @change="getRiverName" style="width:100px;margin-right:10px;" size="mini">
              <el-option
                v-for="item in doptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="dvaluelevel" placeholder="请选择" @change="getRiverLevel" style="width:75px;" size="mini">
              <el-option
                v-for="item in doptionslevel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="slhk">
            地下水超标依据：
            <el-select v-model="hvalue" placeholder="请选择" @change="getLakeName" style="width:100px;margin-right:10px;" size="mini">
                <el-option
                  v-for="item in hoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="hvaluelevel" placeholder="请选择" @change="getLakeLevel" style="width:75px;" size="mini">
                <el-option
                  v-for="item in hoptionslevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="slhk" v-if="isTrue">
            数据源：
            <el-radio-group v-model="dataSource">
              <el-radio :label="3">全分析</el-radio>
              <el-radio :label="0">常规数据</el-radio>
            </el-radio-group>
          </div>
          <!-- <div class="slhk" style="justify-content: space-around;margin-bottom:5px;">
            <div class="bt_query" @click="changePoint">修改测点组合</div>
            <div class="bt_query" @click="changeItemclass">修改项目组合</div>
          </div> -->
        </div>
        <div v-if="hightset_eqia_p" style="z-index:100;position:absolute;top: 45px;clear:both;display:flex;flex-direction: column;width:350px;border-radius:8px;background:#fefefe;overflow:hidden;box-shadow:rgba(0, 0, 0,0.2) 0px 0px 2px 2px !important;">
                <div class="slhk" style="background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;">高级设置
                </div>
                <div class="slhk">
                  酸雨标准：
                  <input type="text" v-model="rainValue" style="width:70px;height:27px;margin-right:10px;text-align:center;border:1px solid #dfe4ed;font-weight:200;color:rgba(0,0,0,0.6)" @blur="getpHStand(rainValue)">
                </div>
                <!-- <div class="slhk" style="justify-content: space-around;margin-bottom:5px;">
                  <div class="bt_query" @click="changePoint">修改测点组合</div>
                  <div class="bt_query" @click="changeItemclass">修改项目组合</div>
                </div> -->
        </div>
        <div v-if="hightset_eqin" style="z-index:100;position:absolute;top: 45px;clear:both;display:flex;flex-direction: column;width:350px;border-radius:8px;background:#fefefe;overflow:hidden;box-shadow:rgba(0, 0, 0,0.2) 0px 0px 2px 2px !important;">
          <div class="slhk" style="background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;">高级设置
          </div>
          <div class="slhk" v-if='isFalse'>昼夜选择：
            <el-checkbox-group  v-model="getDN" @change="gettype" size="mini" :disabled="pagename == 'eqin_a_12'?true:false">
              <el-checkbox-button  v-for="item in DNoptions" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="slhk" style="justify-content: space-around;margin-bottom:5px;">
            <div class="bt_query" @click="changePoint">修改测点组合</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'h-set',
  props: {
    Types: {
      type: String,
      default: 'eqia_r'
    },
    pagename: {
      type: String,
      default: ''
    },
    dvalues: {
      type: String,
      default: ''
    },
    dvaluelevels: {
      type: String,
      default: ''
    },
    hvalues: {
      type: String,
      default: ''
    },
    hvaluelevels: {
      type: String,
      default: ''
    },
    rainValues: {
      type: String,
      default: ''
    }

  },
  mounted () {
    this.querycondition.dbsItemStandardName = this.dvalue
    this.querycondition.dbsItemLevel = this.dvaluelevel
    this.querycondition.hkItemStandardName = this.hvalue
    this.querycondition.hkItemLevel = this.hvaluelevel
    sessionStorage.setItem('countryRiverName', 'GB 3838-2002')
    sessionStorage.setItem('countryRiverLevel', '3')
    sessionStorage.setItem('countryLakeName', 'GB 3838-2002')
    sessionStorage.setItem('countryLakeLevel', '3')
    let _this = this
    document.onclick = e => {
      if (!!this.$refs.dialogs.contains(e.target)) return
      _this.hightset = false
      _this.hightset_eqiw_d = false
      _this.hightset_eqia_p = false
      _this.hightset_eqin = false
      // this.getpHStand(this.rainValues)
    }
  },
  data () {
    return {
      DNoptions: ['昼间（D）', '夜间（N）'],
      getDN: ['昼间（D）'],
      rainValue: '5.6',
      dataSource: 3,
      itemvalue: '',
      itemwidth: 18,
      doptions: [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        },
        {
          value: 'GB 3838-2002 考核',
          label: 'GB 3838-2002 考核'
        },
        {
          value: 'GB 151618-1995 DN',
          label: 'GB 151618-1995 DN'
        }
      ],
      dvalue: 'GB 3838-2002',
      doptionslevel: [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: 'Ⅴ类' },
        { value: '6', label: '功能区类' }
      ],
      dvaluelevel: '3',
      hoptions: [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        },
        {
          value: 'GB 3838-2002 考核',
          label: 'GB 3838-2002 考核'
        }
      ],
      hvalue: 'GB 3838-2002',
      hoptionslevel: [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: '劣Ⅴ类' },
        { value: '6', label: '功能区类' }
      ],
      hvaluelevel: '3',
      pointvalue: '', // 组合名称
      pointindex: null,
      cedianvalue: '', // 点位代码
      cediandata: [], // 全部测点组合数据
      itemGroup: '', // 组合名称
      items: '', // 因子代码
      itemdata: [], // 全部测点组合数据
      itemValues: '',
      querycondition: {
        tiem: null,
        dbsItemStandardName: '',
        dbsItemLevel: '',
        hkItemStandardName: '',
        hkItemLevel: ''
      },
      select1: '',
      dialogVisible: false,
      hightset: false,
      hightset_eqiw_d: false,
      hightset_eqia_p: false,
      hightset_eqin: false,
      isTrue: false,
      isFalse: true
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    if (this.Types === 'eqia_r') {
      this.doptions = [
        {
          value: '环境空气质量标准2012',
          label: '环境空气质量标准2012'
        },
        {
          value: '环境空气质量标准1996',
          label: '环境空气质量标准1996'
        }
      ]
      this.dvalue = '环境空气质量标准2012'
      this.doptionslevel = [
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '超二级' }
      ]
      this.dvaluelevel = '2'
    } else if (this.Types === 'eqiw_r') {
      this.doptions = [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        }
      ]
      this.dvalue = 'GB 3838-2002'
      this.doptionslevel = [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: 'Ⅴ类' },
        { value: '6', label: '功能区类' },
        { value: '7', label: '考核目标' }
      ]
      this.dvaluelevel = '3'
    } else if (this.Types === 'eqiw_l') {
      this.doptions = [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        }
      ]
      this.dvalue = 'GB 3838-2002'
      this.doptionslevel = [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: 'Ⅴ类' },
        { value: '6', label: '功能区类' },
        { value: '7', label: '考核目标' }
      ]
      this.dvaluelevel = '3'
    } else if (this.Types === 'eqiw_rl') {
      this.doptions = [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        }
      ]
      this.dvalue = 'GB 3838-2002'
      this.doptionslevel = [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: 'Ⅴ类' },
        { value: '6', label: '功能区类' },
        { value: '7', label: '考核目标' },
        { value: '9', label: '106考核' }
      ]
      this.dvaluelevel = '3'
    } else if (this.Types === 'eqiw_d') {
      if (this.pagename === 'Drinking_water3' || this.pagename === 'Drinking_water4' || this.pagename === 'Drinking_water6') {
        this.isTrue = true
      } else {
        this.isTrue = false
      }
      this.doptions = [
        {
          value: 'GB 3838-2002',
          label: 'GB 3838-2002'
        }
      ]
      this.dvalue = 'GB 3838-2002'
      this.doptionslevel = [
        { value: '1', label: 'Ⅰ类' },
        { value: '2', label: 'Ⅱ类' },
        { value: '3', label: 'Ⅲ类' },
        { value: '4', label: 'Ⅳ类' },
        { value: '5', label: 'Ⅴ类' }
      ]
      this.dvaluelevel = '3'
      // ----------
      this.hoptions = [
        {
          value: 'GB/T14848-93',
          label: 'GB/T14848-93'
        },
        {
          value: 'GB/T14848-2017',
          label: 'GB/T14848-2017'
        }
      ]
      this.hvalue = 'GB/T14848-93'
      this.hoptionslevel = [
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '三级' },
        { value: '4', label: '四级' },
        { value: '5', label: '五级' }
      ]
      this.hvaluelevel = '3'
    } else {

    }
    if (this.dvalues !== this.dvalue) {
      this.dvalue = this.dvalues
      // this.getRiverName(this.dvalues)rainValues
    }
    if (this.dvaluelevels !== this.dvaluelevel) {
      this.dvaluelevel = this.dvaluelevels
    }
    if (this.hvalues !== this.hvalue) {
      this.hvalue = this.hvalues
      // this.getRiverName(this.dvalues)rainValues
    }
    if (this.hvaluelevels !== this.hvaluelevel) {
      this.hvaluelevel = this.hvaluelevels
    }
    if (this.rainValues !== this.rainValue) {
      console.log('当前数据 1111 ', 1111)
      this.rainValue = this.rainValues
    }
  },
  methods: {
    showHightSet () {
      if (this.Types === 'eqiw_d') {
        this.hightset_eqiw_d = !this.hightset_eqiw_d
      } else if (this.Types === 'eqia_p') {
        this.hightset_eqia_p = !this.hightset_eqia_p
      } else if (this.Types === 'eqin_t' || this.Types === 'eqin_a') {
        this.hightset_eqin = !this.hightset_eqin
      } else if (this.Types === 'eqin_f') {
        this.hightset_eqin = !this.hightset_eqin
        this.isFalse = false
      } else if (this.Types === 'eqia_rd') {
        this.hightset_eqin = !this.hightset_eqin
        this.isFalse = false
      } else {
        this.hightset = !this.hightset
      }
    },
    open () {
      this.$alert(
        '结束时间不能小于开始时间，请重新选择时间范围！',
        '时间错误',
        {
          confirmButtonText: '确定',
          callback: action => {}
        }
      )
    },
    open1 () {
      this.$alert('返回超时，请重新选择时间，获取测点组合！', '时间错误', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    },
    getpHStand (val) {
      console.log('val', val)
      this.querycondition.pHStand = val
      sessionStorage.setItem('pHStand', val)
    },
    getRiverName (item) {
      // console.log('12133',item);
      sessionStorage.setItem('countryRiverName', item)
    },
    getRiverLevel (item) {
      console.log('5656', item)
      sessionStorage.setItem('countryRiverLevel', item)
    },
    getLakeName (item) {
      sessionStorage.setItem('countryLakeName', item)
    },
    getLakeLevel (item) {
      // console.log(('5656',item));
      sessionStorage.setItem('countryLakeLevel', item)
    },
    gettype (value) { // 获取昼夜选择
      if (this.pagename === 'countyNoise4' || this.pagename === 'countyNoise5' || this.pagename === 'eqin_a_9' || this.pagename === 'eqin_a_11') {
        if (this.getDN.length > 1) {
          // 设置单选
          this.getDN.shift()
        } else if (this.getDN.length === 0) {
          this.getDN = ['昼间（D）']
        }
        this.minCheck = 1
      } else {
        this.minCheck = 0
      }

      if (value.length > 1) {
        sessionStorage.setItem('check', 'All')
      } else if (value.length === 1) {
        if (value[0].indexOf('D') > 0) {
          sessionStorage.setItem('check', 'D')
        } else if (value[0].indexOf('N') > 0) {
          sessionStorage.setItem('check', 'N')
        }
      } else {
        sessionStorage.setItem('check', '0')
      }
    },
    changePoint () {
      // 点击修改测点组合

      // for (let i = 0; i < this.cedianselect.length; i++) {
      //   if (this.cedianselect[i].label == this.pointvalue) {
      //     this.pointindex = i;
      //   }
      // }
      // console.log("cediandsadasdasd", this.pointindex);
      // Bus.$emit("changeOption", this.pointindex);
    }
  }
}
</script>

<style  scoped>
.eqiw_lt_condition_lanzao {
  width: 100%;
  height: 100%;
}
.eqiw_l_condition_title {
  width: 100%;
}
.sltime {
  margin-top: 10px;
  border-radius: 5px;
  width: 98%;
  height: 50px;
  background-color: #fff;
  display: flex;
  padding-left: 10px;
  position: relative;
}

.selstyle {
  margin-right: 5px;
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
  padding: 0 5px;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  &:hover {
    cursor: pointer;
    background-color: #58c6ea;
  }
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
  font-size: 12px;
  margin-left: 10px;
  height: 28px;
  line-height: 28px;
  &:hover {
    cursor: pointer;
    background-color: #58c6ea;
  }
}
.sldbs {
  padding-left: 5px;
  height: 42px;
  border-bottom: solid 1px #b1b1b1;
  line-height: 42px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  vertical-align: center;
}
.slhk {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 42px;
  text-align: center;
}
.download {
  position: absolute;
  top: 90px;
  right: 50px;
  z-index: 10;
}
</style>
