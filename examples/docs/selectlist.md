## 因子测点列表渲染组件



## 基本用法

### 列表渲染组件

<template>

<select-list sl_width='150' Types='eqia_r' itemGroup ='group' :url='URL' v-model='value'  placeholder='请选择'  @change='selectFn'></select-list>
  
</template>
<script>
export default {
  data () {
    return {
      value:"",
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

<select-list sl_width='150' Types='eqia_r' itemGroup ='group' :url='URL' v-model='value' placeholder='请选择'  @change='selectFn'></select-list>
  
</template>
<script>
export default {
  data () {
    return {
      value:"",
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
| itemGroup  | 类型   | string  | group item | — |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @change  |  在 methods内注册方法使用即可  |  — | 

