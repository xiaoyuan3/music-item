<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/m-header";
import TabBar from "components/content/tabBar/TabBar";

export default {
  name: "App",
  components: {
    MHeader,
    TabBar,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
