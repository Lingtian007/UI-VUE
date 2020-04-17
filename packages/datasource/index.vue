<template>
  <div class='eqiw_r_condition2'>
    <div ref='dialogs' style='display:flex;align-items: center;'>
      <div class='bt_querys' style='background:orange;' @click='showDataSource'>数据源</div>
      <!-- <div class='bt_querys' style='background:orange;' @click='showSand'>沙尘选择</div> -->
      <div v-if='datasource' style='z-index:100;position:absolute;top: 225px;clear:both;display:flex;flex-direction: column;width:405px;border-radius:8px;background:#fefefe;overflow:hidden;box-shadow:rgba(0, 0, 0,0.2) 0px 0px 2px 2px !important;'>
        <div class='slhk' style='background:rgba(8, 117, 252, 0.85);color:white;font-size:18px;'>数据源</div>
        <div class='slhk'>
          修约方式：
          <el-radio-group v-model='repairMethod' @change='getRepairMethod' size='mini'>
            <el-radio label='0'>标&emsp;准</el-radio>
            <el-radio label='1'>标准+1</el-radio>
          </el-radio-group>
        </div>
        <div class='slhk'>
          审核情况：
          <el-radio-group v-model='checkStatus' @change='getCheckStatus' size='mini'>
            <el-radio label='app'>已审核</el-radio>
            <el-radio label='unapp'>未审核</el-radio>
            <el-radio label='AppMixed'>混&emsp;合</el-radio>
          </el-radio-group>
        </div>
        <div class='slhk'>
          数据类型：
          <el-radio-group v-model='dataType' @change='getDataType' size='mini'>
            <el-radio label='std'>标&emsp;况</el-radio>
            <el-radio label='actual'>实&emsp;况</el-radio>
            <el-radio label='AcctualMixed'>混&emsp;合</el-radio>
          </el-radio-group>
        </div>
        <div class='mix' v-if='showMix'>
          <p>数据类型混合</p>
          <el-tabs type='border-card' v-model='controlLevels'>
            <el-tab-pane label='国控' name='gk'>
              <div class='mixItem'>
                <span>2019</span>
                <el-radio-group v-model='Mix2019'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2019'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2018</span>
                <el-radio-group v-model='Mix2018'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2018'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2017</span>
                <el-radio-group v-model='Mix2017'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2017'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2016</span>
                <el-radio-group v-model='Mix2016'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2016'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2015</span>
                <el-radio-group v-model='Mix2015'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2015'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2014</span>
                <el-radio-group v-model='Mix2014'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2014'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2013</span>
                <el-radio-group v-model='Mix2013'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2013'>实况</el-radio-button>
                </el-radio-group>
              </div>
            </el-tab-pane>
            <el-tab-pane label='省控' name='sk'>
              <div class='mixItem'>
                <span>2019</span>
                <el-radio-group v-model='skMix2019'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2019'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2018</span>
                <el-radio-group v-model='skMix2018'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2018'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2017</span>
                <el-radio-group v-model='skMix2017'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2017'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2016</span>
                <el-radio-group v-model='skMix2016'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2016'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2015</span>
                <el-radio-group v-model='skMix2015'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2015'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2014</span>
                <el-radio-group v-model='skMix2014'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2014'>实况</el-radio-button>
                </el-radio-group>
              </div>
              <div class='mixItem'>
                <span>2013</span>
                <el-radio-group v-model='skMix2013'>
                  <el-radio-button label>标况</el-radio-button>
                  <el-radio-button label='2013'>实况</el-radio-button>
                </el-radio-group>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'data-source',
  props: {
    repairMethods: {
      // 默认select长度
      type: String,
      default: ''
    },
    checkStatu: {
      // 默认select长度
      type: String,
      default: ''
    },
    dataTypes: {
      // 默认select长度
      type: String,
      default: ''
    }
  },
  data () {
    return {
      controlLevels: 'gk',
      itemselectindex: -1,
      otherTab: 'citySel',
      deduct: true,
      showOther: false,
      showMix: false,
      Mix2019: '',
      Mix2018: '',
      Mix2017: '',
      Mix2016: '',
      Mix2015: '',
      Mix2014: '',
      Mix2013: '',
      skMix2019: '',
      skMix2018: '',
      skMix2017: '',
      skMix2016: '',
      skMix2015: '',
      skMix2014: '',
      skMix2013: '',
      doptions: [
        {
          value: '环境空气质量标准2012',
          label: '环境空气质量标准2012'
        },
        {
          value: '环境空气质量标准1996',
          label: '环境空气质量标准1996'
        }
      ],
      option: '',
      dvalue: '环境空气质量标准2012',
      doptionslevel: [
        { value: '1', label: '一级' },
        { value: '2', label: '二级' },
        { value: '3', label: '超二级' }
      ],
      level: '',
      dvaluelevel: '2',
      hoptions: [
        {
          value: '2012',
          label: '环境空气质量标准2012'
        },
        {
          value: '1996',
          label: '环境空气质量标准1996'
        }
      ],
      querycondition: {
        tiem: null,
        dbsItemStandardName: '',
        dbsItemLevel: ''
      },
      hightset: false,
      select1: '',
      itemoptions: [{ label: '请选择', value: '请选择' }],
      itemvalue: '',
      dialogVisible: false,
      selstyle: {
        width: '100px',
        height: '40px'
      },
      pointvalue: '', //  组合名称
      pointindex: null,
      cedianvalue: '', //  点位代码
      cediandata: [], // 全部测点组合数据
      itemGroup: '', // 组合名称
      items: '', // 因子代码
      itemdata: [], // 全部测点组合数据
      itemValues: '',
      //  select1: '',
      //  dialogVisible: false,
      cedianselect: [{label: '请选择', value: '请选择'}],
      cvalue: '',
      downloadLoading: false,
      timetype: ['month', 'year', 'day', 'sea'],
      howcheck: false,
      pointCity: '0',
      newData: false,
      datasource: false,
      dataType: 'actual',
      checkStatus: 'app',
      repairMethod: '0',
      scxzdata: '',
      sandselect: false,
      saveValue: '',
      judge: '',
      province: '',
      saveFlag: false
    }
  },
  watch: {
    repairMethods (val) {
      this.getRepairMethod(val)
    },
    checkStatu (val) {
      this.getCheckStatus(val)
    },
    dataTypes (val) {
      this.getDataType(val)
    }
  },
  computed: {},
  created () {
    if (this.repairMethods !== this.repairMethod) {
      this.getRepairMethod(this.repairMethods)
    }
    if (this.checkStatu !== this.checkStatus) {
      this.getCheckStatus(this.checkStatu)
    }
    if (this.dataTypes !== this.dataType) {
      this.getDataType(this.dataTypes)
    }
  },
  mounted () {
    this.itemselectindex = this.itemselectindex_index
    sessionStorage.setItem('AirName', '环境空气质量标准2012')
    sessionStorage.setItem('AirLevel', '2')
    this.querycondition.dbsItemStandardName = this.dvalue
    this.querycondition.dbsItemLevel = this.dvaluelevel
    let _this = this
    document.onclick = e => {
      if (!!this.$refs.dialogs.contains(e.target)) return
      _this.showOther = false
      _this.hightset = false
      _this.datasource = false
      _this.sandselect = false
      _this.query()
    }
  },
  methods: {
    showSand () {
      this.sandselect = !this.sandselect
      this.datasource = false
      this.hightset = false
    },
    getDataType (val) {
      this.dataType = val
      this.$emit('getDataType', val)
    },
    getCheckStatus (val) {
      this.checkStatus = val
      this.$emit('getCheckStatus', val)
    },
    getRepairMethod (val) {
      this.repairMethod = val
      this.$emit('getCheckStatus', val)
    },
    showDataSource () {
      this.datasource = !this.datasource
      this.hightset = false
      this.sandselect = false
      this.query()
    },
    query () {
      // 点击查询按钮
      this.querycondition.checkStatus = this.checkStatus
      this.querycondition.repairMethod = this.repairMethod
      this.querycondition.scxzdata = this.scxzdata
      this.querycondition.isMinusPoint = this.deduct
      let dtObj = {}
      if (this.dataType === 'AcctualMixed') {
        dtObj = {
          gk: {
            Mix2019: this.Mix2019,
            Mix2018: this.Mix2018,
            Mix2017: this.Mix2017,
            Mix2016: this.Mix2016,
            Mix2015: this.Mix2015,
            Mix2014: this.Mix2014,
            Mix2013: this.Mix2013
          },
          sk: {
            skMix2019: this.skMix2019,
            skMix2018: this.skMix2018,
            skMix2017: this.skMix2017,
            skMix2016: this.skMix2016,
            skMix2015: this.skMix2015,
            skMix2014: this.skMix2014,
            skMix2013: this.skMix2013
          }
        }
        let mixDatagk = []
        let mixDatask = []
        for (let key in dtObj.gk) {
          if (dtObj.gk[key] !== '') {
            mixDatagk.push(dtObj.gk[key])
          }
        }
        for (let key in dtObj.sk) {
          if (dtObj.sk[key] !== '') {
            mixDatask.push(dtObj.sk[key])
          }
        }
        if (mixDatask.length === 0) {
          this.querycondition.dataType = 'AcctualMixed:' + mixDatagk.join(',') + '$$'
        } else {
          this.querycondition.dataType = 'AcctualMixed:' + mixDatagk.join(',') + '$$' + mixDatask.join(',')
        }
      } else {
        this.querycondition.dataType = this.dataType
      }
      this.$emit('DataSourceChange', this.querycondition)
    },
    // 保存条件
    saveCond () {
      this.querycondition.dataType = this.dataType
      this.querycondition.checkStatus = this.checkStatus
      this.querycondition.repairMethod = this.repairMethod
      localStorage.setItem('datasource', JSON.stringify(this.querycondition))
      this.$message({
        message: '保存条件成功',
        type: 'success'
      })
    }
  },
  destroyed () {
    sessionStorage.removeItem('AirName')
    sessionStorage.removeItem('AirLevel')
    sessionStorage.removeItem('itemGroup')
  }
}
</script>

<style  scoped>
.eqiw_r_condition {
  width: 98%;
  margin-left: 1%;
  height: 100%;
}
.eqiw_r_condition_title {
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
  font-size: 13px;
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
  font-size: 13px;
  margin-left: 10px;
  height: 28px;
  line-height: 28px;
  &:hover {
    cursor: pointer;
    background-color: #58c6ea;
  }
}
.sldbs {
  padding-left: 5px !important;
  height: 42px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #b1b1b1;
  //  line-height: 42px;
  vertical-align: center;
  background-color: #f5f5f5;
}

.slhk {
  height: 5vh;
  display: -webkit-box;
  padding-left: 53px;
  line-height: 5vh;
  .el-checkbox {
    display: flex;
    align-items: center;
  }
}
.saveCond {
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgb(144, 147, 153);
  color: white;
  padding: 4px 3px;
  border-radius: 4px;
  &:hover {
    background-color: rgba(144, 147, 153, 0.5);
  }
}
.mix {
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-left: 53px;
  margin-right: 30px;
  padding-left: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 2px;
  p {
    border-bottom: 1px solid rgb(45, 138, 252);
    text-indent: 1vw;
    padding: 1vh 0;
  }
  .mixItem {
    display: flex;
    align-items: center;
    margin-left: 1vw;
    margin-bottom: 1vh;
    span {
      margin-right: 2vw;
    }
  }
}
.otherPic {
  position: absolute;
  right: 10px;
}
.otherBtn {
  cursor: pointer;
}
.otherCond {
  z-index: 100;
  position: absolute;
  top: 45px;
  right: 0;
  clear: both;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 8px;
  background: #fefefe;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 2px 2px !important;
}
.otherTab {
  padding: 0 10px 0 53px;
}
.download {
  position: absolute;
  top: 90px;
  right: 50px;
  z-index: 10;
}
</style>
