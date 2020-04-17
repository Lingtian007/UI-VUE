## 时间组件



## 基本用法

### 对时间选择进行整理的一个组件

<template>
<select-time :isshowtimetype='isFasle' :value='val' :defaulttimetype="time" :showtimetype='result' :istimeslot='isFasle' @change='searchFn'></select-time>
<v-button size="large" @click='changes'>大号按钮</v-button>
  
</template>
<script>
export default {
  data () {
    return {
      result: ['year','month','day','sea','halfyear','hour'],
      isFasle:true,
      time:'day',
      val:{
            BeginDate: moment().add(-1, "month").startOf('month').format("YYYY-MM-DD"),
            EndDate: moment().add(-1, "month").endOf('month').format("YYYY-MM-DD"),
            timetype: 'month'
          }
    }
  },
  methods: {
    searchFn (query) {
      console.log('search', query)
    },
    changes() {
     this.time = 'month'
     this.result = ['month','day']
     this.val  = {
            BeginDate: moment().add(-2, "month").startOf('month').format("YYYY-MM-DD"),
            EndDate: moment().add(-1, "month").endOf('month').format("YYYY-MM-DD"),
            timetype: 'month'
          }
    }
  }
}
</script>

```html
<template>
<select-time :isshowtimetype='isFasle' defaulttimetype="day" :showtimetype='result' :istimeslot='isFasle' @change='searchFn'><select-time>
  
</template>
<script>
export default {
  data () {
    return {
      result: ['year','month','day','sea','halfyear','hour'],
      isFasle:true,
    }
  },
  methods: {
    searchFn (query) {
      console.log('search', query)
    }
  }
}
</script>
```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| isshowtimetype  |  是否显示类型时间类型选项    | boolean   | — | false |
| defaulttimetype  | 默认时间类型选项  |  string  | — | false   |
| showtimetype  | 默认显示的时间类型  |  Array  | — | — |
| istimeslot  | 是否以时间段的形式显示    | boolean   | — | false |

### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @change  |  在 methods内注册方法使用即可  |  — | 

