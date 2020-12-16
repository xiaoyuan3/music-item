<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/common/m-header/m-header'
import TabBar from 'components/content/TabBar'

export default {
  name: 'App',
  components: {
    MHeader,
    TabBar
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>
