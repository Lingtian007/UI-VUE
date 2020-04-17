## 沙尘组件



## 基本用法

<template>
<sc-xz sz_width='500' sz_height='500' :url='URL' @getNodes='searchFn'></sc-xz>
  
</template>
<script>
export default {
  data () {
    return {
      URL:'http://192.168.1.102:1056/emcwebapicore/'
    }
  },
  methods: {
    searchFn (query) {
      console.log('结果', query)
    }
  }
}
</script>

```html
<template>
<sc-xz @getNodes='searchFn'></sc-xz>
  
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
      console.log('结果', query)
    }
  }
}
</script>
```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| isshowtimetype  |  是否显示类型时间类型选项    | boolean   | — | false |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @getNodes  |  在 methods内注册方法使用即可  |  — | 

