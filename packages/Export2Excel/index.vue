<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 12:53:34
 * @LastEditTime: 2019-09-02 10:55:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="eqiw_r_condition">
    <div class="sltime">
      <div style="display:flex;align-items: center;">
        <!-- <div class="bt_querys" @click="query">生成报表</div> -->
        <div class="bt_querys download" @click="handleDownload" :loading="downloadLoading">导出报表</div>
      </div>
    </div>
  </div>
</template>
<script>
// import export_json_to_excel from './Export2Excel.js'
export default {
  name: 'export2-excel',
  props: {
    exportData: {
      // 业务类型
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      yearFilter: [],
      yearsArr: [
        {
          label: 2015,
          value: '0'
        },
        {
          label: 2016,
          value: '1'
        },
        {
          label: 2017,
          value: '2'
        },
        {
          label: 2018,
          value: '3'
        }
      ],
      ISTrue: false,
      deduct: true,
      otherTab: 'citySel',
      itemselectindex: -1,
      showOther: false,
      controlLevels: 'gk',
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
      pullSource: '城市日数据',
      areaLevel: '城市',
      pages: 'cityDay3',
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
      select1: '',
      itemoptions: [{ label: '请选择', value: '请选择' }],
      itemvalue: '',
      dialogVisible: false,
      selstyle: {
        width: '100px',
        height: '40px'
      },
      nowchart: '',
      // pointvalue: '', //组合名称
      // pointindex: null,
      // cedianvalue: '', //点位代码
      // cediandata: [], //全部测点组合数据
      // itemGroup: '', //组合名称
      // items: '', //因子代码
      // itemdata: [], //全部测点组合数据
      // itemValues: '',
      // select1: '',
      // dialogVisible: false,
      cedianselect: [],
      cvalue: '',
      downloadLoading: false,
      timetype: ['month', 'year', 'day', 'sea', 'halfyear'],
      howcheck: false,
      hightset: false,
      datasource: false,
      dataType: 'std',
      checkStatus: 'app',
      repairMethod: '0',
      scxzdata: '',
      judge: '',
      province: '',
      sandselect: false,
      saveValue: ''
      // days:''
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    handleDownload () {
      this.downloadLoading = true
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('./Export2Excel')
        // const tHeader = this.$store.state.tablehead;
        // const filterVal = this.$store.state.tablemod;
        // const list = this.$store.state.tabledata;
        // this.filename = this.$store.state.tabletitle;
        const exportData = this.exportData
        const tHeader = exportData[0].head
        const filterVal = exportData[0].mod
        const list = exportData[0].tabledata
        let filterVal1
        let list1
        let data1
        this.filename = exportData[0].tabletitle
        const data = this.formatJson(filterVal, list)
        if (exportData.length > 1) {
          filterVal1 = exportData[1].mod
          list1 = exportData[1].tabledata
          data1 = this.formatJson(filterVal1, list1)
          data1.map(it => {
            data.push(it)
          })
        }
        const merges =
          exportData[0].merges !== undefined ? exportData[0].merges : []
        const cellColor =
          exportData[0].cellColor !== undefined ? exportData[0].cellColor : []

        export_json_to_excel(tHeader, data, this.filename, merges, cellColor)
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  },
  destroyed () {
    // sessionStorage.removeItem("AirName");
    // sessionStorage.removeItem("AirLevel");
    // sessionStorage.removeItem("itemGroup");
  }
}
</script>

<style  scoped>
.eqiw_r_condition {
  width: 100%;
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

.download {
  position: absolute;
  /* top: 90px;
  right: 50px; */
  z-index: 10;
}
</style>