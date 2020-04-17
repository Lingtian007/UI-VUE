<template>
  <!-- <div id="app">
    <router-view/>
  </div> -->
  <div class="app">
    <page-header></page-header>
    <div class="main-content">
      <!-- <p class="page-tip">查看 demo 请将浏览器切换到手机调试模式</p> -->
      <div class="page-container clearfix">
        <side-nav :data="navConfig['zh-CN']" base="/component"></side-nav>
        <div class="page-content">
          <router-view></router-view>
          <footer-nav></footer-nav>
        </div>
      </div>
    </div>
    <div class="page-footer">
      ©2019-2020&nbsp;<a href="http://192.168.1.109:4873/" target="_blank">tangyu</a>&nbsp;
      沪ICP备18005908号-1
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'

import navConfig from './nav.config.json'
import PageHeader from './components/page-header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'

export default {
  name: 'App',
  components: {
    PageHeader,
    SideNav,
    FooterNav
  },
  data () {
    return {
      navConfig: navConfig
    }
  }
}
</script>

<style>
.app {
  position: relative;
}
.page-footer {
  font-size: 13px;
  text-align: center;
  position: sticky;
  bottom: 20px;
}
</style>
