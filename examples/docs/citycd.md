## 测点组件



## 基本用法

### 

<template>
<city-cd :manager='type'  :url='URL' @hideOrshow='searchFn'></city-cd>


  
</template>
<script>
export default {
  data () {
    return {
      type:'eqia_r',
      URL:'http://192.168.1.102:1056/emcwebapicore/',
    }
  },
  methods: {
    searchFn (val) {
      console.log('search', val)
    }
  }
}
</script>

```html
<template>
<city-cd :manager='type'  :url='URL' @hideOrshow='searchFn'></city-cd>


  
</template>
<script>
export default {
  data () {
    return {
      type:'eqia_r',
      URL:'http://192.168.1.102:1056/emcwebapicore/',
    }
  },
  methods: {
    searchFn (val) {
      console.log('search', val)
    }
  }
}
</script>
```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| manager  |  业务类型   | string   | eqia_r eqiw_d eqia_p eqia_rd eqiw_r eqiw_l eqiw_lt eqin_t eqin_f eqin_a | — |
| url  | 请求路径  |  http://192.168.1.102:1056/emcwebapicore/  |  | —   |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @hideOrshow  |  在 methods内注册方法使用即可  |  — | 

