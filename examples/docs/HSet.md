## 因子测点列表渲染组件



## 基本用法

### 列表渲染组件

<template>

<h-set Types='eqiw_d' pagename='countyNoise5' rainValues='6' dvalues='GB 3838-2002' dvaluelevels='4' hvalues='GB/T14848-2017' hvaluelevels='4' ></h-set>
  
</template>
<script>
export default {
  data () {
    return {
      value:"",
    }
  },
  methods: {
    selectFn (query) {
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
| rainValues  |  当Types = eqia_p时的值   | string  | — | — |
| pagename  | 报表组件名  |  string  | — | — |
| Types  | 业务类型    | string  | eqia_r eqiw_d eqia_p eqia_rd eqiw_r eqiw_l eqiw_lt eqin_t eqin_f eqin_a | eqia_r |
| dvalues  | 地表水超标依据   | string  | GB 3838-2002 | GB 3838-2002 |
| dvaluelevels  | 地表水超标等级   | string  | 1~7 | 3 |
| hvalues  | 地下水超标依据   | string  | GB/T14848-93 | GB/T14848-93 |
| hvaluelevels  | 地下水超标等级   | string  | 1~7 | 3 |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |


