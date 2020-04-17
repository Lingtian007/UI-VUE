## Vui

一套基于 `Vue 2.0` 的前端 `UI` 组件库。

### 安装

```shell
npm i  lijoyui  --registry http://192.168.1.109:4873/
```

### 引入组件

#### 完整引入

```javascript
import Vue from 'vue'
import Vui from "lijoyui";
import "lijoyui/lib/vui-css/index.css";

Vue.use(Vui)
```

#### 部分引入

```javascript
import Vue from 'vue'
import {
  Scroller,
  Select
  // ...
} from 'lijoyui'
import 'lijoyui/lib/vui-css/scroller.css';
import 'lijoyui/lib/vui-css/select.css';

Vue.component(Scroller.name, Scroller)
Vue.component(Select.name, Select)
```

#### 引入插件

**注：完整引入了vui，则无需再注册插件**

```javascript
import Vue from 'vue';
import { 
  $Toast, 
  $Dialog 
  // ...
} from 'lijoyui';

Vue.prototype.$toast = $Toast
Vue.prototype.$dialog = $Dialog
```
