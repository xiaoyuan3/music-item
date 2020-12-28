<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "components/common/m-header/m-header";
import TabBar from "components/content/tabBar/TabBar";
import Player from "components/content/player/Player"

export default {
  name: "App",
  components: {
    MHeader,
    TabBar,
    Player
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
