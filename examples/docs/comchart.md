## 时间组件



## 基本用法

### 对时间选择进行整理的一个组件

<template>
<com-chart :Options= 'Options' chartheight='300px'></com-chart>
  
</template>
<script>
export default {
  data () {
    return {
      Options: {
        xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
      },
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

```html

```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |


