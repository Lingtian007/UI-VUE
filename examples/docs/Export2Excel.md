## 时间组件



## 基本用法

### 对时间选择进行整理的一个组件

<template>
<export2-excel :exportData='exportData'></export2-excel>
  
</template>
<script>
export default {
  data () {
    return {
      exportData: [{
          mod: ['id', 'name', 'age'],
          head: ['55665', '', ''],
          tabledata: [
            {id: '顺序', name: '姓名', age: '年龄'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'}
          ],
          tabletitle: '55665',
          merges: [[0, 0, 2, 0]],
          cellColor:[]
        }],
        tabledata: [
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'}
          ],
        cellColors:'',
        mod:['id', 'name', 'age']
    }
  },
  created(){
   this.cellColors = this.getCellColor(this.tabledata, this.mod);
  console.log('当前数据this.cellColorsthis.cellColors', this.cellColors );
  this.exportData[0].cellColor = this.cellColors
  console.log('当前数据this.exportDatathis.exportData', this.exportData );
  },
  methods: {
     getCellColor(reportdata, colNames) {
      var arr = [];
      console.log('当前数据reportdata, colNames', reportdata, colNames );
      reportdata.map((item, index) => {
        colNames.map((it, ind) => {
          if (it.indexOf("name") != -1) {
            arr.push({ a: [ind , index + 3], b: "fff2cc" });
          }
          if (it.indexOf("age") != -1) {
            arr.push({ a: [ind , index + 3], b: "c6e0b4" });
          }
        });
      });
      return arr;
    },
  }
}
</script>

```html
<template>
<export2-excel :exportData='exportData'></export2-excel>
  
</template>
<script>
export default {
  data () {
    return {
      exportData: [{   
          mod: ['id', 'name', 'age'],
          head: ['55665', '', ''],
          tabledata: [
            {id: '顺序', name: '姓名', age: '年龄'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'}
          ],
          tabletitle: '55665',
          merges: [[0, 0, 2, 0]],
          cellColor:[]
        }],
        tabledata: [
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'},
            {id: 1, name: 'zs', age: '14'}
          ],
        cellColors:'',
        mod:['id', 'name', 'age']
    }
  },
  created(){
   this.cellColors = this.getCellColor(this.tabledata, this.mod);
  console.log('当前数据this.cellColors', this.cellColors );
  this.exportData[0].cellColor = this.cellColors
  console.log('当前数据this.exportData', this.exportData );
  },
  methods: {
     getCellColor(reportdata, colNames) {
      var arr = [];
      console.log('当前数据reportdata, colNames', reportdata, colNames );
      reportdata.map((item, index) => {
        colNames.map((it, ind) => {
          if (it.indexOf("name") != -1) {
            arr.push({ a: [ind , index + 3], b: "fff2cc" });
          }
          if (it.indexOf("age") != -1) {
            arr.push({ a: [ind , index + 3], b: "c6e0b4" });
          }
        });
      });
      return arr;
    },
  }
}
</script>

```



### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| exportData  |  导出数据数组   | array   | — | — |
| mod  | 导出数据行字段  |  array  | — | —   |
| head  | 导出数据表头字段  |  array | — | —   |
| tabletitle  | 导出数据表头  |  string  | — | —   |
| merges  | 合并数据数组 |  array | — | —   |
| cellColor  | 导出报表加背景颜色 |  array | — | —   |


### Events 
| 方法名      | 说明    |      参数 |   
|---------- |-------- |---------- |


