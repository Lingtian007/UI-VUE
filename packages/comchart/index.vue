<template>
  <div class="com-chart">
    <!-- <div class="del" @click="del1">×</div> -->
    <div :id="id" :style="{height:chartheight,width:doughnutchartwidth}" @click="click1"></div>
  </div>
</template>
<script>
import CommonWay from './CommonWay.js'
// import 'echarts-liquidfill/src/liquidFill.js'
import echarts from 'echarts'
export default {
  name: 'com-chart',
  props: {
    id: {
      // 默认ID
      type: String,
      default: 'com-chart'
    },
    doughnutchartwidth: {
      // 默认长度
      type: String,
      default: '50%'
    },
    chartheight: {
      // 默认高度
      type: String,
      default: '50%'
    },
    Options: {
      type: Object,
      default: () => {
        return {
          xAxis: {
            data: []
          },
          yAxis: {},
          series: []
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    rightwidth: {
      type: String,
      default: ''
    },
    mainheight: {
      type: String,
      default: ''
    },
    resize: {
      type: Number,
      default: 0
    },
    reload: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    if (this.Options != null) {
      this.createchart(this.Options)
    }
  },
  computed: {
    // chartheight () {
    //   if (this.title === '') {
    //     return '100%'
    //   } else {
    //     return '100%'
    //   }
    // },
    titleheight () {
      if (this.title === '') {
        return '0%'
      } else {
        return '0%'
      }
    }
  },
  watch: {
    Options: {
      handler: function (val, oldval) {
        if (val != null) {
          if (this.chart != null) {
            this.chart.clear()
          }
          this.createchart(this.Options)
        }
      },
      deep: true
    },
    resize () {
      this.createchart(this.Options)
    },
    reload () {
      this.chart.resize()
    },
    rightwidth () {
      setTimeout(() => {
        this.chart.resize()
      }, 500)
    },
    mainheight () {
      setTimeout(() => {
        this.chart.resize()
      }, 500)
    }
  },
  methods: {
    click1 () {
      this.$emit('changedata', this.id)
    },
    del1 () {
      this.$emit('del', this.id)
    },
    createchart (Options) {
      this.chart ? this.chart.dispose() : null
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(Options)

      var cway = new CommonWay()
      var _this = this
      cway.addEventOnResize(function () {
        _this.chart.resize()
      })
    }
  }
}
</script>
<style scoped>
.com-chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.del {
  position: absolute;
  right: 10px;
  font-size: 20px;
  top: 10px;
  z-index: 1;
}

.del:hover {
  cursor: pointer;
  color: skyblue;
  border-bottom: 1px solid skyblue;
}
</style>
