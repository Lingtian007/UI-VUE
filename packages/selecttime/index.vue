<template>
  <div class='selecttime'>
    <div class='timetype' v-show='isshowtimetype'>
      <!-- <span class='spta'> 时间类型：</span> -->
      <el-radio-group v-model='currenttimetype' class='timetype-item' @change='change' size='mini'>
        <el-radio-button label='hour' v-if='timetype.hour'>时</el-radio-button>
        <el-radio-button label='day' v-if='timetype.day'>日</el-radio-button>
        <el-radio-button label='month' v-if='timetype.month'>月</el-radio-button>
        <el-radio-button label='sea' v-if='timetype.sea'>季</el-radio-button>
         <el-radio-button label='halfyear' v-if='timetype.halfyear'>半年</el-radio-button>
        <el-radio-button label='year' v-if='timetype.year'>年</el-radio-button>
      </el-radio-group>
      <!-- </div>
    <div class='selectbk'> -->
      <!-- <span class='spta'>时间：</span> -->
      <div v-if='timeitemshow' style='display:flexmargin-left:10px'>
        <el-select v-model='BeginYear' placeholder='请选择' v-if='pickitemshow.BeginYear' @change='change' style='width:85px' size='mini'>
          <el-option v-for='item in Yearoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
         <el-select v-model='BeginHalfYear' placeholder='请选择' v-if='pickitemshow.BeginHalfYear' @change='change'
          style='width:80px;margin-left: 2px;' size='mini'>
          <el-option v-for='item in halfYearoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
        <el-select v-model='BeginMonth' placeholder='请选择' v-if='pickitemshow.BeginMonth' @change='change' style='width:66px;margin-left: 2px' size='mini'>
          <el-option v-for='item in months' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
        <el-select v-model='Beginsea' placeholder='请选择' v-if='pickitemshow.Beginsea' @change='change' style='width:66px;margin-left: 2px' size='mini'>
          <el-option v-for='item in seaoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
        <span style='line-height:28px;margin-left: 2px;margin-right: 2px' v-if='pickitemshow.EndYear'>至</span>
        <el-select v-model='EndYear' placeholder='请选择' v-if='pickitemshow.EndYear' @change='change' style='width:85px' size='mini'>
          <el-option v-for='item in Yearoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
        <el-select v-model='EndMonth' placeholder='请选择' v-if='pickitemshow.EndMonth' @change='change' style='width:66px;margin-left: 2px' size='mini'>
          <el-option v-for='item in months' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
        <el-select v-model='Endsea' placeholder='请选择' v-if='pickitemshow.Endsea' @change='change' style='width:66px;margin-left: 2px' size='mini'>
          <el-option v-for='item in seaoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>
         <el-select v-model='EndHalfYear' placeholder='请选择' v-if='pickitemshow.EndHalfYear' @change='change'
          style='width:80px;margin-left: 2px;' size='mini'>
          <el-option v-for='item in halfYearoptions' :key='item.value' :label='item.label' :value='item.value'>
          </el-option>
        </el-select>

      </div>
      <div v-else style="display:flex;align-items:center;">
        <el-date-picker
          v-model="Begindays"
          type="date"
          size="mini"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          class="bedays"
          v-if="!pickitemshow.Day"
          @change="change"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
          :clearable="false"
        ></el-date-picker>
        <el-date-picker
          v-model="Sldays[0]"
          style="margin-left: 10px;width:12vw;"
          size="mini"
          type="date"
          placeholder="开始日期"
          v-if="pickitemshow.Day || pickitemshow.Hour"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
          @change="change"
          :picker-options="pickerOptions"
          :clearable="false"
        ></el-date-picker>
        <el-time-select
          v-model="beginHour"
          size="mini"
          style="width:5vw;"
          @change="change"
           v-if="pickitemshow.Hour"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00'
          }"
          placeholder="选择时间">
        </el-time-select>
        <el-date-picker
          v-model="Sldays[1]"
          style="width:12vw;"
          size="mini"
          type="date"
          placeholder="结束日期"
             v-if="pickitemshow.Day || pickitemshow.Hour"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
          @change="change"
          :picker-options="pickerOptions"
          :clearable="false"
        ></el-date-picker>
        <el-time-select
          v-model="endHour"
          size="mini"
          style="width:5vw;"
          @change="change"
           v-if="pickitemshow.Hour"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '23:00'
          }"
          placeholder="选择时间">
        </el-time-select>
      </div>

    </div>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'select-time',
  props: {
    isshowtimetype: {
      //  是否显示类型时间类型选项
      type: Boolean,
      default: true
    },
    defaulttimetype: {
      //  默认时间类型选项
      type: String,
      default: 'month'
    },
    showtimetype: {
      type: Array,
      //  默认显示的时间类型
      default: () => {
        return ['year', 'month', 'day', 'sea', 'halfyear', 'hour']
      }
    },
    istimeslot: {
      //  是否以时间段的形式显示
      type: Boolean,
      default: true
    },
    value: {
      //  v-model值
      type: [String, Array, Object],
      default: ''
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data () {
    return {
      beginHour: '00:00',
      endHour: '23:00',
      currenttimetype: 'month', // 当前选择的时间类型
      BeginYear: parseInt(moment().format('YYYY')), // 开始年
      BeginMonth: parseInt(moment().format('MM')), // 开始月
      EndYear: parseInt(moment().format('YYYY')), // 结束年
      EndMonth: parseInt(moment().format('MM')), // 结束月
      pickerOptions: {
        // 时间选择限制
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      BeginHalfYear: '上半年',
      EndHalfYear: '下半年',
      Begindays: moment().format('YYYY-MM-DD'), // 时间段开始时间
      Beginsea: moment().quarter(),
      Endsea: moment().quarter(),
      Sldays: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    }
  },
  mounted  () {
    //  if (this.value == '' || this.value == null) {
    //    this.$emit('input', this.time)
    //  }
  },
  created () {
    if (this.defaulttimetype !== '') {
      this.currenttimetype = this.defaulttimetype
    }
    console.log('当前数据 value ', this.value)
    if (this.value !== '') {
      //  console.log('时间', this.value)
      if (this.value !== null) {
        this.BeginYear = parseInt(moment(this.value[0]).format('YYYY'))
        this.BeginMonth = parseInt(moment(this.value[0]).format('MM'))
        this.EndYear = parseInt(moment(this.value[1]).format('YYYY'))
        this.EndMonth = parseInt(moment(this.value[1]).format('MM'))
        this.Begindays = moment(this.value[0]).format('YYYY-MM-DD')
        this.Beginsea = moment(this.value[0]).quarter()
        this.Endsea = moment(this.value[1]).quarter()
        this.beginHour = moment(this.value[0]).format('HH:mm')
        this.endHour = moment(this.value[1]).format('HH:mm')
        this.Sldays = [
          moment(this.value[0]).format('YYYY-MM-DD'),
          moment(this.value[1]).format('YYYY-MM-DD')
        ]
        this.change()
      }
    }
  },
  watch: {
    defaulttimetype (val) {
      console.log('当前数据 val ', val)
      this.currenttimetype = val
    },
    value () {
      if (this.value != null) {
        this.BeginYear = parseInt(moment(this.value[0]).format('YYYY'))
        this.BeginMonth = parseInt(moment(this.value[0]).format('01'))
        this.EndYear = parseInt(moment(this.value[1]).format('YYYY'))
        this.EndMonth = parseInt(moment(this.value[1]).format('MM'))
        this.Begindays = moment(this.value[0]).format('YYYY-MM-DD')
        this.Beginsea = moment(this.value[0]).quarter()
        this.Endsea = moment(this.value[1]).quarter()
        this.beginHour = moment(this.value[0]).format('HH:mm')
        this.endHour = moment(this.value[1]).format('HH:mm')
        this.Sldays = [
          moment(this.value[0]).format('YYYY-MM-DD'),
          moment(this.value[1]).format('YYYY-MM-DD')
        ]
        this.change()
      }
    }
  },
  computed: {
    months () {
      // 月的option
      var data = []
      for (var index = 1; index < 13; index++) {
        data.push({
          label: `${index}月`,
          value: parseInt(index)
        })
      }
      return data
    },
    Yearoptions () {
      // 年的option
      var data = []
      var year = moment().format('YYYY')
      for (var index = year; index > 1999; index--) {
        data.push({
          label: `${index}年`,
          value: parseInt(index)
        })
      }
      return data
    },
    seaoptions () {
      // 年的option
      var data = []
      for (var index = 1; index <= 4; index++) {
        data.push({
          label: `${index}季`,
          value: parseInt(index)
        })
      }
      return data
    },
    timeitemshow () {
      // 动态计算当前选择的时间类型是天动态切换对应的组件
      return this.currenttimetype === 'day' || this.currenttimetype === 'hour' ? '' : true
    },
    timetype () {
      // 动态计算当前显示那些时间类型
      var show = {
        year: false,
        month: false,
        day: false,
        sea: false,
        BeginHalfYear: false,
        EndHalfYear: false,
        hour: false
      }
      if (this.isshowtimetype) {
        this.showtimetype.map((item, index) => {
          show[item] = true
        })
      }
      return show
    },
    pickitemshow () {
      // 动态计算当前选择的时间类型隐藏显示对应的时间
      var data = {
        BeginYear: true,
        BeginMonth: true,
        EndYear: true,
        EndMonth: true,
        Beginsea: true,
        Endsea: true,
        Day: true,
        Hour: true,
        BeginHalfYear: true,
        EndHalfYear: true
      }
      if (this.istimeslot) {
        data.Day = true
        if (this.currenttimetype === 'year') {
          data.BeginYear = true
          data.BeginMonth = false
          data.EndYear = true
          data.EndMonth = false
          data.Beginsea = false
          data.Endsea = false
          data.BeginHalfYear = false
          data.EndHalfYear = false
        } else if (this.currenttimetype === 'sea') {
          data.BeginYear = true
          data.BeginMonth = false
          data.EndYear = true
          data.EndMonth = false
          data.Beginsea = true
          data.Endsea = true
          data.BeginHalfYear = false
          data.EndHalfYear = false
        } else if (this.currenttimetype === 'halfyear') {
          data.BeginYear = true
          data.EndYear = true
          data.BeginHalfYear = true
          data.EndHalfYear = true
          data.BeginMonth = false
          data.EndMonth = false
          data.Beginsea = false
          data.Endsea = false
        } else if (this.currenttimetype === 'day' || this.currenttimetype === 'month') {
          data.BeginYear = true
          data.BeginMonth = true
          data.EndYear = true
          data.EndMonth = true
          data.Beginsea = false
          data.Endsea = false
          data.BeginHalfYear = false
          data.EndHalfYear = false
          data.Hour = false
        } else if (this.currenttimetype === 'hour') {
          data.BeginYear = false
          data.BeginMonth = false
          data.EndYear = false
          data.EndMonth = false
          data.Beginsea = false
          data.Endsea = false
          data.BeginHalfYear = false
          data.EndHalfYear = false
          data.Hour = true
        }
      } else {
        data.EndYear = false
        data.EndMonth = false
        data.Endsea = false
        data.Day = false
        data.BeginHalfYear = false
        data.EndHalfYear = false

        if (this.currenttimetype === 'year') {
          data.BeginYear = true
          data.BeginMonth = false
          data.Beginsea = false
        } else if (this.currenttimetype === 'sea') {
          data.BeginYear = true
          data.BeginMonth = false
          data.Beginsea = true
        } else {
          data.BeginYear = true
          data.BeginMonth = true
          data.Beginsea = false
        }
      }
      return data
    },
    time () {
      // 时间
      var time = {
        timetype: this.currenttimetype,
        BeginDate: '',
        EndDate: ''
      }
      if (this.istimeslot) {
        if (this.currenttimetype === 'day') {
          time.BeginDate = this.Sldays[0]
          time.EndDate = this.Sldays[1]
        } else if (this.currenttimetype === 'month') {
          time.BeginDate = `${this.BeginYear}-${this.BeginMonth}-01`
          let zdays = moment(
            `${this.EndYear}-${this.EndMonth}`,
            'YYYY-MM'
          ).daysInMonth()
          time.EndDate = `${this.EndYear}-${this.EndMonth}-${zdays}`
        } else if (this.currenttimetype === 'sea') {
          time.BeginDate = this.getQuarterStartDate(
            this.BeginYear,
            this.Beginsea
          )
          time.EndDate = this.getQuarterEndDate(this.EndYear, this.Endsea)
        } else if (this.currenttimetype === 'halfyear') {
          if (this.BeginHalfYear === '上半年') {
            time.BeginDate = `${this.BeginYear}-01-01`
          } else if (this.BeginHalfYear === '下半年') {
            time.BeginDate = `${this.BeginYear}-07-01`
          }
          if (this.EndHalfYear === '上半年') {
            time.EndDate = `${this.EndYear}-06-30`
          } else if (this.EndHalfYear === '下半年') {
            time.EndDate = `${this.EndYear}-12-31`
          }
        } else if (this.currenttimetype === 'hour') {
          time.BeginDate = this.Sldays[0] + ' ' + this.beginHour
          time.EndDate = this.Sldays[1] + ' ' + this.endHour
        } else {
          time.BeginDate = `${this.BeginYear}-01-01`
          time.EndDate = `${this.EndYear}-12-31`
        }
      } else {
        if (this.currenttimetype === 'day') {
          time.BeginDate = this.Begindays
          time.EndDate = this.Begindays
        } else if (this.currenttimetype === 'month') {
          time.BeginDate = `${this.BeginYear}-${this.BeginMonth}-01`
          let zdays = moment(
            `${this.BeginYear}-${this.BeginMonth}`,
            'YYYY-MM'
          ).daysInMonth()
          time.EndDate = `${this.BeginYear}-${this.BeginMonth}-${zdays}`
        } else if (this.currenttimetype === 'sea') {
          time.BeginDate = this.getQuarterStartDate(
            this.BeginYear,
            this.Beginsea
          )
          time.EndDate = this.getQuarterEndDate(this.BeginYear, this.Beginsea)
        } else {
          time.BeginDate = `${this.BeginYear}-01-01`
          time.EndDate = `${this.BeginYear}-12-31`
        }
      }
      if (this.currenttimetype === 'hour') {
        time.BeginDate = moment(
          time.BeginDate.replace(/\d+/g, function (a) {
            return a.length === 4 ? a : a.length === 2 ? a : '0' + a
          })
        ).format('YYYY-MM-DD HH:mm:ss')
        time.EndDate = moment(
          time.EndDate.replace(/\d+/g, function (a) {
            return a.length === 4 ? a : a.length === 2 ? a : '0' + a
          })
        ).format('YYYY-MM-DD HH:mm:ss')
      } else {
        time.BeginDate = moment(
          time.BeginDate.replace(/\d+/g, function (a) {
            return a.length === 4 ? a : a.length === 2 ? a : '0' + a
          })
        ).format(this.format)
        time.EndDate = moment(
          time.EndDate.replace(/\d+/g, function (a) {
            return a.length === 4 ? a : a.length === 2 ? a : '0' + a
          })
        ).format(this.format)
      }
      return time
    },
    halfYearoptions () {
      // 年的option
      var data = [];
      data.push({
        label: '上半年',
        value: '上半年'
      })
      data.push({
        label: '下半年',
        value: '下半年'
      })
      return data
    }
  },
  methods: {
    change (item) {
      setTimeout(() => {
        this.$emit('change', this.time)
        this.$emit('input', this.time)
      }, 1)
    },
    getQuarterStartDate (paraYear, paraSeason) {
      // 获得某季度的开始日期
      switch (paraSeason) {
        case 1:
          return paraYear + '-01-01'
        case 2:
          return paraYear + '-04-01'
        case 3:
          return paraYear + '-07-01'
        case 4:
          return paraYear + '-10-01'
      }
    },
    getQuarterEndDate (paraYear, paraSeason) {
      // 获得某季度的结束日期
      switch (paraSeason) {
        case 1:
          return paraYear + '-03-31'
        case 2:
          return paraYear + '-06-30'
        case 3:
          return paraYear + '-09-30'
        case 4:
          return paraYear + '-12-31'
      }
    }
  }
}
</script>

<style >
.selecttime {
  height: 45px;
  display:flex;
  align-items: center;
  vertical-align: center;
}
.timetype {
  float: left;
  display: flex;
  align-items: center;
  vertical-align: center;
}
.timetype-item {
  display: flex;
  align-items: center;
  vertical-align: center;
  color: #1f2d3d;
}
.selectbk {
  float: left;
}
.sectiontype {
  width: 90px;
  border-radius: 0px !important;
  line-height: 45px;
  margin-top: 1px;
  margin-left: 5px;
}
.firsel {
  margin-left: 0px;
}
.spta {
  margin-left: 0px;
  font-size: 13px;
  color: #1f2d3d;
  line-height: 45px;
}

.radio_label {
  margin-right: 5px !important;
  color: #1f2d3d;
  font-size: 13px;
  line-height: 45px;
}
.el-radio__label {
  margin-left: -5px !important;
}
.endyear {
  margin: 0 0 0 15px;
  &::after {
    content: '至';
    position: absolute;
    top: 0px;
    display: block;
    left: -15px;
    line-height: 32px;
  }
}
.bedays {
  width: 140px;
}
.el-range-separator {
  margin-right: 10px !important
}
</style>
