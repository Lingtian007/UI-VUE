## 数据源组件



## 基本用法



<template>
<data-source repairMethods='1' checkStatu='AppMixed' dataTypes='AcctualMixed' @DataSourceChange='searchFn'><data-source>
  
</template>
<script>
export default {
  data () {
    return {
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


+
+
+
+
+
+

```html
<template>
<data-source repairMethods='1' checkStatu='AppMixed' dataTypes='AcctualMixed' @DataSourceChange='searchFn'><data-source>
  
</template>
<script>
export default {
  data () {
    return {
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
</script>
```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| repairMethods  |  修约方式选择    | string   | 0,1 | — |
| checkStatu  | 审核情况选择  |  string  | app,unapp,AppMixed | —   |
| dataTypes  | 数据类型选择  |  string  | std,actual,AcctualMixed| — |

### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |
| @DataSourceChange  |  在 methods内注册方法使用即可  |  — | 

