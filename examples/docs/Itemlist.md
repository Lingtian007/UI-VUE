
## 因子组合组件



## 基本用法

<template>

<item-list sl_width='150' Types='eqiw_r' :url='URL' v-model='value' placeholder='请选择'  @change='selectFn'></item-list>
  
</template>
<script>
export default {
  data () {
    return {
      value:'302,315,314,317,311,327,326,438,437,316,313,434,435,318,319,320,436,323,325,328,467',
      URL:'http://192.168.1.102:1056/emcwebapicore/'
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
<template>

<item-list sl_width='150' Types='eqiw_r' :url='URL' v-model='value' placeholder='请选择'  @change='selectFn'></item-list>
  
</template>
<script>
export default {
  data () {
    return {
      value:'302,315,314,317,311,327,326,438,437,316,313,434,435,318,319,320,436,323,325,328,467',
      URL:'http://192.168.1.102:1056/emcwebapicore/'
    }
  },
  methods: {
    selectFn (query) {
      console.log('search', query)
    }
  }
}
</script>

```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| sl_width  |  定义宽度    | string  | — | false |
| v-model  | 默认值  |  string  | — | — |
| Types  | 业务类型    | string  | eqia_r eqiw_d eqia_p eqia_rd eqiw_r eqiw_l eqiw_lt eqin_t eqin_f eqin_a | eqia_r |
| url  | 请求路径   | string  | http://192.168.1.102:1056/emcwebapicore/ | — |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @change  |  在 methods内注册方法使用即可  |  — | 


